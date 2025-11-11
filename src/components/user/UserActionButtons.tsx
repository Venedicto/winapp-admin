import { useState } from 'react'
import { toast } from 'sonner'
import type { User } from '../../types/User'
import { DeleteButton, AreYouSureModal } from '../ui'

interface UserActionButtonsProps {
  user: User
  onEdit?: (user: User) => void
  onDelete?: (user: User) => void
  onViewSubscriptions?: (user: User) => void
  onSendEmail?: (user: User) => void
  onManageCredits?: (user: User) => void
}

export default function UserActionButtons({
  user,
  onDelete,
  onViewSubscriptions,
}: UserActionButtonsProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    onDelete?.(user)
    setShowDeleteModal(false)
  }

  const handleViewSubscriptions = () => {
    if (!user.subscriptions || user.subscriptions.length === 0) {
      toast.info('Este usuario no tiene suscripciones')
      return
    }
    onViewSubscriptions?.(user)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleViewSubscriptions}
        className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
        title={`Ver suscripciones (${user.subscriptions.length})`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </button>

      <DeleteButton
        onClick={handleDelete}
        title="Eliminar usuario"
      />

      <AreYouSureModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Eliminar Usuario"
        message={`¿Estás seguro de que deseas eliminar al usuario ${user.fullName}? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </div>
  )
} 