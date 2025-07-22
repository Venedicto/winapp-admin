import { useMutation } from '@tanstack/react-query'
import { useSignIn, useAuth } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import type { LoginCredentials, LoginResponse } from './types'

// Hook para mutation de login
export const useLoginMutation = () => {
  const { signIn, setActive } = useSignIn()
  const { getToken } = useAuth()
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
          
          // Obtener el token para verificar el rol de admin
          const token = await getToken()
          
          // Aquí podrías hacer una verificación adicional del rol de admin
          // contra tu backend si es necesario
          
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
    onSuccess: (data) => {
      // Redirigir al dashboard después del login exitoso
      navigate('/dashboard')
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