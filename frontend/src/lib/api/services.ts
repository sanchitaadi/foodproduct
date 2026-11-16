import { API_CONFIG } from "./config";
import { ApiResponse, ContactFormPayload, NewsletterPayload } from "./types";
import { PackagedFoodProduct, IndianFoodCategory } from "@/types/products";

class ApiError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const url = `${API_CONFIG.baseUrl}${endpoint}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...API_CONFIG.headers,
        ...(options.headers || {}),
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new ApiError(
        errorBody.message || `API error with status ${response.status}`,
        response.status
      );
    }

    return await response.json();
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    if (err instanceof ApiError) throw err;
    if (err instanceof Error && err.name === "AbortError") {
      throw new ApiError("Request timed out", 408);
    }
    throw new ApiError((err as Error).message || "Network request failed", 500);
  }
}

export const CatalogService = {
  async getProducts(params?: { category?: string; brand?: string; search?: string }): Promise<PackagedFoodProduct[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append("category", params.category);
    if (params?.brand) query.append("brand", params.brand);
    if (params?.search) query.append("q", params.search);

    const queryString = query.toString() ? `?${query.toString()}` : "";
    const res = await request<PackagedFoodProduct[]>(`${API_CONFIG.endpoints.products}${queryString}`);
    return res.data;
  },

  async getProductBySlug(slug: string): Promise<PackagedFoodProduct | null> {
    try {
      const res = await request<PackagedFoodProduct>(API_CONFIG.endpoints.productBySlug(slug));
      return res.data;
    } catch {
      return null;
    }
  },

  async getCategories(): Promise<IndianFoodCategory[]> {
    const res = await request<IndianFoodCategory[]>(API_CONFIG.endpoints.categories);
    return res.data;
  },
};

export const ContactService = {
  async submitInquiry(payload: ContactFormPayload): Promise<{ success: boolean; message: string }> {
    if (API_CONFIG.isDemoMode) {
      // Simulate network latency in demo mode
      await new Promise((res) => setTimeout(res, 600));
      return {
        success: true,
        message: `Thank you ${payload.name}! Your message for ${payload.brandConceptId} has been received. Our team will reach out within 24 hours.`,
      };
    }

    const res = await request<{ message: string }>(API_CONFIG.endpoints.contact, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { success: true, message: res.data.message || "Submitted successfully" };
  },

  async subscribeNewsletter(payload: NewsletterPayload): Promise<{ success: boolean; message: string }> {
    if (API_CONFIG.isDemoMode) {
      await new Promise((res) => setTimeout(res, 400));
      return {
        success: true,
        message: "You are on the VIP drop list! Check your inbox for exclusive perks.",
      };
    }

    const res = await request<{ message: string }>(API_CONFIG.endpoints.newsletter, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return { success: true, message: res.data.message };
  },
};
