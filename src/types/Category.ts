export interface BusinessCategory {
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface ProductCategory {
  id: string
  name: string
  image: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export type CategoryType = 'business' | 'product'

// Interfaces para requests de creación y actualización
export interface CreateCategoryRequest {
  name: string
  categoryImage: File // Para multipart/form-data
}

export interface UpdateCategoryRequest {
  name?: string
  categoryImage?: File // Opcional para actualizaciones
}

// Interfaces para respuestas de la API
export interface ApiResponse<T> {
  status: 'success' | 'error'
  data: T
  message?: string
}

export interface BusinessCategoryListResponse {
  categories: BusinessCategory[]
}

export interface ProductCategoryListResponse {
  categories: ProductCategory[]
} 