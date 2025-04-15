import { API_HOST } from "../constants";
import type {
  Product,
  Category,
  ApiResponse,
  ApiResponseProducts,
  StoreInfo,
} from "../types/api";

export async function fetchFeaturedProducts(limit = 6): Promise<Product[]> {
  try {
    const response = await fetch(`${API_HOST}/product/featured?limit=${limit}`);
    if (!response.ok) {
      throw new Error("Failed to fetch featured products");
    }
    const data: ApiResponse<Product[]> = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while fetching featured products"
    );
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_HOST}/category/`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data: ApiResponse<Category[]> = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while fetching categories"
    );
  }
}

/**
 *
 * @param categorySlug category identifier, can be either "all", a specific category slug.
 * If "all" is passed, all products will be fetched.
 * @param pageSize number of products per page, default is 12.
 * @param page current page number, default is 1.
 * @returns Promise<ApiResponse<Product[]>>
 */
export async function fetchProductsByCategory(
  categorySlug: string = "all",
  pageSize = 12,
  page = 1
): Promise<ApiResponse<Product[]>> {
  try {
    const [response] = await Promise.all([
      fetch(
        `${API_HOST}/product/category/${categorySlug}?pageSize=${pageSize}&page=${page}&cache=true`
      ),
      delay(300),
    ]);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: ApiResponseProducts<Product[]> = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while fetching products"
    );
  }
}

export async function fetchProductDetails(productId: string): Promise<Product> {
  try {
    const response = await fetch(`${API_HOST}/product/id/${productId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product details");
    }
    const data: ApiResponse<Product> = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while fetching product details"
    );
  }
}

export async function fetchFilteredProducts(
  pageSize = 12,
  page = 1,
  search = "",
  minPrice = 0,
  maxPrice = Infinity,
  sortBy = "createdAt",
  sortOrder = "desc",
  categorySlug = ""
): Promise<ApiResponse<Product[]>> {
  try {
    const [response] = await Promise.all([
      fetch(
        `${API_HOST}/product/search?pageSize=${pageSize}&page=${page}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sortBy}&order=${sortOrder}&categorySlugs=${categorySlug}`
      ),
      delay(300),
    ]);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: ApiResponseProducts<Product[]> = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while fetching products"
    );
  }
}

export async function fetchStoreInfo(): Promise<StoreInfo> {
  try {
    const response = await fetch(`${API_HOST}/store-info`);
    if (!response.ok) {
      throw new Error("Failed to fetch store information");
    }
    const data: ApiResponse<StoreInfo> = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while fetching store information"
    );
  }
}
