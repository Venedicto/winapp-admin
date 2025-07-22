import type { User, UserRole } from '../../types/User'

interface UserStatusBadgeProps {
  user: User
}

export default function UserStatusBadge({ user }: UserStatusBadgeProps) {
  const getRoleConfig = (role: UserRole) => {
    switch (role) {
      case 'Admin':
        return {
          label: 'Administrador',
          icon: '👑',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200'
        }
      case 'Partner':
        return {
          label: 'Propietario',
          icon: '🏪',
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-800',
          borderColor: 'border-purple-200'
        }
      case 'Client':
        return {
          label: 'Usuario',
          icon: '🛡️',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-200'
        }
      default:
        return {
          label: 'Desconocido',
          icon: '❓',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-200'
        }
    }
  }

  const getSubscriptionStatus = () => {
    if (user.subscriptions.length === 0) {
      return {
        label: 'Sin suscripciones',
        icon: '📭',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-600',
        borderColor: 'border-gray-200'
      }
    }


  }

  const roleConfig = getRoleConfig(user.role)

  return (
    <div className="flex flex-col gap-1">
      {/* Badge de rol */}
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${roleConfig.bgColor} ${roleConfig.textColor} ${roleConfig.borderColor}`}>
        <span className="mr-1">{roleConfig.icon}</span>
        {roleConfig.label}
      </span>
      
    </div>
  )
} 