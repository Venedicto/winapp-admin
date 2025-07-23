import { useState } from 'react'
import { 
  useNotifications, 
  useNotificationStats,
  useCreateNotification,
  useUpdateNotification,
  useDeleteNotification
} from '../services/notification'
import { NotificationCard, NotificationModal } from '../components/notification'
import Button from '../components/ui/Button'
import WithLoading from '../components/ui/WithLoading'
import type { Notification, CreateNotificationRequest } from '../types/Notification'

export default function NotificationsList() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNotification, setEditingNotification] = useState<Notification | undefined>()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Queries
  const { data: notifications, isLoading, error } = useNotifications()
  const { data: stats, isLoading: statsLoading } = useNotificationStats()

  // Mutations
  const createMutation = useCreateNotification()
  const updateMutation = useUpdateNotification()
  const deleteMutation = useDeleteNotification()

  const handleCreateNew = () => {
    setEditingNotification(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (notification: Notification) => {
    setEditingNotification(notification)
    setIsModalOpen(true)
  }

  const handleSubmit = async (data: CreateNotificationRequest) => {
    try {
      if (editingNotification) {
        // Actualizar notificación existente
        await updateMutation.mutateAsync({
          id: editingNotification.id,
          ...data
        })
      } else {
        // Crear nueva notificación
        await createMutation.mutateAsync(data)
      }
      setIsModalOpen(false)
      setEditingNotification(undefined)
    } catch (error) {
      console.error('Error al guardar notificación:', error)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteMutation.mutateAsync(id)
    } catch (error) {
      console.error('Error al eliminar notificación:', error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingNotification(undefined)
  }

  const isFormLoading = createMutation.isPending || updateMutation.isPending

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Notificaciones</h1>
          <p className="text-gray-600">
            Crea y gestiona notificaciones para usuarios del sistema
          </p>
        </div>
        <Button onClick={handleCreateNew}>
          ➕ Nueva Notificación
        </Button>
      </div>

      {/* Stats Cards */}
      <WithLoading isLoading={statsLoading} isError={false}>
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-600">Total</div>
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-600">Enviadas</div>
              <div className="text-2xl font-bold text-green-600">{stats.sent}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-600">Programadas</div>
              <div className="text-2xl font-bold text-blue-600">{stats.scheduled}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-600">Borradores</div>
              <div className="text-2xl font-bold text-gray-600">{stats.draft}</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="text-sm font-medium text-gray-600">Fallidas</div>
              <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            </div>
          </div>
        )}
      </WithLoading>

      {/* Notifications List */}
      <WithLoading isLoading={isLoading} isError={!!error}>
        <div className="space-y-4">
          {notifications && notifications.length > 0 ? (
            notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDeleting={deletingId === notification.id}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                📭 No hay notificaciones creadas
              </div>
              <p className="text-gray-400 mb-6">
                Crea tu primera notificación para comunicarte con los usuarios
              </p>
              <Button onClick={handleCreateNew}>
                ➕ Crear Primera Notificación
              </Button>
            </div>
          )}
        </div>
      </WithLoading>

      {/* Modal */}
      <NotificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        notification={editingNotification}
        onSubmit={handleSubmit}
        isLoading={isFormLoading}
      />
    </div>
  )
} 