import { useQuery } from '@tanstack/react-query'
import { pointsApi } from './api'
import { useAuth } from '@clerk/clerk-react'

// Hook para obtener la configuración actual de puntos
export function usePointsConfig() {
    const { getToken } = useAuth()
  return useQuery({
    queryKey: ['points-config'],
    queryFn: async () => {
        const token = await getToken()
        if (!token) {
            throw new Error('No se encontró el token')
        }
        return pointsApi.getPointsConfig(token)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })
} 