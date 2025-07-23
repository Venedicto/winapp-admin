import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import type { 
  UpdateBusinessStatusRequest, 
  UpdateDocumentStatusRequest,
  ApiResponse
} from '../../types/Business'
import { updateBusinessStatus, updateDocumentStatus, deleteBusiness } from './api'

// Hook para actualizar el estado de un negocio
export const useUpdateBusinessStatus = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, { businessId: string } & UpdateBusinessStatusRequest>({
    mutationFn: async ({ businessId, status, reason }) => {
      const token = await getToken()
      const requestData: UpdateBusinessStatusRequest = { status }
      if (reason) {
        requestData.reason = reason
      }
      return updateBusinessStatus(token!, businessId, requestData)
    },
    onSuccess: async (_data, variables) => {
      // 1. Invalidar y refrescar la query específica del business por ID (PRIORITARIO)
      await queryClient.invalidateQueries({ 
        queryKey: ['business', variables.businessId],
        refetchType: 'active' // Solo refetch de queries activas
      })
      
      // 2. Invalidar la lista general de negocios
      queryClient.invalidateQueries({ queryKey: ['businesses'] })
      
      // 3. Invalidar todas las queries de business relacionadas
      queryClient.invalidateQueries({ queryKey: ['business'] })
      
      // 4. Refetch inmediato de la query específica si está activa
      queryClient.refetchQueries({
        queryKey: ['business', variables.businessId],
        type: 'active'
      })
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
      return updateDocumentStatus(token!, documentId, { status })
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

// Hook para eliminar un negocio
export const useDeleteBusiness = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, { businessId: string }>({
    mutationFn: async ({ businessId }) => {
      const token = await getToken()
      return deleteBusiness(token!, businessId)
    },
    onSuccess: () => {
      // Invalidar y refrescar todas las queries relacionadas con businesses
      queryClient.invalidateQueries({ queryKey: ['businesses'] })
      queryClient.invalidateQueries({ queryKey: ['business'] })
    },
    onError: (error) => {
      console.error('Error al eliminar negocio:', error)
    }
  })
} 