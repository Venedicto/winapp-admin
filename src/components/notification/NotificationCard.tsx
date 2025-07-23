import { useState } from 'react'
import type { Notification } from '../../types/Notification'
import { formatDateAgora } from '../../utils/dateFormat'
import Button from '../ui/Button'
import AreYouSureModal from '../ui/AreYouSureModal'

interface NotificationCardProps {
  notification: Notification
  onEdit?: (notification: Notification) => void
  onDelete?: (id: string) => void
  isDeleting?: boolean
}

export function NotificationCard({ 
  notification, 
  onEdit, 
  onDelete, 
  isDeleting = false 
}: NotificationCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'SENT': { color: 'bg-green-100 text-green-800', label: 'Enviado' },
      'SCHEDULED': { color: 'bg-blue-100 text-blue-800', label: 'Programado' },
      'DRAFT': { color: 'bg-gray-100 text-gray-800', label: 'Borrador' },
      'FAILED': { color: 'bg-red-100 text-red-800', label: 'Falló' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  const getRecipientDisplay = () => {
    if (notification.destination === 'All') {
      return '👥 Todos los usuarios'
    }
    return `👤 Usuario específico`
  }

  const getDeliveryInfo = () => {
    if (!notification.deliveryDate) {
      return 'Envío inmediato'
    }
    
    const deliveryDate = new Date(notification.deliveryDate)
    const now = new Date()
    
    if (deliveryDate > now) {
      return `📅 Programado para ${deliveryDate.toLocaleDateString()} a las ${deliveryDate.toLocaleTimeString()}`
    } else {
      return `📅 Enviado ${formatDateAgora(notification.deliveryDate)}`
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {notification.title}
            </h3>
            {getStatusBadge(notification.status)}
          </div>
          <p className="text-gray-600 text-sm mb-3">
            {notification.body}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Destinatario:</span>
          <span>{getRecipientDisplay()}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Entrega:</span>
          <span>{getDeliveryInfo()}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Creado:</span>
          <span>{formatDateAgora(notification.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      {(onEdit || onDelete) && (
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
          
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeleteModal(true)}
              isLoading={isDeleting}
            >
              🗑️ Eliminar
            </Button>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <AreYouSureModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete?.(notification.id)
          setShowDeleteModal(false)
        }}
        title="Eliminar Notificación"
        message={`¿Estás seguro de que quieres eliminar la notificación "${notification.title}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        isLoading={isDeleting}
      />
    </div>
  )
} 