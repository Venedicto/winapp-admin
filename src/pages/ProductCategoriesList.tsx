import { useState, useEffect, useMemo, useCallback } from 'react'
import Table, { usePagination } from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import type { ProductCategory } from '../types/Category'
import { CategoryStats, CategoryFormModal } from '../components/category'
import { getCategoryTableColumns } from '../utils/categoryTableColumns'
import { filterCategories, getCategorySearchFilters } from '../utils/categoryFilters'
import Button from '../components/ui/Button'

// Datos de ejemplo para mostrar la tabla
const mockProductCategories: ProductCategory[] = [
  {
    "id": "13d9343c-98ce-4d22-9668-585618cab2df",
    "name": "Hamburguesas",
    "image": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/categories/Hamburguesas.JPEG",
    "createdAt": "2024-08-23T16:36:28.013Z",
    "updatedAt": "2024-12-13T15:35:37.257Z",
    "deletedAt": null
  },
  {
    "id": "25e8452d-11df-5e33-7779-696719dbc3ea",
    "name": "Bebidas",
    "image": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/categories/bebidas.png",
    "createdAt": "2024-09-15T10:20:15.456Z",
    "updatedAt": "2024-12-10T11:22:18.789Z",
    "deletedAt": null
  },
  {
    "id": "37f9563e-22f0-6f44-8880-707820ecd4fb",
    "name": "Postres",
    "image": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/categories/postres.jpg",
    "createdAt": "2024-10-05T14:45:22.123Z",
    "updatedAt": "2024-12-08T16:30:44.567Z",
    "deletedAt": null
  },
  {
    "id": "49g0674f-33g1-7g55-9991-818931fed5gc",
    "name": "Pizza",
    "image": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/categories/pizza.png",
    "createdAt": "2024-07-12T09:15:33.789Z",
    "updatedAt": "2024-12-14T13:45:12.234Z",
    "deletedAt": null
  }
]

function ProductCategoriesList() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  
  // Estados para búsqueda
  const [searchQuery, setSearchQuery] = useState('')
  
  // Hook de paginación
  const {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = usePagination(10)

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setCategories(mockProductCategories)
      setLoading(false)
    }, 1000)
  }, [])

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
      // Aquí iría la llamada a la API para eliminar
      console.log('Eliminando categoría:', categoryId)
      
      // Simular operación
      setTimeout(() => {
        setCategories(prev => prev.filter(cat => cat.id !== categoryId))
      }, 500)
    } catch (error) {
      console.error('Error al eliminar categoría:', error)
    }
  }

  const handleSaveCategory = async (categoryData: Omit<ProductCategory, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    setFormLoading(true)
    
    try {
      if (editingCategory) {
        // Editar categoría existente
        console.log('Actualizando categoría:', editingCategory.id, categoryData)
        
        // Simular operación
        setTimeout(() => {
          setCategories(prev => prev.map(cat => 
            cat.id === editingCategory.id 
              ? { ...cat, ...categoryData, updatedAt: new Date().toISOString() }
              : cat
          ))
          setShowFormModal(false)
          setEditingCategory(null)
          setFormLoading(false)
        }, 1000)
      } else {
        // Crear nueva categoría
        console.log('Creando nueva categoría:', categoryData)
        
        // Simular operación
        setTimeout(() => {
          const newCategory: ProductCategory = {
            id: `new-${Date.now()}`,
            ...categoryData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: null
          }
          setCategories(prev => [newCategory, ...prev])
          setShowFormModal(false)
          setFormLoading(false)
        }, 1000)
      }
    } catch (error) {
      console.error('Error al guardar categoría:', error)
      setFormLoading(false)
    }
  }

  // Obtener columnas de la tabla
  const columns = getCategoryTableColumns('product', handleEdit, handleDelete)

  const handleRowClick = (category: ProductCategory) => {
    console.log('Clicked category:', category.name)
    // Aquí podrías navegar a la página de detalles de la categoría
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
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
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
        loading={loading}
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