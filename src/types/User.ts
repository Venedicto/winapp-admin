export interface UserSubscription {
  id: string
  credits: string
  active: boolean
  userId: string
  businessId: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface User {
  id: string
  fullName: string
  email: string
  phone?: string | null
  role: 'Client' | 'Admin' | "Partner"
  customerId: string | null
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
  subscriptions: UserSubscription[]
}

export type UserRole = User['role']

// Interfaces para respuestas de la API
export interface ApiResponse<T> {
  status: 'success' | 'error'
  data: T
  message?: string
}

export interface UserListResponse {
  users: User[]
  total: number
  page: number
  limit: number
}

