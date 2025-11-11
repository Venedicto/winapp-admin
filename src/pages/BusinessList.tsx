import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import type { Business } from '../types/Business'
import { BusinessStats } from '../components/business'
import { getBusinessTableColumns, filterBusinesses } from '../utils'
import { useBusinesses } from '../services/business'
import { useBusinessFilters, getBusinessSearchFilters } from '../hooks/useBusinessFilters'

function BusinessList() {
  const navigate = useNavigate()
  
  // Usar la query de business real
  const { data: businessResponse, isLoading, error } = useBusinesses()
  
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
    filters,
    setFilter,
    clearAllFilters,
    hasActiveFilters
  } = useBusinessFilters()

  // Obtener businesses de la respuesta del API (TODOS los datos)
  const businesses = businessResponse?.data?.businesses || []

  // Filtrar negocios usando la utilidad (TODOS los datos filtrados)
  const filteredBusinesses = useMemo(() => {
    return filterBusinesses(businesses, search, filters.status, filters.open)
  }, [businesses, search, filters.status, filters.open])

  // Aplicar ordenamiento local
  const sortedBusinesses = useMemo(() => {
    if (!sortBy) return filteredBusinesses

    return [...filteredBusinesses].sort((a, b) => {
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
  }, [filteredBusinesses, sortBy, sortDirection])

  // Aplicar paginación local
  const paginatedBusinesses = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedBusinesses.slice(startIndex, endIndex)
  }, [sortedBusinesses, page, pageSize])

  // Configuración de paginación
  const paginationConfig = {
    currentPage: page,
    pageSize,
    total: sortedBusinesses.length,
    onPageChange: (newPage: number) => setPage(newPage),
    onPageSizeChange: (newSize: number) => setPageSize(newSize),
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50, 100]
  }

  // Configuración de búsqueda y filtros
  const searchFilters = getBusinessSearchFilters(
    filters.status,
    filters.open,
    (value: string) => setFilter('status', value || null),
    (value: string) => setFilter('open', value || null)
  )

  // Obtener columnas de la tabla con ordenamiento
  const columns = getBusinessTableColumns().map(column => ({
    ...column,
    sortable: true,
    // Agregar función de ordenamiento
    onSort: column.sortable ? () => toggleSort(column.key as string) : undefined,
    // Indicar si está siendo ordenado
    sortDirection: sortBy === column.key ? sortDirection : undefined
  }))

  const handleRowClick = (business: Business) => {
    navigate(`/dashboard/comercios/${business.id}`)
  }

  // Manejar estados de error
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error al cargar los comercios</p>
          <p className="text-gray-500 text-sm">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 bg-white overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lista de Comercios</h1>
          <p className="text-gray-600">
            Mostrando {sortedBusinesses.length} de {businesses.length} comercios
            {hasActiveFilters && ' (filtrados)'}
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

      {/* Search and Filters */}
      <SearchWithFilters
        placeholder="Buscar comercios por nombre, descripción o dirección..."
        initialSearchValue={search}
        onSearch={(query) => setSearch(query || null)}
        onReset={clearAllFilters}
        filters={searchFilters}
      />

      {/* Stats cards */}
      <BusinessStats businesses={sortedBusinesses} />

      {/* Table con paginación y ordenamiento desde URL */}
      <Table
        data={paginatedBusinesses} // Solo los datos de la página actual
        columns={columns}
        loading={isLoading}
        emptyMessage="No hay comercios registrados"
        onRowClick={handleRowClick}
        pagination={paginationConfig}
        mobileCardView={true}
        striped={true}
        hover={true}
      />
    </div>
  )
}

export default BusinessList 