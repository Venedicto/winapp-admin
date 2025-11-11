import type {
  ApiResponse,
  User
} from '../../types/User'
import { handleEmptyListResponse } from '../../utils/apiHelpers'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export const fetchClients = async (token: string): Promise<ApiResponse<User[]>> => {
  const response = await fetch(`${API_URL}/users/clients`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  return handleEmptyListResponse<ApiResponse<User[]>>(
    response,
    { status: 'success', data: [] } as ApiResponse<User[]>
  )
} 