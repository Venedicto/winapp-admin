import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import {  fetchClients } from './api'
import type { 
  ApiResponse,
  User, 
} from '../../types/User'


// Hook para obtener todos los clientes
export const useClients = () => {
  const { getToken } = useAuth()

  return useQuery<ApiResponse<User[]>>({
    queryKey: ['clients'],
    queryFn: async () => {
      const token = await getToken()
      return fetchClients(token!)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
} 