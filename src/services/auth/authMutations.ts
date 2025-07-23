import { useMutation } from '@tanstack/react-query'
import { useSignIn, useAuth, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import type { LoginCredentials, LoginResponse } from './types'

// Hook para mutation de login
export const useLoginMutation = () => {
  const { signIn, setActive } = useSignIn()
  const { user } = useUser()
  const navigate = useNavigate()

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      if (!signIn) {
        throw new Error('SignIn no está disponible')
      }

      try {
        // Intentar iniciar sesión con Clerk
        const result = await signIn.create({
          identifier: email,
          password: password,
        })

        if (result.status === 'complete') {
          // Establecer la sesión como activa
          await setActive({ session: result.createdSessionId })

          navigate('/dashboard')
          
          return {
            success: true,
            user: result.createdSessionId
          }
        } else {
          throw new Error('Login incompleto')
        }
      } catch (error: any) {
        throw new Error(error.errors?.[0]?.message || 'Error en el login')
      }
    },
    onSuccess: async () => {
      // Esperar un momento para que los metadatos se carguen
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verificar si el usuario es admin antes de redirigir
      if (user?.publicMetadata?.role === 'Admin' || user?.publicMetadata?.role === 'admin') {
        navigate('/dashboard')
      } else {
        // Si no es admin, mostrar error o redirigir a una página de acceso denegado
        console.error('Usuario no tiene permisos de administrador')
        // No redirigir automáticamente, dejar que AdminRoute maneje la verificación
      }
    },
    onError: (error) => {
      console.error('Error de autenticación:', error)
    }
  })
}

// Hook para mutation de logout
export const useLogoutMutation = () => {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      if (signOut) {
        await signOut()
      }
    },
    onSuccess: () => {
      navigate('/login')
    },
    onError: (error) => {
      console.error('Error al cerrar sesión:', error)
    }
  })
} 