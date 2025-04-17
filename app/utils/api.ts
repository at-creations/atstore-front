import axios from "axios";
import { API_HOST } from "../constants";
import type { Product, Category, ApiResponse, StoreInfo } from "../types/api";
import csrfService, { CSRF_HEADER_NAME } from "./csrfService";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_HOST,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// request interceptor for handling common tasks like adding auth tokens
apiClient.interceptors.request.use(
  async (config) => {
    // Only include CSRF token for methods that require protection (non-GET/HEAD/OPTIONS)
    if (config.method && csrfService.requiresProtection(config.method)) {
      // Ensure we have a valid token before making the request
      await csrfService.ensureToken();

      const token = csrfService.getToken();
      if (token) {
        config.headers[CSRF_HEADER_NAME] = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor for handling common responses
apiClient.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx causes this function to trigger
    return response;
  },
  (error) => {
    // Any status codes outside the range of 2xx cause this function to trigger
    return Promise.reject(error);
  }
);

export async function fetchFeaturedProducts(limit = 6): Promise<Product[]> {
  try {
    const response = await apiClient.get("/product/featured", {
      params: { limit },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error) && error.message
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
    const response = await apiClient.get("/category/");
    return response.data.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error) && error.message
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
    await delay(300);
    const response = await apiClient.get(`/product/category/${categorySlug}`, {
      params: {
        pageSize,
        page,
        cache: true,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error) && error.message
        ? error.message
        : "An error occurred while fetching products"
    );
  }
}

export async function fetchProductDetails(productId: string): Promise<Product> {
  try {
    const response = await apiClient.get(`/product/id/${productId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error) && error.message
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
    await delay(300);
    const response = await apiClient.get("/product/search", {
      params: {
        pageSize,
        page,
        search,
        minPrice,
        maxPrice,
        sort: sortBy,
        order: sortOrder,
        categorySlugs: categorySlug,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error) && error.message
        ? error.message
        : "An error occurred while fetching products"
    );
  }
}

export async function fetchStoreInfo(): Promise<StoreInfo> {
  try {
    const response = await apiClient.get("/store-info");
    return response.data.data;
  } catch (error) {
    throw new Error(
      axios.isAxiosError(error) && error.message
        ? error.message
        : "An error occurred while fetching store information"
    );
  }
}

export async function increaseProductViews(productId: string): Promise<void> {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  try {
    await apiClient.post(`/product/views/${productId}`);
  } catch (error) {
    console.warn("Failed to increase product views:", error);
  }
}

// Export the axios instance in case it needs to be used directly elsewhere
export { apiClient };
