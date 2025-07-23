import type { PointsConfig } from '../../types/Points'

// Mock data por ahora - esto debería conectarse a la API real


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'



export const pointsApi = {
  // Obtener configuración actual de puntos
  async getPointsConfig(token: string): Promise<PointsConfig> {
    const response = await fetch(`${API_URL}/admin/configuration?id=CREDITS_COST`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    const data = await  response.json()
    return data.data
  },

  // Actualizar configuración de puntos
  async updatePointsConfig(token: string, config: Partial<PointsConfig>): Promise<PointsConfig> {
    const response = await fetch(`${API_URL}/admin/configuration?id=CREDITS_COST`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 'CREDITS_COST',
        value: config.value,
      }),
    })
    return response.json()

  },

  // Convertir pesos a puntos o viceversa
  async convertCurrency(amount: number, pesosPerPoint: number, fromPesos: boolean): Promise<number> {
    if (fromPesos) {
      // Convertir pesos a puntos
      return Math.floor(amount / pesosPerPoint)
    } else {
      // Convertir puntos a pesos
      return amount * pesosPerPoint
    }
  }
} 