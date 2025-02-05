import { API_HOST } from "../constants"
import type { Product, Category, ApiResponse, ApiResponseProducts } from "../types/api"

export async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_HOST}/product/top`)
    if (!response.ok) {
      throw new Error("Failed to fetch featured products")
    }
    const data: ApiResponse<Product[]> = await response.json()
    return data.data
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred while fetching featured products")
  }
}

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_HOST}/category/search`)
    if (!response.ok) {
      throw new Error("Failed to fetch categories")
    }
    const data: ApiResponse<Category[]> = await response.json()
    return data.data
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred while fetching categories")
  }
}

export async function fetchProductsByCategory(categoryId: string, limit = 12, offset = 0): Promise<ApiResponse<Product[]>> {
  try {
    const [response] = await Promise.all([
      fetch(`${API_HOST}/product/search?categories=${categoryId}&limit=${limit}&offset=${offset}`),
      delay(300)
    ])
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    const data: ApiResponseProducts<Product[]> = await response.json()
    return {
      ...data,
      data: data.data.products
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred while fetching products")
  }
}

export async function fetchProductDetails(productId: string): Promise<Product> {
  console.log("fetchProductDetails")
  try {
    const response = await fetch(`${API_HOST}/product/id/${productId}`)
    if (!response.ok) {
      throw new Error("Failed to fetch product details")
    }
    const data: ApiResponse<Product> = await response.json()
    return data.data
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred while fetching product details")
  }
}

export async function fetchFilteredProducts(
  limit = 12,
  offset = 0,
  search = "",
  priceMin = 0,
  priceMax = Infinity,
  sortBy = "name",
  sortOrder = "asc",
  categoryId = ""
): Promise<ApiResponse<Product[]>> {
  try {
    const [response] = await Promise.all([
      fetch(
        `${API_HOST}/product/search?limit=${limit}&offset=${offset}&search=${search}&price_min=${priceMin}&price_max=${priceMax}&sort=${sortBy}&order=${sortOrder}&categories=${categoryId}`
      ),
      delay(300)
    ])
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    const data: ApiResponseProducts<Product[]> = await response.json()
    return {
      ...data,
      data: data.data.products
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An error occurred while fetching products")
  }
}