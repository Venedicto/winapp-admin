import { useState, useEffect, useMemo, useCallback } from 'react'
import Table, { usePagination } from '../components/ui/Table'
import { SearchWithFilters } from '../components/ui/Search'
import type { User } from '../types/User'
import { getUserTableColumns, getUserSearchFilters, filterUsers } from '../utils'

// Datos de ejemplo para mostrar la tabla
const mockUsers: User[] = [
  {
    "id": "user_2q8QOQhWrfrF14EhRFFlXzYcjY0",
    "fullName": "Test Ai2",
    "email": "testeosai02@gmail.com",
    "phone": null,
    "role": "Client",
    "customerId": null,
    "createdAt": "2024-12-12T22:14:51.002Z",
    "updatedAt": "2024-12-12T22:14:51.002Z",
    "deletedAt": null,
    "subscriptions": [
      {
        "id": "884eb7c6-76eb-4a45-a248-493558b4788c",
        "credits": "0",
        "active": true,
        "userId": "user_2q8QOQhWrfrF14EhRFFlXzYcjY0",
        "businessId": "c8067490-f3fe-4a34-a9e8-7b5f1dbf273c",
        "createdAt": "2024-12-12T22:15:46.262Z",
        "updatedAt": "2024-12-12T22:15:46.262Z",
        "deletedAt": null
      }
    ]
  },
  {
    "id": "user_3rKBlaqnXM3NSL1Ad8P1HfT29Ub",
    "fullName": "María González",
    "email": "maria.gonzalez@ejemplo.com",
    "phone": "+5491167024430",
    "role": "Partner",
    "customerId": "cust_123456789",
    "createdAt": "2024-12-10T15:30:25.500Z",
    "updatedAt": "2024-12-16T18:15:45.123Z",
    "deletedAt": null,
    "subscriptions": [
      {
        "id": "995eb7c6-76eb-4a45-a248-493558b4788d",
        "credits": "150",
        "active": true,
        "userId": "user_3rKBlaqnXM3NSL1Ad8P1HfT29Ub",
        "businessId": "d9067490-f3fe-4a34-a9e8-7b5f1dbf273d",
        "createdAt": "2024-12-10T15:45:30.500Z",
        "updatedAt": "2024-12-16T10:20:15.800Z",
        "deletedAt": null
      },
      {
        "id": "aa5eb7c6-76eb-4a45-a248-493558b4788e",
        "credits": "75",
        "active": false,
        "userId": "user_3rKBlaqnXM3NSL1Ad8P1HfT29Ub",
        "businessId": "e1067490-f3fe-4a34-a9e8-7b5f1dbf273e",
        "createdAt": "2024-12-05T08:15:20.100Z",
        "updatedAt": "2024-12-15T14:30:45.600Z",
        "deletedAt": null
      }
    ]
  }
]

function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  
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

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      // Generar más datos de ejemplo para mostrar la paginación
      const moreUsers: User[] = []
      const roles = ['Client', 'Business_Owner', 'Admin', 'Moderator']
      const names = [
        'Ana Martín', 'Carlos López', 'Elena Ruiz', 'David Torres', 
        'Sofia Herrera', 'Miguel Jiménez', 'Laura García', 'Pedro Sánchez',
        'Carmen Díaz', 'Antonio Moreno', 'Isabel Castro', 'Francisco Rubio'
      ]
      
      for (let i = 0; i < 30; i++) {
        const name = names[i % names.length]
        const role = roles[i % roles.length]
        const hasSubscriptions = Math.random() > 0.3
        const subscriptionsCount = hasSubscriptions ? Math.floor(Math.random() * 3) + 1 : 0
        
        const subscriptions = Array.from({ length: subscriptionsCount }, (_, subIndex) => ({
          id: `sub_${i}_${subIndex}`,
          credits: Math.floor(Math.random() * 200).toString(),
          active: Math.random() > 0.4,
          userId: `user_${i}`,
          businessId: `business_${i}_${subIndex}`,
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null
        }))
        
        moreUsers.push({
          id: `user_${i}`,
          fullName: `${name} ${i + 1}`,
          email: `${name.toLowerCase().replace(' ', '.')}${i + 1}@ejemplo.com`,
          phone: Math.random() > 0.5 ? `+549116702443${i}` : null,
          role: role as any,
          customerId: Math.random() > 0.6 ? `cust_${i}${Math.random().toString(36).substr(2, 9)}` : null,
          createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          deletedAt: null,
          subscriptions
        })
      }
      
      setUsers([...mockUsers, ...moreUsers])
      setLoading(false)
    }, 1500)
  }, [])

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

  return (
    <div className="space-y-8 bg-white">
      {/* Search and Filters */}
      <SearchWithFilters
        placeholder="Buscar usuarios por nombre, email o teléfono..."
        onSearch={handleSearch}
        onReset={handleResetFilters}
        filters={searchFilters}
      />

     

      {/* Table */}
      <Table
        data={filteredUsers}
        columns={columns}
        loading={loading}
        emptyMessage="No hay usuarios registrados"
        onRowClick={handleRowClick}
        pagination={paginationConfig}
      />
    </div>
  )
}

export default UserList 