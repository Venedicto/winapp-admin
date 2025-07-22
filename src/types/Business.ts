export interface Business {
  id: string
  name: string
  description: string
  logo: string
  banner: string
  phone: string
  address: string
  longitude: number
  latitude: number
  status: string
  open: boolean
  workingTime: string
  rating: number | null
  avgPreparationTime: number | null
  recentOrderCount: number | null
  userId: string
  categoryId: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
} 