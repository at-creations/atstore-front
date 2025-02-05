export interface Product {
  _id: string
  name: string
  price: number
  description: string
  category_ids: string[]
  created_at: string
  updated_at: string
  images: string[]
  thumbnail: string
  categories: Category[] | null
}

export interface Category {
  _id: string
  name: string
  description: string
  created_at: string
  updated_at: string
  id: string
}

export interface ApiResponse<T> {
  message: string
  data: T | any
  metadata?: {
    total: number
    limit: number
    offset: number
  }
}

