import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import type { 
  UpdateBusinessStatusRequest, 
  UpdateDocumentStatusRequest,
  ApiResponse
} from '../../types/Business'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Hook para actualizar el estado de un negocio
export const useUpdateBusinessStatus = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, { businessId: string } & UpdateBusinessStatusRequest>({
    mutationFn: async ({ businessId, status }) => {
      const token = await getToken()
      
      const response = await fetch(`${API_URL}/business/status?id=${businessId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error(`Error al actualizar estado del negocio: ${response.statusText}`)
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidar y refrescar la lista de negocios
      queryClient.invalidateQueries({ queryKey: ['businesses'] })
    },
    onError: (error) => {
      console.error('Error al actualizar estado del negocio:', error)
    }
  })
}

// Hook para actualizar el estado de un documento
export const useUpdateDocumentStatus = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, { documentId: string } & UpdateDocumentStatusRequest>({
    mutationFn: async ({ documentId, status }) => {
      const token = await getToken()
      
      const response = await fetch(`${API_URL}/business/document/status?id=${documentId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error(`Error al actualizar estado del documento: ${response.statusText}`)
      }

      return response.json()
    },
    onSuccess: () => {
      // Invalidar y refrescar la lista de documentos
      queryClient.invalidateQueries({ queryKey: ['business-documents'] })
    },
    onError: (error) => {
      console.error('Error al actualizar estado del documento:', error)
    }
  })
} 