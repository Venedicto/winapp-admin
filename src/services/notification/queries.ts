import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { fetchNotifications, fetchNotificationStats } from './api'

// Hook para obtener todas las notificaciones
export function useNotifications() {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const token = await getToken()
      return fetchNotifications(token!)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })
}

// Hook para obtener estadísticas de notificaciones
export function useNotificationStats() {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['notification-stats'],
    queryFn: async () => {
      const token = await getToken()
      return fetchNotificationStats(token!)
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000, // 5 minutos
  })
} 