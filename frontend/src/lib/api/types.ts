/**
 * REST API CONTRACT TYPES
 * Standardized envelope responses matching REST API guidelines.
 */

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    perPage?: number;
    timestamp?: string;
  };
  errors?: Record<string, string[]>;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  brandConceptId: "flavourverse" | "purepantry" | "snackattack" | string;
  subject: string;
  message: string;
  inquiryType: "general" | "wholesale" | "press" | "bulk_order";
}

export interface NewsletterPayload {
  email: string;
  brandConceptId: "flavourverse" | "purepantry" | "snackattack" | string;
}
