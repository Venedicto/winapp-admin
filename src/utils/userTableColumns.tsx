import { type TableColumn } from '../components/ui/Table'
import type { User } from '../types/User'
import { UserActionButtons, UserStatusBadge } from '../components/user'

export const getUserTableColumns = (): TableColumn<User>[] => [
  {
    key: 'fullName',
    title: 'Usuario',
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
          <div className="flex items-center gap-2 mt-1 lg:hidden">
            <UserStatusBadge user={user} />
            <span className="text-xs text-gray-500">
              {user.subscriptions.filter(sub => sub.active).length}/{user.subscriptions.length} subs
            </span>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'email',
    title: 'Email',
    hideOnMobile: true,
    hideOnTablet: true,
    render: (email: string, user: User) => (
      <div className="min-w-0">
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
    hideOnMobile: true,
    render: (_role: string, user: User) => (
      <div>
        <UserStatusBadge user={user} />
      </div>
    )
  },
  {
    key: 'subscriptions',
    title: 'Suscripciones',
    hideOnMobile: true,
    render: (subscriptions: User['subscriptions']) => {
      const activeCount = subscriptions.filter(sub => sub.active).length

      return (
        <div className="text-sm">
          <div className="font-medium text-gray-900 whitespace-nowrap">
            {subscriptions.length} total
          </div>
          <div className="text-xs text-gray-500 whitespace-nowrap">
            {activeCount} activa{activeCount !== 1 ? 's' : ''}
          </div>

        </div>
      )
    }
  },
  {
    key: 'createdAt',
    title: 'Registro',
    hideOnMobile: true,
    render: (createdAt: string) => {
      const date = new Date(createdAt)
      return (
        <div className="text-sm text-gray-900">
          <div className="whitespace-nowrap">{date.toLocaleDateString('es-ES')}</div>
          <div className="text-xs text-gray-500 whitespace-nowrap">
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
    render: (_, user: User) => (
      <div>
        <UserActionButtons
          user={user}
          onEdit={(user) => console.log('Editar usuario:', user.id)}
          onDelete={(user) => console.log('Eliminar usuario:', user.id)}
          onViewSubscriptions={(user) => console.log('Ver suscripciones:', user.id, user.subscriptions)}
          onSendEmail={(user) => console.log('Enviar email:', user.email)}
          onManageCredits={(user) => console.log('Gestionar créditos:', user.id)}
        />
      </div>
    )
  }
]

// Configuración de columnas compacta para móviles
export const getUserMobileColumns = (): TableColumn<User>[] => [
  {
    key: 'fullName',
    title: 'Usuario',
    width: '80%',
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
            <span className="text-xs text-gray-500">
              {user.subscriptions.filter(sub => sub.active).length}/{user.subscriptions.length} subs
            </span>
          </div>
        </div>
      </div>
    )
  },
  {
    key: 'actions',
    title: '',
    width: '20%',
    render: (_, user: User) => (
      <div className="flex justify-end">
        <UserActionButtons
          user={user}
          onEdit={(user) => console.log('Editar usuario:', user.id)}
          onDelete={(user) => console.log('Eliminar usuario:', user.id)}
          onViewSubscriptions={(user) => console.log('Ver suscripciones:', user.id, user.subscriptions)}
          onSendEmail={(user) => console.log('Enviar email:', user.email)}
          onManageCredits={(user) => console.log('Gestionar créditos:', user.id)}
        />
      </div>
    )
  }
] 