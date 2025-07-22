import { useState, useEffect, useMemo, useCallback } from 'react'
import Table, { usePagination } from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import type { BusinessCategory } from '../types/Category'
import { CategoryStats, CategoryFormModal } from '../components/category'
import { getCategoryTableColumns } from '../utils/categoryTableColumns'
import { filterCategories, getCategorySearchFilters } from '../utils/categoryFilters'
import Button from '../components/ui/Button'
import { useToastHelpers } from '../hooks/useToastHelpers'

// Datos de ejemplo para mostrar la tabla
const mockBusinessCategories: BusinessCategory[] = [
  {
    "id": "bbccaf2d-9819-4236-93af-8e2b3f371a93",
    "name": "Heladería",
    "image": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/categories/f12700d2-c09b-4b0d-a041-0b831e7665fa.png",
    "createdAt": "2025-05-16T18:45:41.955Z",
    "updatedAt": "2025-05-16T18:45:41.955Z",
    "deletedAt": null
  },
  {
    "id": "9c4ad151-3bd9-4dca-9705-26d777340ed1",
    "name": "Restaurante",
    "image": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/categories/restaurant.png",
    "createdAt": "2024-12-10T14:30:25.123Z",
    "updatedAt": "2024-12-15T09:22:33.456Z",
    "deletedAt": null
  },
  {
    "id": "7a8b9c10-1234-5678-90ab-cdef12345678",
    "name": "Farmacia",
    "image": "https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/categories/pharmacy.png",
    "createdAt": "2024-11-20T10:15:30.789Z",
    "updatedAt": "2024-12-01T16:45:20.321Z",
    "deletedAt": null
  }
]

function BusinessCategoriesList() {
  const [categories, setCategories] = useState<BusinessCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [showFormModal, setShowFormModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<BusinessCategory | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  
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

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setCategories(mockBusinessCategories)
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

  const handleEdit = (category: BusinessCategory) => {
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
        showSuccess('Categoría eliminada', 'La categoría de negocio ha sido eliminada exitosamente')
      }, 500)
    } catch (error) {
      console.error('Error al eliminar categoría:', error)
      showError('Error al eliminar', 'No se pudo eliminar la categoría. Inténtalo de nuevo.')
    }
  }

  const handleSaveCategory = async (categoryData: { name: string; image: string | File | null }) => {
    setFormLoading(true)
    
    try {
      // Simular subida de archivo si es un File
      let imageUrl = categoryData.image
      if (categoryData.image instanceof File) {
        // Simular subida a servidor y obtener URL
        console.log('Subiendo archivo:', categoryData.image.name)
        // En una aplicación real, aquí subirías el archivo a tu servidor/CDN
        imageUrl = `https://pub-309c9385e5fc49408b34f0738fa9f934.r2.dev/categories/${categoryData.image.name}`
      }

      const processedData = {
        name: categoryData.name,
        image: imageUrl as string
      }

      if (editingCategory) {
        // Editar categoría existente
        console.log('Actualizando categoría:', editingCategory.id, processedData)
        
        // Simular operación
        setTimeout(() => {
          setCategories(prev => prev.map(cat => 
            cat.id === editingCategory.id 
              ? { ...cat, ...processedData, updatedAt: new Date().toISOString() }
              : cat
          ))
          setShowFormModal(false)
          setEditingCategory(null)
          setFormLoading(false)
          showSuccess('Categoría actualizada', `La categoría "${processedData.name}" ha sido actualizada exitosamente`)
        }, 1000)
      } else {
        // Crear nueva categoría
        console.log('Creando nueva categoría:', processedData)
        
        // Simular operación
        setTimeout(() => {
          const newCategory: BusinessCategory = {
            id: `new-${Date.now()}`,
            ...processedData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deletedAt: null
          }
          setCategories(prev => [newCategory, ...prev])
          setShowFormModal(false)
          setFormLoading(false)
          showSuccess('Categoría creada', `La categoría "${processedData.name}" ha sido creada exitosamente`)
        }, 1000)
      }
    } catch (error) {
      console.error('Error al guardar categoría:', error)
      setFormLoading(false)
      showError('Error al guardar', 'No se pudo guardar la categoría. Verifica los datos e inténtalo de nuevo.')
    }
  }

  // Obtener columnas de la tabla
  const columns = getCategoryTableColumns('business', handleEdit, handleDelete)

  const handleRowClick = (category: BusinessCategory) => {
    console.log('Clicked category:', category.name)
    // Aquí podrías navegar a la página de detalles de la categoría
  }

  return (
    <div className="space-y-8 bg-white">
      {/* Header con botón de crear */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorías de Negocio</h1>
          <p className="text-gray-600">Gestiona las categorías disponibles para los negocios</p>
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
        loading={loading}
        emptyMessage="No hay categorías de negocio registradas"
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
        type="business"
        isLoading={formLoading}
      />
    </div>
  )
}

export default BusinessCategoriesList 