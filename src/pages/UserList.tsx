import { useState, useMemo, useCallback } from 'react'
import Table, { usePagination } from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import type { User } from '../types/User'
import { getUserTableColumns } from '../utils/userTableColumns'
import { filterUsers, getUserSearchFilters } from '../utils/userFilters'
import { useClients } from '../services/user'

function UserList() {
  // Usar la query de clientes real
  const { data: clientsResponse, isLoading, error } = useClients()
  
  // Estados para búsqueda y filtros
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('')
  const [subscriptionFilter, setSubscriptionFilter] = useState('')
  const [creditsFilter, setCreditsFilter] = useState('')
  
  // Hook de paginación
  const {
    currentPage,
    pageSize,
    handlePageChange,
    handlePageSizeChange
  } = usePagination(5) // Comenzar con 5 elementos por página

  // Obtener usuarios de la respuesta del API
  const users = clientsResponse?.data || []

  // Filtrar usuarios usando la utilidad
  const filteredUsers = useMemo(() => {
    return filterUsers(users, searchQuery, roleFilter, subscriptionFilter, creditsFilter)
  }, [users, searchQuery, roleFilter, subscriptionFilter, creditsFilter])

  // Configuración de paginación (usar datos filtrados)
  const paginationConfig = {
    currentPage,
    pageSize,
    total: filteredUsers.length,
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
    setRoleFilter('')
    setSubscriptionFilter('')
    setCreditsFilter('')
    handlePageChange(1)
  }, [handlePageChange])

  // Obtener filtros usando la utilidad
  const searchFilters = getUserSearchFilters(
    roleFilter,
    subscriptionFilter,
    creditsFilter,
    (value: string) => {
      setRoleFilter(value)
      handlePageChange(1)
    },
    (value: string) => {
      setSubscriptionFilter(value)
      handlePageChange(1)
    },
    (value: string) => {
      setCreditsFilter(value)
      handlePageChange(1)
    }
  )

  // Obtener columnas de la tabla
  const columns = getUserTableColumns()

  const handleRowClick = (user: User) => {
    console.log('Clicked user:', user.fullName)
    // Aquí podrías navegar a la página de detalles del usuario
  }

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
      {/* Search and Filters */}
      <SearchWithFilters
        placeholder="Buscar usuarios por nombre, email o teléfono..."
        onSearch={handleSearch}
        onReset={handleResetFilters}
        filters={searchFilters}
      />


      {/* <UserStats users={filteredUsers} /> */}

      {/* Table */}
      <Table
        data={filteredUsers}
        columns={columns}
        loading={isLoading}
        emptyMessage="No hay usuarios registrados"
        onRowClick={handleRowClick}
        pagination={paginationConfig}
      />
    </div>
  )
}

export default UserList 