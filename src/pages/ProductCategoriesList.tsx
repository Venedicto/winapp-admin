import { useState, useMemo, useCallback } from 'react'
import Table, { usePagination } from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import type { ProductCategory } from '../types/Category'
import { CategoryFormModal } from '../components/category'
import { getCategoryTableColumns } from '../utils/categoryTableColumns'
import { filterCategories, getCategorySearchFilters } from '../utils/categoryFilters'
import Button from '../components/ui/Button'
import { useToastHelpers } from '../hooks/useToastHelpers'
import { 
  useProductCategories, 
  useCreateProductCategory, 
  useUpdateProductCategory, 
  useDeleteProductCategory 
} from '../services/category'

function ProductCategoriesList() {
  // Usar las queries y mutations reales
  const { data: categoriesResponse, isLoading, error } = useProductCategories()
  const createCategoryMutation = useCreateProductCategory()
  const updateCategoryMutation = useUpdateProductCategory()
  const deleteCategoryMutation = useDeleteProductCategory()
  
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null)
  
  const { showSuccess, showError } = useToastHelpers()
  
  // Estados para búsqueda
  const [searchQuery, setSearchQuery] = useState('')
  
  // Hook de paginación
  const {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = usePagination(10)

    // Obtener categorías de la respuesta del API
    const categories = categoriesResponse?.data?.productCategories || []

  // Filtrar categorías usando la utilidad
  const filteredCategories = useMemo(() => {
    return filterCategories(categories, searchQuery)
  }, [categories, searchQuery])

  // Configuración de paginación (usar datos filtrados)
  const paginationConfig = {
    currentPage,
    pageSize,
    total: filteredCategories.length,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50]
  }

  // Configuración de búsqueda
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    handlePageChange(1) // Resetear a la primera página al buscar
  }, [handlePageChange])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    handlePageChange(1)
  }, [handlePageChange])

  // Obtener filtros usando la utilidad
  const searchFilters = getCategorySearchFilters()

  // Handlers para CRUD operations
  const handleCreate = () => {
    setEditingCategory(null)
    setShowFormModal(true)
  }

  const handleEdit = (category: ProductCategory) => {
    setEditingCategory(category)
    setShowFormModal(true)
  }

  const handleDelete = async (categoryId: string) => {
    try {
      await deleteCategoryMutation.mutateAsync({ categoryId })
      showSuccess('Categoría eliminada', 'La categoría de producto ha sido eliminada exitosamente')
    } catch (error: any) {
      console.error('Error al eliminar categoría:', error)
      showError('Error al eliminar', error.message || 'No se pudo eliminar la categoría. Inténtalo de nuevo.')
    }
  }

  const handleSaveCategory = async (categoryData: { name: string; image: string | File | null }) => {
    try {
      if (editingCategory) {
        // Editar categoría existente
        await updateCategoryMutation.mutateAsync({
          categoryId: editingCategory.id,
          name: categoryData.name,
          categoryImage: categoryData.image instanceof File ? categoryData.image : undefined
        })
        showSuccess('Categoría actualizada', `La categoría "${categoryData.name}" ha sido actualizada exitosamente`)
      } else {
        // Crear nueva categoría
        if (!categoryData.image || typeof categoryData.image === 'string') {
          showError('Error al guardar', 'Debes seleccionar una imagen para la categoría')
          return
        }
        
        await createCategoryMutation.mutateAsync({
          name: categoryData.name,
          categoryImage: categoryData.image
        })
        showSuccess('Categoría creada', `La categoría "${categoryData.name}" ha sido creada exitosamente`)
      }
      
      setShowFormModal(false)
      setEditingCategory(null)
    } catch (error: any) {
      console.error('Error al guardar categoría:', error)
      showError('Error al guardar', error.message || 'No se pudo guardar la categoría. Verifica los datos e inténtalo de nuevo.')
    }
  }

  // Obtener columnas de la tabla
  const columns = getCategoryTableColumns('product', handleEdit, handleDelete)

  const handleRowClick = (category: ProductCategory) => {
    console.log('Clicked category:', category.name)
    // Aquí podrías navegar a la página de detalles de la categoría
  }

  // Determinar el estado de loading
  const formLoading = createCategoryMutation.isPending || updateCategoryMutation.isPending

  // Manejar estados de error
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error al cargar las categorías de producto</p>
          <p className="text-gray-500 text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 bg-white">
      {/* Header con botón de crear */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorías de Producto</h1>
          <p className="text-gray-600">Gestiona las categorías disponibles para los productos</p>
        </div>
        <Button
          onClick={handleCreate}
          variant="primary"
          size="md"
          className="flex items-center gap-2"
        >
          Nueva Categoría
        </Button>
      </div>

      {/* Search and Filters */}
      <SearchWithFilters
        placeholder="Buscar categorías por nombre..."
        onSearch={handleSearch}
        onReset={handleResetFilters}
        filters={searchFilters}
      />

      {/* Table */}
      <Table
        data={filteredCategories}
        columns={columns}
        loading={isLoading}
        emptyMessage="No hay categorías de producto registradas"
        onRowClick={handleRowClick}
        pagination={paginationConfig}
      />

      {/* Form Modal */}
      <CategoryFormModal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false)
          setEditingCategory(null)
        }}
        onSave={handleSaveCategory}
        category={editingCategory}
        type="product"
        isLoading={formLoading}
      />
    </div>
  )
}

export default ProductCategoriesList 