import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { pointsApi } from './api'
import type { PointsConfig } from '../../types/Points'
import { useAuth } from '@clerk/clerk-react'

// Mutation para actualizar la configuración de puntos
export function useUpdatePointsConfig() {
  const queryClient = useQueryClient()
  const { getToken } = useAuth()
  return useMutation({
    mutationFn: async (config: Partial<PointsConfig>) => {
        const token = await getToken()
        if (!token) {
            throw new Error('No se encontró el token')
        }
        return pointsApi.updatePointsConfig(token, config)
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['points-config'] })
      
      toast.success('Configuración de puntos actualizada correctamente')
    },
    
    onError: (error) => {
      console.error('Error al actualizar configuración de puntos:', error)
      toast.error('Error al actualizar la configuración de puntos')
    }
  })
} 