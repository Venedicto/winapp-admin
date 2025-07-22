import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@clerk/clerk-react'
import { 
  createBusinessCategory,
  updateBusinessCategory,
  deleteBusinessCategory,
  createProductCategory,
  updateProductCategory,
  deleteProductCategory
} from './api'
import type { 
  CreateCategoryRequest, 
  UpdateCategoryRequest,
  ApiResponse
} from '../../types/Category'

// ========== CATEGORÍAS DE NEGOCIOS ==========

// Hook para crear una categoría de negocio
export const useCreateBusinessCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, CreateCategoryRequest>({
    mutationFn: async (data) => {
      const token = await getToken()
      return createBusinessCategory(token!, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-categories'] })
    },
    onError: (error) => {
      console.error('Error al crear categoría de negocio:', error)
    }
  })
}

// Hook para actualizar una categoría de negocio
export const useUpdateBusinessCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, { categoryId: string } & UpdateCategoryRequest>({
    mutationFn: async ({ categoryId, ...data }) => {
      const token = await getToken()
      return updateBusinessCategory(token!, categoryId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-categories'] })
    },
    onError: (error) => {
      console.error('Error al actualizar categoría de negocio:', error)
    }
  })
}

// Hook para eliminar una categoría de negocio
export const useDeleteBusinessCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, { categoryId: string }>({
    mutationFn: async ({ categoryId }) => {
      const token = await getToken()
      return deleteBusinessCategory(token!, categoryId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business-categories'] })
    },
    onError: (error) => {
      console.error('Error al eliminar categoría de negocio:', error)
    }
  })
}

// ========== CATEGORÍAS DE PRODUCTOS ==========

// Hook para crear una categoría de producto
export const useCreateProductCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, CreateCategoryRequest>({
    mutationFn: async (data) => {
      const token = await getToken()
      return createProductCategory(token!, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] })
    },
    onError: (error) => {
      console.error('Error al crear categoría de producto:', error)
    }
  })
}

// Hook para actualizar una categoría de producto
export const useUpdateProductCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, { categoryId: string } & UpdateCategoryRequest>({
    mutationFn: async ({ categoryId, ...data }) => {
      const token = await getToken()
      return updateProductCategory(token!, categoryId, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] })
    },
    onError: (error) => {
      console.error('Error al actualizar categoría de producto:', error)
    }
  })
}

// Hook para eliminar una categoría de producto
export const useDeleteProductCategory = () => {
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<ApiResponse<string>, Error, { categoryId: string }>({
    mutationFn: async ({ categoryId }) => {
      const token = await getToken()
      return deleteProductCategory(token!, categoryId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-categories'] })
    },
    onError: (error) => {
      console.error('Error al eliminar categoría de producto:', error)
    }
  })
} 