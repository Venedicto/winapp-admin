import { type TableColumn } from '../components/ui/Table'
import type { User } from '../types/User'
import { UserActionButtons, UserStatusBadge } from '../components/user'

export const getUserTableColumns = (): TableColumn<User>[] => [
  {
    key: 'fullName',
    title: 'Usuario',
    width: '25%',
    render: (fullName: string, user: User) => (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 h-10 w-10 lg:h-12 lg:w-12">
          <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center border-2 border-white shadow-sm">
            <span className="text-white font-semibold text-sm lg:text-base">
              {fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {fullName}
          </div>
          <div className="text-xs lg:text-sm text-gray-500 truncate">
            {user.email}
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'email',
    title: 'Email',
    width: '20%',
    hideOnMobile: true,
    hideOnTablet: true,
    render: (email: string, user: User) => (
      <div className="w-full overflow-hidden">
        <div className="text-sm text-gray-900 truncate">
          {email}
        </div>
        {user.phone && (
          <div className="text-xs text-gray-500 flex items-center mt-1">
            <span className="mr-1 flex-shrink-0">📞</span>
            <span className="truncate">{user.phone}</span>
          </div>
        )}
      </div>
    )
  },
  {
    key: 'role',
    title: 'Rol',
    width: '15%',
    hideOnMobile: true,
    render: (role: string, user: User) => (
      <UserStatusBadge user={user} />
    )
  },
  {
    key: 'subscriptions',
    title: 'Suscripciones',
    width: '15%',
    hideOnMobile: true,
    render: (subscriptions: User['subscriptions']) => {
      const activeCount = subscriptions.filter(sub => sub.active).length
      
      return (
        <div className="text-sm">
          <div className="font-medium text-gray-900">
            {subscriptions.length} total
          </div>
          <div className="text-xs text-gray-500">
            {activeCount} activa{activeCount !== 1 ? 's' : ''}
          </div>
         
        </div>
      )
    }
  },
  {
    key: 'customerId',
    title: 'Cliente ID',
    width: '15%',
    hideOnMobile: true,
    hideOnTablet: true,
    render: (customerId: string | null) => (
      <div className="text-sm text-gray-900 font-mono">
        {customerId ? (
          <span className="bg-gray-100 px-2 py-1 rounded text-xs">
            {customerId.substring(0, 8)}...
          </span>
        ) : (
          <span className="text-gray-400 text-xs">Sin asignar</span>
        )}
      </div>
    )
  },
  {
    key: 'createdAt',
    title: 'Registro',
    width: '10%',
    hideOnMobile: true,
    render: (createdAt: string) => {
      const date = new Date(createdAt)
      return (
        <div className="text-sm text-gray-900">
          <div>{date.toLocaleDateString('es-ES')}</div>
          <div className="text-xs text-gray-500">
            {date.toLocaleTimeString('es-ES', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      )
    }
  },
  {
    key: 'actions',
    title: 'Acciones',
    width: '10%',
    hideOnMobile: true,
    render: (_, user: User) => (
      <UserActionButtons 
        user={user}
        onEdit={(user) => console.log('Editar usuario:', user.id)}
        onDelete={(user) => console.log('Eliminar usuario:', user.id)}
        onToggleSubscription={(user) => console.log('Toggle suscripción:', user.id)}
        onSendEmail={(user) => console.log('Enviar email:', user.email)}
        onManageCredits={(user) => console.log('Gestionar créditos:', user.id)}
      />
    )
  }
]

// Configuración de columnas compacta para móviles
export const getUserMobileColumns = (): TableColumn<User>[] => [
  {
    key: 'fullName',
    title: 'Usuario',
    width: '70%',
    render: (fullName: string, user: User) => (
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 h-10 w-10">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center border-2 border-white shadow-sm">
            <span className="text-white font-semibold text-sm">
              {fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 truncate">
            {fullName}
          </div>
          <div className="text-xs text-gray-500 truncate">
            {user.email}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <UserStatusBadge user={user} />
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'subscriptions',
    title: 'Estado',
    width: '20%',
    render: (subscriptions: User['subscriptions']) => {
      const activeCount = subscriptions.filter(sub => sub.active).length
      const subscriptionsWithCredits = subscriptions.filter(sub => parseInt(sub.credits || '0') > 0)
      
      return (
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {activeCount}/{subscriptions.length}
          </div>
          <div className="text-xs text-gray-500">
            suscripciones
          </div>
          {/* Mostrar créditos por suscripción en móvil */}
          {subscriptionsWithCredits.length > 0 && (
            <div className="text-xs text-blue-600 font-medium">
              {subscriptionsWithCredits.length} con 💰
            </div>
          )}
        </div>
      )
    }
  },
  {
    key: 'actions',
    title: '',
    width: '10%',
    render: (_, user: User) => (
      <UserActionButtons 
        user={user}
        onEdit={(user) => console.log('Editar usuario:', user.id)}
        onDelete={(user) => console.log('Eliminar usuario:', user.id)}
        onToggleSubscription={(user) => console.log('Toggle suscripción:', user.id)}
        onSendEmail={(user) => console.log('Enviar email:', user.email)}
        onManageCredits={(user) => console.log('Gestionar créditos:', user.id)}
      />
    )
  }
] 