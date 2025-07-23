import type { User } from '../types/User'

export const getUserSearchFilters = (
  roleFilter: string,
  subscriptionFilter: string,
  creditsFilter: string,
  onRoleChange: (value: string) => void,
  onSubscriptionChange: (value: string) => void,
  onCreditsChange: (value: string) => void
) => [
  {
    label: 'Rol',
    key: 'role',
    value: roleFilter,
    onChange: onRoleChange,
    options: [
      { label: 'Cliente', value: 'Client' },
      { label: 'Administrador', value: 'Admin' },
      { label: 'Propietario', value: 'Business_Owner' },
      { label: 'Moderador', value: 'Moderator' }
    ]
  },
  {
    label: 'Suscripciones',
    key: 'subscription',
    value: subscriptionFilter,
    onChange: onSubscriptionChange,
    options: [
      { label: 'Con suscripciones activas', value: 'active' },
      { label: 'Con suscripciones inactivas', value: 'inactive' },
      { label: 'Sin suscripciones', value: 'none' },
      { label: 'Con cualquier suscripción', value: 'any' }
    ]
  },
  {
    label: 'Créditos',
    key: 'credits',
    value: creditsFilter,
    onChange: onCreditsChange,
    options: [
      { label: 'Con suscripciones que tienen créditos', value: 'with_credits' },
      { label: 'Sin suscripciones con créditos', value: 'no_credits' },
      { label: 'Con suscripción +100 créditos', value: 'high_credits' }
    ]
  }
]

// Configuración de opciones para diferentes tipos de filtros
export const userRoleOptions = [
  { label: 'Cliente', value: 'Client' },
  { label: 'Administrador', value: 'Admin' },
  { label: 'Propietario', value: 'Business_Owner' },
  { label: 'Moderador', value: 'Moderator' }
]

export const userSubscriptionOptions = [
  { label: 'Con suscripciones activas', value: 'active' },
  { label: 'Con suscripciones inactivas', value: 'inactive' },
  { label: 'Sin suscripciones', value: 'none' },
  { label: 'Con cualquier suscripción', value: 'any' }
]

export const userCreditsOptions = [
  { label: 'Con suscripciones que tienen créditos', value: 'with_credits' },
  { label: 'Sin suscripciones con créditos', value: 'no_credits' },
  { label: 'Con suscripción +100 créditos', value: 'high_credits' }
]

// Función para filtrar usuarios
export const filterUsers = (
  users: User[], 
  searchQuery: string
) => {
  return users.filter(user => {
    // Solo filtro de búsqueda (busca en nombre, email y teléfono)
    const matchesSearch = searchQuery === '' || 
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone && user.phone.includes(searchQuery))
    
    return matchesSearch
  })
}

// Funciones de utilidad para estadísticas
export const getUserStats = (users: User[]) => {
  const totalUsers = users.length
  const clientsCount = users.filter(u => u.role === 'Client').length
  const adminsCount = users.filter(u => u.role === 'Admin').length
  const businessOwnersCount = users.filter(u => u.role === 'Partner').length
  
  const usersWithSubscriptions = users.filter(u => u.subscriptions.length > 0).length
  const usersWithActiveSubscriptions = users.filter(u => u.subscriptions.some(sub => sub.active)).length
  const usersWithCredits = users.filter(u => 
    u.subscriptions.some(sub => parseInt(sub.credits || '0') > 0)
  ).length
  
  // Contar suscripciones con créditos (no usuarios)
  const totalSubscriptionsWithCredits = users.reduce((total, user) => 
    total + user.subscriptions.filter(sub => parseInt(sub.credits || '0') > 0).length, 0
  )
  
  // Contar total de suscripciones
  const totalSubscriptions = users.reduce((total, user) => total + user.subscriptions.length, 0)
  
  return {
    totalUsers,
    clientsCount,
    adminsCount,
    businessOwnersCount,
    usersWithSubscriptions,
    usersWithActiveSubscriptions,
    usersWithCredits,
    totalSubscriptionsWithCredits,
    totalSubscriptions,
    averageSubscriptionsPerUser: totalUsers > 0 ? totalSubscriptions / totalUsers : 0
  }
}

// Función para buscar usuarios por diferentes criterios
export const searchUsers = (users: User[], query: string) => {
  const lowercaseQuery = query.toLowerCase()
  
  return users.filter(user => 
    user.fullName.toLowerCase().includes(lowercaseQuery) ||
    user.email.toLowerCase().includes(lowercaseQuery) ||
    user.id.toLowerCase().includes(lowercaseQuery) ||
    (user.phone && user.phone.includes(query)) ||
    (user.customerId && user.customerId.toLowerCase().includes(lowercaseQuery)) ||
    user.role.toLowerCase().includes(lowercaseQuery)
  )
} 