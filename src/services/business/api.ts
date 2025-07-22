import type { 
  ApiResponse, 
  BusinessListResponse, 
  DocumentListResponse,
  BusinessWithDetails,
  UpdateBusinessStatusRequest,
  UpdateDocumentStatusRequest
} from '../../types/Business'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// ========== FUNCIONES DE FETCH PARA BUSINESS ==========

export const fetchBusinesses = async (token: string): Promise<ApiResponse<BusinessListResponse>> => {
  const response = await fetch(`${API_URL}/businesses`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error al obtener negocios: ${response.statusText}`)
  }

  return response.json()
}

export const fetchBusinessDocuments = async (token: string): Promise<ApiResponse<DocumentListResponse>> => {
  const response = await fetch(`${API_URL}/business/documents`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error al obtener documentos: ${response.statusText}`)
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
    body: JSON.stringify(data),
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