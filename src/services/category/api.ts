import type { 
  ApiResponse, 
  BusinessCategoryListResponse, 
  ProductCategoryListResponse,
  CreateCategoryRequest,
  UpdateCategoryRequest
} from '../../types/Category'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// ========== FUNCIONES DE FETCH PARA CATEGORÍAS DE NEGOCIOS ==========

export const fetchBusinessCategories = async (token: string): Promise<ApiResponse<BusinessCategoryListResponse>> => {
  const response = await fetch(`${API_URL}/business/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error al obtener categorías de negocios: ${response.statusText}`)
  }

  return response.json()
}

export const createBusinessCategory = async (
  token: string, 
  data: CreateCategoryRequest
): Promise<ApiResponse<string>> => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('categoryImage', data.categoryImage)

  const response = await fetch(`${API_URL}/business/category`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Error al crear categoría de negocio: ${response.statusText}`)
  }

  return response.json()
}

export const updateBusinessCategory = async (
  token: string, 
  categoryId: string, 
  data: UpdateCategoryRequest
): Promise<ApiResponse<string>> => {
  const formData = new FormData()
  if (data.name) formData.append('name', data.name)
  if (data.categoryImage) formData.append('categoryImage', data.categoryImage)

  const response = await fetch(`${API_URL}/business/category?id=${categoryId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Error al actualizar categoría de negocio: ${response.statusText}`)
  }

  return response.json()
}

export const deleteBusinessCategory = async (
  token: string, 
  categoryId: string
): Promise<ApiResponse<string>> => {
  const response = await fetch(`${API_URL}/business/category?id=${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error al eliminar categoría de negocio: ${response.statusText}`)
  }

  return response.json()
}

// ========== FUNCIONES DE FETCH PARA CATEGORÍAS DE PRODUCTOS ==========

export const fetchProductCategories = async (token: string): Promise<ApiResponse<ProductCategoryListResponse>> => {
  const response = await fetch(`${API_URL}/product/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error al obtener categorías de productos: ${response.statusText}`)
  }

  return response.json()
}

export const createProductCategory = async (
  token: string, 
  data: CreateCategoryRequest
): Promise<ApiResponse<string>> => {
  const formData = new FormData()
  formData.append('name', data.name)
  formData.append('categoryImage', data.categoryImage)

  const response = await fetch(`${API_URL}/product/category`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Error al crear categoría de producto: ${response.statusText}`)
  }

  return response.json()
}

export const updateProductCategory = async (
  token: string, 
  categoryId: string, 
  data: UpdateCategoryRequest
): Promise<ApiResponse<string>> => {
  const formData = new FormData()
  if (data.name) formData.append('name', data.name)
  if (data.categoryImage) formData.append('categoryImage', data.categoryImage)

  const response = await fetch(`${API_URL}/product/category?id=${categoryId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Error al actualizar categoría de producto: ${response.statusText}`)
  }

  return response.json()
}

export const deleteProductCategory = async (
  token: string, 
  categoryId: string
): Promise<ApiResponse<string>> => {
  const response = await fetch(`${API_URL}/product/category?id=${categoryId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Error al eliminar categoría de producto: ${response.statusText}`)
  }

  return response.json()
} 