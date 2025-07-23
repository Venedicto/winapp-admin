import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Table, { usePagination } from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import type { Business } from '../types/Business'
import { BusinessStats } from '../components/business'
import { getBusinessTableColumns, getBusinessSearchFilters, filterBusinesses } from '../utils'
import { useBusinesses } from '../services/business'

function BusinessList() {
  const navigate = useNavigate()
  
  // Usar la query de business real
  const { data: businessResponse, isLoading, error } = useBusinesses()
  
  // Estados para búsqueda y filtros
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [openFilter, setOpenFilter] = useState('')
  
  // Hook de paginación
  const {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = usePagination(5) // Comenzar con 5 elementos por página

  // Obtener businesses de la respuesta del API
  const businesses = businessResponse?.data?.businesses || []

  // Filtrar negocios usando la utilidad
  const filteredBusinesses = useMemo(() => {
    return filterBusinesses(businesses, searchQuery, statusFilter, openFilter)
  }, [businesses, searchQuery, statusFilter, openFilter])

  // Configuración de paginación (usar datos filtrados)
  const paginationConfig = {
    currentPage,
    pageSize,
    total: filteredBusinesses.length,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50]
  }

  // Configuración de búsqueda y filtros
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    handlePageChange(1) // Resetear a la primera página al buscar
  }, [handlePageChange])

  const handleResetFilters = useCallback(() => {
    setSearchQuery('')
    setStatusFilter('')
    setOpenFilter('')
    handlePageChange(1)
  }, [handlePageChange])

  // Obtener filtros usando la utilidad
  const searchFilters = getBusinessSearchFilters(
    statusFilter,
    openFilter,
    (value: string) => {
      setStatusFilter(value)
      handlePageChange(1)
    },
    (value: string) => {
      setOpenFilter(value)
      handlePageChange(1)
    }
  )

  // Obtener columnas de la tabla
  const columns = getBusinessTableColumns()

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
    <div className="space-y-8 bg-white">
      {/* Search and Filters */}
      <SearchWithFilters
        placeholder="Buscar comercios por nombre, descripción o dirección..."
        onSearch={handleSearch}
        onReset={handleResetFilters}
        filters={searchFilters}
      />

      {/* Stats cards */}
      <BusinessStats businesses={filteredBusinesses} />

      {/* Table */}
      <Table
        data={filteredBusinesses}
        columns={columns}
        loading={isLoading}
        emptyMessage="No hay comercios registrados"
        // onRowClick={handleRowClick}
        pagination={paginationConfig}
      />
    </div>
  )
}

export default BusinessList 