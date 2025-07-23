import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'sonner'
import { createNotification, deleteNotification } from './api'
import type { CreateNotificationRequest, UpdateNotificationRequest } from '../../types/Notification'

// Mutation para crear nueva notificación
export function useCreateNotification() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (notification: CreateNotificationRequest) => {
      const token = await getToken()
      return createNotification(token!, notification)
    },
    
    onSuccess: () => {
      // Invalidar las queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notification-stats'] })
      
      toast.success('Notificación creada exitosamente')
    },
    
    onError: (error) => {
      console.error('Error al crear notificación:', error)
      toast.error('Error al crear la notificación')
    }
  })
}

// Mutation para actualizar notificación (no implementada en API actual)
export function useUpdateNotification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updateData: UpdateNotificationRequest) => {
      throw new Error('Update notification not implemented in current API')
    },
    
    onSuccess: () => {
      // Invalidar las queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notification-stats'] })
      
      toast.success('Notificación actualizada exitosamente')
    },
    
    onError: (error) => {
      console.error('Error al actualizar notificación:', error)
      toast.error('Error al actualizar la notificación')
    }
  })
}

// Mutation para eliminar notificación
export function useDeleteNotification() {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken()
      return deleteNotification(token!, id)
    },
    
    onSuccess: () => {
      // Invalidar las queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
      queryClient.invalidateQueries({ queryKey: ['notification-stats'] })
      
      toast.success('Notificación eliminada exitosamente')
    },
    
    onError: (error) => {
      console.error('Error al eliminar notificación:', error)
      toast.error('Error al eliminar la notificación')
    }
  })
} 