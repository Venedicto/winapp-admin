export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  user?: any
  error?: string
}

export interface AuthError {
  message: string
  code?: string
}

export interface User {
  id: string
  email: string
  fullName?: string
  role: 'admin' | 'partner' | 'client'
  createdAt: string
}

export interface AdminUser extends User {
  role: 'admin'
  permissions?: string[]
} 