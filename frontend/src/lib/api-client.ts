/**
 * PEACHY PLATE — API Client Configuration
 * Handles Laravel Sanctum Bearer tokens, CSRF tokens, guest cart headers, and error normalization.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  meta?: {
    currentPage: number;
    lastPage: number;
    total: number;
  };
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("pp_auth_token") : null;
  const guestCartToken = typeof window !== "undefined" ? localStorage.getItem("pp_guest_cart_token") : null;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  if (guestCartToken) {
    headers["X-Guest-Cart-Token"] = guestCartToken;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorData: any = {};
    try {
      errorData = await response.json();
    } catch {
      // Non-JSON response error
    }
    throw new ApiError(
      response.status,
      errorData.message || `Request failed with status ${response.status}`,
      errorData.errors
    );
  }

  return response.json();
}
