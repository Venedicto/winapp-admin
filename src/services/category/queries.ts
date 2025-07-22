import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { fetchBusinessCategories, fetchProductCategories } from './api'
import type { 
  ApiResponse, 
  BusinessCategoryListResponse, 
  ProductCategoryListResponse 
} from '../../types/Category'

// Hook para obtener todas las categorías de negocios
export const useBusinessCategories = () => {
  const { getToken } = useAuth()

  return useQuery<ApiResponse<BusinessCategoryListResponse>>({
    queryKey: ['business-categories'],
    queryFn: async () => {
      const token = await getToken()
      return fetchBusinessCategories(token!)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

// Hook para obtener todas las categorías de productos
export const useProductCategories = () => {
  const { getToken } = useAuth()

  return useQuery<ApiResponse<ProductCategoryListResponse>>({
    queryKey: ['product-categories'],
    queryFn: async () => {
      const token = await getToken()
      return fetchProductCategories(token!)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
} 