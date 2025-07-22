import type { User } from '../../types/User'

interface UserStatsProps {
  users: User[]
}

export default function UserStats({ users }: UserStatsProps) {
  const stats = {
    total: users.length,
    clients: users.filter(user => user.role === 'Client').length,
    admins: users.filter(user => user.role === 'Admin').length,
    businessOwners: users.filter(user => user.role === 'Partner').length,
    withSubscriptions: users.filter(user => user.subscriptions.length > 0).length,
    activeSubscriptions: users.filter(user => 
      user.subscriptions.some(sub => sub.active)
    ).length,
    withCredits: users.filter(user => 
      user.subscriptions.some(sub => parseInt(sub.credits || '0') > 0)
    ).length,
    // Contar total de suscripciones con créditos (no usuarios)
    subscriptionsWithCredits: users.reduce((total, user) => 
      total + user.subscriptions.filter(sub => parseInt(sub.credits || '0') > 0).length, 0
    ),
  }

  const statCards = [
    {
      title: 'Total Usuarios',
      value: stats.total,
      icon: '👥',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      textColor: 'text-white'
    },
    {
      title: 'Clientes',
      value: stats.clients,
      icon: '👤',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      textColor: 'text-white'
    },
    {
      title: 'Con Suscripciones',
      value: stats.withSubscriptions,
      icon: '📋',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      textColor: 'text-white'
    },
    {
      title: 'Suscripciones con Créditos',
      value: stats.subscriptionsWithCredits,
      icon: '💰',
      bgColor: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
      textColor: 'text-white'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className={`${card.bgColor} ${card.textColor} rounded-2xl lg:rounded-3xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-medium opacity-90 truncate">
                {card.title}
              </p>
              <p className="text-2xl lg:text-3xl font-bold mt-1 lg:mt-2">
                {card.value.toLocaleString()}
              </p>
            </div>
            <div className="text-2xl lg:text-3xl opacity-90 ml-2 flex-shrink-0">
              {card.icon}
            </div>
          </div>
          
          {/* Indicador de porcentaje */}
          {stats.total > 0 && index < 3 && (
            <div className="mt-3 lg:mt-4">
              <div className="flex items-center justify-between text-xs lg:text-sm opacity-90">
                <span>% del total</span>
                <span className="font-semibold">
                  {((card.value / stats.total) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="mt-1 lg:mt-2 bg-white/20 rounded-full h-1.5 lg:h-2">
                <div
                  className="bg-white rounded-full h-1.5 lg:h-2 transition-all duration-500"
                  style={{ width: `${(card.value / stats.total) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Para la última tarjeta, mostrar el total de suscripciones como referencia */}
          {index === 3 && stats.withSubscriptions > 0 && (
            <div className="mt-3 lg:mt-4">
              <div className="flex items-center justify-between text-xs lg:text-sm opacity-90">
                <span>De {users.reduce((total, user) => total + user.subscriptions.length, 0)} suscripciones</span>
                <span className="font-semibold">
                  {((card.value / users.reduce((total, user) => total + user.subscriptions.length, 0)) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="mt-1 lg:mt-2 bg-white/20 rounded-full h-1.5 lg:h-2">
                <div
                  className="bg-white rounded-full h-1.5 lg:h-2 transition-all duration-500"
                  style={{ width: `${(card.value / users.reduce((total, user) => total + user.subscriptions.length, 0)) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 