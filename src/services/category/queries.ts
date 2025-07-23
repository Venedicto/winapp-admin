import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { fetchBusinessCategories, fetchProductCategories, fetchBusinessCategoryById } from './api'
import type { 
  ApiResponse, 
  BusinessCategoryListResponse, 
  ProductCategoryListResponse,
  BusinessCategory
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

// Hook para obtener una categoría de negocio específica por ID
export const useBusinessCategoryById = (categoryId: string) => {
  const { getToken } = useAuth()

  return useQuery<ApiResponse<{ businessCategory: BusinessCategory }>>({
    queryKey: ['business-category', categoryId],
    queryFn: async () => {
      const token = await getToken()
      return fetchBusinessCategoryById(token!, categoryId)
    },
    staleTime: 5 * 60 * 1000, // 5 minutos
    enabled: !!categoryId, // Solo ejecutar si hay categoryId
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