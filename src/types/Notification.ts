export interface Notification {
  id: string
  title: string
  body: string
  data: {
    type: string
    [key: string]: any
  }
  userId: string | null // ID específico de usuario o null para todos
  destination: string // "All" para todos los usuarios
  deliveryDate: string | null // Fecha y hora de envío programado
  status: 'DRAFT' | 'SCHEDULED' | 'SENT' | 'FAILED'
  jobId: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface CreateNotificationRequest {
  title: string
  body: string
  userId?: string | null
  destination?: string
  deliveryDate?: string | null
  data?: {
    type: string
    [key: string]: any
  }
}

export interface UpdateNotificationRequest {
  id: string
  title?: string
  body?: string
  userId?: string | null
  destination?: string
  deliveryDate?: string | null
}

export interface NotificationStats {
  total: number
  sent: number
  scheduled: number
  failed: number
  draft: number
} 
export interface ApiResponse<T> {
  data: T
  message: string
  status: string
}