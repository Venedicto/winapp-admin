import { useState } from 'react'
import type { User } from '../../types/User'

interface UserActionButtonsProps {
  user: User
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  onToggleSubscription?: (user: User) => void
  onSendEmail?: (user: User) => void
  onManageCredits?: (user: User) => void
}

export default function UserActionButtons({ 
  user, 
  onEdit, 
  onDelete, 
  onToggleSubscription,
  onSendEmail,
  onManageCredits
}: UserActionButtonsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleEdit = () => {
    onEdit?.(user)
    setIsOpen(false)
  }

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario ${user.fullName}?`)) {
      onDelete?.(user)
    }
    setIsOpen(false)
  }

  const handleToggleSubscription = () => {
    onToggleSubscription?.(user)
    setIsOpen(false)
  }

  const handleSendEmail = () => {
    onSendEmail?.(user)
    setIsOpen(false)
  }

  const handleManageCredits = () => {
    onManageCredits?.(user)
    setIsOpen(false)
  }

  const hasActiveSubscriptions = user.subscriptions.some(sub => sub.active)
  const subscriptionsWithCredits = user.subscriptions.filter(sub => parseInt(sub.credits || '0') > 0)

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 z-20 mt-2 w-64 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 border border-gray-200">
            <div className="py-2">
            
              

             
              
              <button
                onClick={() => {
                  console.log('Ver suscripciones del usuario:', user.id)
                  setIsOpen(false)
                }}
                className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <span className="mr-3 text-gray-400 group-hover:text-gray-500">📋</span>
                Ver Suscripciones ({user.subscriptions.length})
              </button>

              <div className="border-t border-gray-100 my-1" />
              
              <button
                onClick={handleDelete}
                className="group flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <span className="mr-3 text-red-400 group-hover:text-red-500">🗑️</span>
                Eliminar Usuario
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
} 