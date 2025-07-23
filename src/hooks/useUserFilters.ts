import { useCallback, useMemo } from 'react'
import { 
  useQueryState, 
  parseAsInteger, 
  parseAsString,
  parseAsStringEnum
} from 'nuqs'

export function useUserFilters() {
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
  
  // Funciones utilitarias
  const resetPagination = useCallback(() => {
    return setPage(1)
  }, [setPage])
  
  const toggleSort = useCallback(async (column: string) => {
    if (sortBy === column) {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
      return setSortDirection(newDirection)
    } else {
      await setSortBy(column)
      return setSortDirection('asc')
    }
  }, [sortBy, sortDirection, setSortBy, setSortDirection])
  
  const setFilter = useCallback(async (_key: string, _value: string | null) => {
    // No hay filtros específicos para usuarios
    return new URLSearchParams()
  }, [])
  
  const setSearch = useCallback(async (value: string | null) => {
    await resetPagination()
    return setSearchState(value)
  }, [setSearchState, resetPagination])
  
  const setPageSize = useCallback(async (value: number | null) => {
    await setPage(1)
    return setPageSizeState(value)
  }, [setPage, setPageSizeState])
  
  const clearAllFilters = useCallback(async () => {
    await setSearchState('')
    await setPage(1)
    await setSortBy('')
    await setSortDirection('asc')
    return new URLSearchParams()
  }, [setSearchState, setPage, setSortBy, setSortDirection])
  
  const hasActiveFilters = useMemo(() => {
    if (search) return true
    if (page > 1) return true
    if (sortBy) return true
    return false
  }, [search, page, sortBy])
  
  const filters = useMemo(() => ({}), [])
  
  const queryKey = useMemo(() => {
    return ['user-table-data', search, page, pageSize, sortBy, sortDirection]
  }, [search, page, pageSize, sortBy, sortDirection])
  
  return {
    search,
    setSearch,
    page,
    pageSize,
    setPage,
    setPageSize,
    resetPagination,
    sortBy,
    sortDirection,
    setSortBy,
    setSortDirection,
    toggleSort,
    filters,
    setFilter,
    clearAllFilters,
    hasActiveFilters,
    queryKey
  }
}

export function getUserSearchFilters() {
  return []
} 