import { useMemo } from 'react'
import Table from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import { getUserTableColumns } from '../utils/userTableColumns'
import { filterUsers } from '../utils/userFilters'
import { useUserFilters } from '../hooks/useUserFilters'
import { useClients } from '../services/user'

function UserList() {
  // Usar la query de clientes real
  const { data: clientsResponse, isLoading, error } = useClients()
  
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
  } = useUserFilters()

  // Obtener usuarios de la respuesta del API (TODOS los datos)
  const users = clientsResponse?.data || []

  // Filtrar usuarios usando la utilidad (solo búsqueda)
  const filteredUsers = useMemo(() => {
    return filterUsers(users, search)
  }, [users, search])

  // Aplicar ordenamiento local
  const sortedUsers = useMemo(() => {
    if (!sortBy) return filteredUsers

    return [...filteredUsers].sort((a, b) => {
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
  }, [filteredUsers, sortBy, sortDirection])

  // Aplicar paginación local
  const paginatedUsers = useMemo(() => {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return sortedUsers.slice(startIndex, endIndex)
  }, [sortedUsers, page, pageSize])

  // Configuración de paginación
  const paginationConfig = {
    currentPage: page,
    pageSize,
    total: sortedUsers.length,
    onPageChange: (newPage: number) => setPage(newPage),
    onPageSizeChange: (newSize: number) => setPageSize(newSize),
    showSizeChanger: true,
    pageSizeOptions: [5, 10, 20, 50, 100]
  }

  // Obtener columnas de la tabla con ordenamiento
  const columns = getUserTableColumns().map(column => ({
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
          <p className="text-red-600 mb-2">Error al cargar los usuarios</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Lista de Usuarios</h1>
          <p className="text-gray-600">
            Mostrando {sortedUsers.length} de {users.length} usuarios
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

      {/* Search */}
      <SearchWithFilters
        placeholder="Buscar usuarios por nombre, email o teléfono..."
        initialSearchValue={search}
        onSearch={(query) => setSearch(query || null)}
        onReset={clearAllFilters}
        filters={[]} // Sin filtros específicos
      />

      {/* Table con paginación y ordenamiento desde URL */}
      <Table
        data={paginatedUsers} // Solo los datos de la página actual
        columns={columns}
        loading={isLoading}
        emptyMessage="No hay usuarios registrados"
        pagination={paginationConfig}
        mobileCardView={true}
        striped={true}
        hover={true}
      />
    </div>
  )
}

export default UserList 