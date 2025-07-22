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