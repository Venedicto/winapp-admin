import type { 
  ApiResponse, 
  User
} from '../../types/User'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'



export const fetchClients = async (token: string): Promise<ApiResponse<User[]>> => {
  const response = await fetch(`${API_URL}/users/clients`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error al obtener clientes: ${response.statusText}`)
  }

  return response.json()
} 