import { useAuth } from '@clerk/clerk-react'
import { useUserRole } from './useUserRole'

interface AdminAuthState {
  isAdmin: boolean
  isLoading: boolean
  error: string | null
}

export const useAdminAuth = (): AdminAuthState => {
  const { isSignedIn, signOut } = useAuth()
  const { role, isLoading, error } = useUserRole()
  
  const isAdmin = role === 'Admin'
  
  // Si no está autenticado, redirigir al login
  if (!isSignedIn && !isLoading) {

    setTimeout(() => {
        signOut()
       }, 1000)
    return {
      isAdmin: false,
      isLoading: false,
      error: 'Usuario no autenticado'
    }
  }
  
  // Si no es admin y ya se cargó el rol, redirigir al login
  if (!isLoading && !isAdmin && role !== null) {
   setTimeout(() => {
    signOut()
   }, 1000)
    return {
      isAdmin: false,
      isLoading: false,
      error: 'Acceso denegado: Se requieren permisos de administrador'
    }
  }

  return {
    isAdmin,
    isLoading,
    error
  }
} 