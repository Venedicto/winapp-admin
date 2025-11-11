import type { Notification, CreateNotificationRequest, NotificationStats, ApiResponse } from '../../types/Notification'
import { handleEmptyListResponse } from '../../utils/apiHelpers'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// ========== FUNCIONES DE FETCH PARA NOTIFICACIONES ==========

// GET /notification - Obtener todas las notificaciones
export const fetchNotifications = async (token: string): Promise<Notification[]> => {
  const response = await fetch(`${API_URL}/notifications`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  const responseData = await handleEmptyListResponse<ApiResponse<{notifications: Notification[]}>>(
    response,
    { status: 'success', data: { notifications: [] } } as ApiResponse<{notifications: Notification[]}>
  )

  if (responseData.status === "error") {
    throw new Error(responseData.message)
  }

  if (Object.keys(responseData.data).includes("message")) {
    return []
  }

  return responseData.data.notifications
}

// POST /notification - Crear nueva notificación
export const createNotification = async (
  token: string, 
  notification: CreateNotificationRequest
): Promise<Notification> => {
  const payload = {
    title: notification.title,
    body: notification.body,
    destination:  notification.destination === "all" ? undefined : notification.destination,
    userId: notification.userId ? notification.userId : undefined,
    deliveryDate: notification.deliveryDate || null
  }

  const response = await fetch(`${API_URL}/notification`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    throw new Error(`Error al crear notificación: ${response.statusText}`)
  }

  const data = await response.json()
  return data.data || data
}

// DELETE /notification?id= - Eliminar notificación
export const deleteNotification = async (
  token: string, 
  notificationId: string
): Promise<void> => {
  const response = await fetch(`${API_URL}/notification?id=${notificationId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Error al eliminar notificación: ${response.statusText}`)
  }
}

// Función para obtener estadísticas (calculadas localmente)
export const fetchNotificationStats = async (token: string): Promise<NotificationStats> => {
  try {
    const notifications = await fetchNotifications(token)
    
    return {
      total: notifications.length,
      sent: notifications.filter(n => n.status === 'SENT').length,
      scheduled: notifications.filter(n => n.status === 'SCHEDULED').length,
      failed: notifications.filter(n => n.status === 'FAILED').length,
      draft: notifications.filter(n => n.status === 'DRAFT').length
    }
  } catch (error) {
    console.error('Error getting notification stats:', error)
    return {
      total: 0,
      sent: 0,
      scheduled: 0,
      failed: 0,
      draft: 0
    }
  }
} 