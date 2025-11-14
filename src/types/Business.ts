export interface Business {
  id: string
  name: string
  description: string
  logo: string
  banner: string
  phone: string
  address: string
  longitude: number
  latitude: number
  status: string
  open: boolean
  workingTime: string
  rating: number | null
  avgPreparationTime: number | null
  recentOrderCount: number | null
  userId: string
  categoryId: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

// Tipos para estados de negocio según el backend.md
export type BusinessStatus = 'Pending' | 'Acepted' | 'Rejected' | 'Suspended'

export const BUSINESS_STATUS = {
  PENDING: 'Pending' as const,
  ACCEPTED: 'Acepted' as const, // Nota: mantiene el typo del backend
  REJECTED: 'Rejected' as const,
  SUSPENDED: 'Suspended' as const
} as const

// Interface para la respuesta completa de negocios
export interface BusinessWithDetails {
  id: string
  name: string
  description: string
  status: BusinessStatus
  address: string
  phone: string
  rating: number
  category: {
    name: string
    image: string
  }
  user: {
    fullName: string
    email: string
  }
}

// Interface para documentos de negocio
export interface BusinessDocument {
  id: string
  name: 'bankingCertified' | 'dni' | 'constitutiveAct' | 'attorneyPower'
  url: string
  businessId: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

// Interfaces para requests
export interface UpdateBusinessStatusRequest {
  status: BusinessStatus
  reason?: string // Campo opcional para el motivo, especialmente para rechazos y suspensiones
}

export interface UpdateDocumentStatusRequest {
  status: 'approved' | 'rejected'
}

// Interfaces para respuestas de la API
export interface ApiResponse<T> {
  status: 'success' | 'error'
  data: T
  message?: string
}

export interface BusinessListResponse {
  businesses: Business[]
}

export interface DocumentListResponse {
  businessDocs: BusinessDocument[]
} 