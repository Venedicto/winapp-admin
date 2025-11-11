import type {
  ApiResponse,
  BusinessListResponse,
  DocumentListResponse,
  Business,
  UpdateBusinessStatusRequest,
  UpdateDocumentStatusRequest
} from '../../types/Business'
import { handleEmptyListResponse } from '../../utils/apiHelpers'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// ========== FUNCIONES DE FETCH PARA BUSINESS ==========

export const fetchBusinesses = async (token: string): Promise<ApiResponse<BusinessListResponse>> => {
  const response = await fetch(`${API_URL}/businesses`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return handleEmptyListResponse<ApiResponse<BusinessListResponse>>(
    response,
    { status: 'success', data: { businesses: [] } } as ApiResponse<BusinessListResponse>
  )
}

export const fetchBusinessDocuments = async (token: string): Promise<ApiResponse<DocumentListResponse>> => {
  const response = await fetch(`${API_URL}/business/documents`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return handleEmptyListResponse<ApiResponse<DocumentListResponse>>(
    response,
    { status: 'success', data: { businessDocs: [] } } as ApiResponse<DocumentListResponse>
  )
}

// Función para obtener un comercio específico por ID
export const fetchBusinessById = async (token: string, businessId: string): Promise<ApiResponse<{ business: Business }>> => {
  const response = await fetch(`${API_URL}/business?id=${businessId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error al obtener comercio: ${response.statusText}`)
  }

  return response.json()
}

export const updateBusinessStatus = async (
  token: string, 
  businessId: string, 
  data: UpdateBusinessStatusRequest
): Promise<ApiResponse<string>> => {
  const response = await fetch(`${API_URL}/business/status?id=${businessId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Ahora incluye status y reason si está presente
  })

  if (!response.ok) {
    throw new Error(`Error al actualizar estado del negocio: ${response.statusText}`)
  }

  return response.json()
}

export const updateDocumentStatus = async (
  token: string, 
  documentId: string, 
  data: UpdateDocumentStatusRequest
): Promise<ApiResponse<string>> => {
  const response = await fetch(`${API_URL}/business/document/status?id=${documentId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`Error al actualizar estado del documento: ${response.statusText}`)
  }

  return response.json()
}

export const deleteBusiness = async (
  token: string, 
  businessId: string
): Promise<ApiResponse<string>> => {
  const response = await fetch(`${API_URL}/business?id=${businessId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(`Error al eliminar comercio: ${response.statusText}`)
  }

  return response.json()
} 