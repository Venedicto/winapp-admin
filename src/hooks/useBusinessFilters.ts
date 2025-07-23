import { useCallback, useMemo } from 'react'
import { 
  useQueryState, 
  parseAsInteger, 
  parseAsString,
  parseAsStringEnum
} from 'nuqs'
import { BUSINESS_STATUS } from '../types/Business'

export function useBusinessFilters() {
  // Estados de búsqueda
  const [search, setSearchState] = useQueryState(
    'search',
    parseAsString.withDefault('')
  )
  
  // Estados de paginación
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  )
  
  const [pageSize, setPageSizeState] = useQueryState(
    'pageSize',
    parseAsInteger.withDefault(10)
  )
  
  // Estados de ordenamiento
  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsString.withDefault('')
  )
  
  const [sortDirection, setSortDirection] = useQueryState(
    'sortDirection',
    parseAsStringEnum(['asc', 'desc']).withDefault('asc')
  )
  
  // Estados de filtros específicos para business
  const [statusFilter, setStatusFilter] = useQueryState(
    'status',
    parseAsString.withDefault('')
  )
  
  const [openFilter, setOpenFilter] = useQueryState(
    'open',
    parseAsString.withDefault('')
  )
  
  // Funciones utilitarias
  const resetPagination = useCallback(() => {
    return setPage(1)
  }, [setPage])
  
  const toggleSort = useCallback(async (column: string) => {
    if (sortBy === column) {
      // Si ya está ordenado por esta columna, cambiar dirección
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
      return setSortDirection(newDirection)
    } else {
      // Si es una columna nueva, establecer como ascendente
      await setSortBy(column)
      return setSortDirection('asc')
    }
  }, [sortBy, sortDirection, setSortBy, setSortDirection])
  
  const setFilter = useCallback(async (key: string, value: string | null) => {
    await resetPagination() // Resetear paginación al cambiar filtro
    
    switch (key) {
      case 'status':
        return setStatusFilter(value)
      case 'open':
        return setOpenFilter(value)
      default:
        return new URLSearchParams()
    }
  }, [resetPagination, setStatusFilter, setOpenFilter])
  
  const setSearch = useCallback(async (value: string | null) => {
    await resetPagination()
    return setSearchState(value)
  }, [setSearchState, resetPagination])
  
  const setPageSize = useCallback(async (value: number | null) => {
    await setPage(1)
    return setPageSizeState(value)
  }, [setPage, setPageSizeState])
  
  const clearAllFilters = useCallback(async () => {
    // Limpiar búsqueda
    await setSearchState('')
    
    // Resetear paginación
    await setPage(1)
    
    // Limpiar ordenamiento
    await setSortBy('')
    await setSortDirection('asc')
    
    // Limpiar filtros específicos
    await setStatusFilter('')
    await setOpenFilter('')
    
    return new URLSearchParams()
  }, [setSearchState, setPage, setSortBy, setSortDirection, setStatusFilter, setOpenFilter])
  
  // Verificar si hay filtros activos
  const hasActiveFilters = useMemo(() => {
    if (search) return true
    if (page > 1) return true
    if (sortBy) return true
    if (statusFilter) return true
    if (openFilter) return true
    
    return false
  }, [search, page, sortBy, statusFilter, openFilter])
  
  // Obtener valores de filtros actuales
  const filters = useMemo(() => ({
    status: statusFilter,
    open: openFilter
  }), [statusFilter, openFilter])
  
  // Query key para react-query (útil para invalidaciones)
  const queryKey = useMemo(() => {
    const key = ['business-table-data', search, page, pageSize, sortBy, sortDirection]
    if (statusFilter) key.push(`status:${statusFilter}`)
    if (openFilter) key.push(`open:${openFilter}`)
    return key
  }, [search, page, pageSize, sortBy, sortDirection, statusFilter, openFilter])
  
  return {
    // Búsqueda
    search,
    setSearch,
    
    // Paginación
    page,
    pageSize,
    setPage,
    setPageSize,
    resetPagination,
    
    // Ordenamiento
    sortBy,
    sortDirection,
    setSortBy,
    setSortDirection,
    toggleSort,
    
    // Filtros
    filters,
    setFilter,
    
    // Utilidades
    clearAllFilters,
    hasActiveFilters,
    queryKey
  }
}

export function getBusinessSearchFilters(
  statusValue: string,
  openValue: string,
  onStatusChange: (value: string) => void,
  onOpenChange: (value: string) => void
) {
  return [
    {
      key: 'status',
      label: 'Estado',
      type: 'select' as const,
      value: statusValue,
      onChange: onStatusChange,
      options: [
        { value: '', label: 'Todos los estados' },
        { value: BUSINESS_STATUS.PENDING, label: 'Pendiente' },
        { value: BUSINESS_STATUS.ACCEPTED, label: 'Aprobado' },
        { value: BUSINESS_STATUS.REJECTED, label: 'Rechazado' },
        { value: BUSINESS_STATUS.SUSPENDED, label: 'Suspendido' }
      ]
    },
    {
      key: 'open',
      label: 'Estado de Apertura',
      type: 'select' as const,
      value: openValue,
      onChange: onOpenChange,
      options: [
        { value: '', label: 'Todos' },
        { value: 'true', label: 'Abierto' },
        { value: 'false', label: 'Cerrado' }
      ]
    }
  ]
} 