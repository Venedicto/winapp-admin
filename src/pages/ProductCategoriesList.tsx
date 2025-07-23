import { useMemo } from 'react'
import Table from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import { getCategoryTableColumns } from '../utils/categoryTableColumns'
import { filterCategories } from '../utils/categoryFilters'
import { useCategoryFilters } from '../hooks/useCategoryFilters'
import { useProductCategories } from '../services/category'

function ProductCategoriesList() {
  // Usar las queries reales
  const { data: categoriesResponse, isLoading, error } = useProductCategories()
  
  // Hook de filtros con query parameters
  const {
    search,
    setSearch,
    page,
    pageSize,
    setPage,
    setPageSize,
    sortBy,
    sortDirection,
    toggleSort,
    clearAllFilters,
    hasActiveFilters
  } = useCategoryFilters()

  // Obtener categorías de la respuesta del API (TODOS los datos)
  const categories = categoriesResponse?.data?.productCategories || []

  // Filtrar categorías usando la utilidad (TODOS los datos filtrados)
  const filteredCategories = useMemo(() => {
    return filterCategories(categories, search)
  }, [categories, search])

  // Aplicar ordenamiento local
  const sortedCategories = useMemo(() => {
    if (!sortBy) return filteredCategories

    return [...filteredCategories].sort((a, b) => {
      const getValue = (obj: any, key: string) => {
        if (key.includes('.')) {
          return key.split('.').reduce((o, k) => o?.[k], obj)
        }
        return obj[key]
      }

      const aValue = getValue(a, sortBy)
      const bValue = getValue(b, sortBy)

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredCategories, sortBy, sortDirection])

  // Aplicar paginación local
  const paginatedCategories = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedCategories.slice(startIndex, endIndex)
  }, [sortedCategories, page, pageSize])

  // Configuración de paginación
  const paginationConfig = {
    currentPage: page,
    pageSize,
    total: sortedCategories.length,
    onPageChange: (newPage: number) => setPage(newPage),
    onPageSizeChange: (newSize: number) => setPageSize(newSize),
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50, 100]
  }

  // Obtener columnas de la tabla con ordenamiento
  const columns = getCategoryTableColumns('product').map(column => ({
    ...column,
    sortable: true,
    onSort: column.sortable ? () => toggleSort(column.key as string) : undefined,
    sortDirection: sortBy === column.key ? sortDirection : undefined
  }))

  // Manejar estados de error
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error al cargar las categorías</p>
          <p className="text-gray-500 text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categorías de Productos</h1>
          <p className="text-gray-600">
            Mostrando {sortedCategories.length} de {categories.length} categorías
            {hasActiveFilters && ' (filtradas)'}
          </p>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Search */}
      <SearchWithFilters
        placeholder="Buscar categorías por nombre o descripción..."
        initialSearchValue={search}
        onSearch={(query) => setSearch(query || null)}
        onReset={clearAllFilters}
        filters={[]} // Sin filtros específicos por ahora
      />

      {/* Table con paginación y ordenamiento desde URL */}
      <Table
        data={paginatedCategories} // Solo los datos de la página actual
        columns={columns}
        loading={isLoading}
        emptyMessage="No hay categorías registradas"
        pagination={paginationConfig}
        mobileCardView={true}
        striped={true}
        hover={true}
      />
    </div>
  )
}

export default ProductCategoriesList 