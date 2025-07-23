import { useUser } from '@clerk/clerk-react'
import { useState, useEffect } from 'react'

export type UserRole = 'Admin' | 'Partner' | 'Client' | null

interface UserRoleState {
  role: UserRole
  isLoading: boolean
  error: string | null
}

export const useUserRole = (): UserRoleState => {
  const { user, isLoaded } = useUser()
  const [state, setState] = useState<UserRoleState>({
    role: null,
    isLoading: true,
    error: null
  })

  useEffect(() => {
    const getUserRole = async () => {
      if (!isLoaded) {
        setState(prev => ({ ...prev, isLoading: true }))
        return
      }

      if (!user) {
        setState({
          role: null,
          isLoading: false,
          error: 'Usuario no autenticado'
        })
        return
      }

      try {
        // Esperar a que los publicMetadata estén disponibles
        let attempts = 0
        const maxAttempts = 15 // Aumentar el número de intentos
        
        while (attempts < maxAttempts) {
          if (user.unsafeMetadata && Object.keys(user.unsafeMetadata).length > 0) {
            const role = user.unsafeMetadata.role as string
            
            if (role === 'Admin' || role === 'admin') {
              setState({
                role: 'Admin',
                isLoading: false,
                error: null
              })
              return
            } else if (role === 'Partner' || role === 'partner') {
              setState({
                role: 'Partner',
                isLoading: false,
                error: null
              })
              return
            } else if (role === 'Client' || role === 'client') {
              setState({
                role: 'Client',
                isLoading: false,
                error: null
              })
              return
            } else {
              setState({
                role: null,
                isLoading: false,
                error: 'Rol de usuario no válido'
              })
              return
            }
          }
          
          // Esperar antes de intentar de nuevo
          await new Promise(resolve => setTimeout(resolve, 300))
          attempts++
        }
        
        // Si después de varios intentos no se obtienen los metadatos
        setState({
          role: null,
          isLoading: false,
          error: 'No se pudieron obtener los metadatos del usuario'
        })
        
      } catch (error) {
        console.error('Error obteniendo rol del usuario:', error)
        setState({
          role: null,
          isLoading: false,
          error: 'Error al obtener el rol del usuario'
        })
      }
    }

    getUserRole()
  }, [user, isLoaded])

  return state
} 