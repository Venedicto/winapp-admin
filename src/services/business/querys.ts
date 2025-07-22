import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { fetchBusinesses, fetchBusinessDocuments } from './api'
import type { 
  ApiResponse, 
  BusinessListResponse, 
  DocumentListResponse
} from '../../types/Business'

// Hook para obtener todos los negocios
export const useBusinesses = () => {
  const { getToken } = useAuth()

  return useQuery<ApiResponse<BusinessListResponse>>({
    queryKey: ['businesses'],
    queryFn: async () => {
      const token = await getToken()
      return fetchBusinesses(token!)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para obtener todos los documentos de negocios
export const useBusinessDocuments = () => {
  const { getToken } = useAuth()

  return useQuery<ApiResponse<DocumentListResponse>>({
    queryKey: ['business-documents'],
    queryFn: async () => {
      const token = await getToken()
      return fetchBusinessDocuments(token!)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
