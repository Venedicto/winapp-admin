import Modal from '../ui/Modal'
import ModalHeader from '../ui/ModalHeader'
import { NotificationForm } from './NotificationForm'
import type { Notification, CreateNotificationRequest } from '../../types/Notification'

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  notification?: Notification
  onSubmit: (data: CreateNotificationRequest) => void
  isLoading?: boolean
}

export function NotificationModal({
  isOpen,
  onClose,
  notification,
  onSubmit,
  isLoading = false
}: NotificationModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-3xl">
      <ModalHeader
        title={notification ? 'Editar Notificación' : 'Nueva Notificación'}
      />
      
      <div className="p-6">
        <NotificationForm
          notification={notification}
          onSubmit={onSubmit}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </div>
    </Modal>
  )
} 