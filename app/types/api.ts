export interface Product {
  _id: string
  name: string
  nameVI?: string
  price: number
  description: string
  descriptionVI?: string
  categoryIds: string[]
  createdAt: string
  updatedAt: string
  images: string[]
  thumbnail: string
  categories: Category[] | null
  featured: boolean,
  stock: number,
  discount?: number
}

export interface Category {
  _id: string
  slug: string
  name: string
  nameVI?: string
  description: string
  descriptionVI?: string
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  message: string
  data: T
  metadata?: {
    totalPages: number
    totalCount: number
    page: number
    pageSize: number
  }
}

export interface SearchProductsParams {
  pageSize: number
  page: number
  search: string
  minPrice: number
  maxPrice: number
  sort: string
  order: string
  categorySlugs: string
}
export interface BusinessHours {
  day: string;
  openTime: string;
  closeTime: string;
}

export interface StoreInfo {
  email: string;
  phone: string;
  address: string;
  businessHours: BusinessHours[];
}