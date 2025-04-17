"use client";

import axios from "axios";
import { API_HOST } from "@/app/constants/index";

export const CSRF_COOKIE_NAME = "xsrf-token";
export const CSRF_HEADER_NAME = "X-XSRF-TOKEN";
const CSRF_STORAGE_KEY = "csrf-token";
const CSRF_EXPIRY_KEY = "csrf-token-expiry";

interface CSRFResponse {
  success: boolean;
  message: string;
  data: {
    exp: number; // Timestamp when token expires
  };
}

const csrfService = {
  /**
   * Fetch a new CSRF token from the server and store it in sessionStorage
   * @returns Promise indicating success or failure
   */
  fetchToken: async (): Promise<boolean> => {
    try {
      // Request a CSRF token from the server
      const response = await axios.get<CSRFResponse>(`${API_HOST}/csrf-token`, {
        withCredentials: true, // Necessary to receive cookies
      });

      // Extract token from cookie
      const token = csrfService.getTokenFromCookie();

      if (token) {
        // Store token in sessionStorage for easier access
        sessionStorage.setItem(CSRF_STORAGE_KEY, token);

        // Store expiry timestamp from response
        if (response.data.data.exp) {
          sessionStorage.setItem(
            CSRF_EXPIRY_KEY,
            response.data.data.exp.toString()
          );
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
      return false;
    }
  },

  /**
   * Extract the CSRF token from cookies
   * @returns The CSRF token or null if not found
   */
  getTokenFromCookie: (): string | null => {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === CSRF_COOKIE_NAME) {
        return decodeURIComponent(value);
      }
    }
    return null;
  },

  /**
   * Get the stored CSRF token from sessionStorage or cookie
   * @returns The CSRF token or null if not found
   */
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;

    // First try to get it from sessionStorage
    const token = sessionStorage.getItem(CSRF_STORAGE_KEY);
    if (token) return token;

    // If not in sessionStorage, try to get from cookie
    return csrfService.getTokenFromCookie();
  },

  /**
   * Check if the stored CSRF token is still valid
   * @returns true if token exists and is not expired, false otherwise
   */
  isTokenValid: (): boolean => {
    if (typeof window === "undefined") return false;

    const token = sessionStorage.getItem(CSRF_STORAGE_KEY);
    if (!token) return false;

    const expiryString = sessionStorage.getItem(CSRF_EXPIRY_KEY);
    if (!expiryString) return false;

    const expiry = parseInt(expiryString, 10);
    const now = Date.now(); // Current time in milliseconds

    return now < expiry;
  },

  /**
   * Ensure a valid CSRF token is available
   * Fetches a new token if current one is expired or missing
   */
  ensureToken: async (): Promise<boolean> => {
    if (!csrfService.isTokenValid()) {
      return await csrfService.fetchToken();
    }
    return true;
  },

  /**
   * Determines if a request method requires CSRF protection
   * @param method HTTP method
   * @returns true if the method requires CSRF protection
   */
  requiresProtection: (method?: string): boolean => {
    if (!method) return false;

    // Safe methods that don't require CSRF protection
    const safeMethods = ["GET", "HEAD", "OPTIONS"];
    return !safeMethods.includes(method.toUpperCase());
  },
};

export default csrfService;
