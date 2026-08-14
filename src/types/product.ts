export interface Product {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  description?: string | null;
  price: number;
  discount_price: number | null;
  category: string | null;
  thumbnail: string | null;
  gallery?: string[] | null;
  features?: string[] | null;
  delivery_time?: string | null;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProductsApiResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}

export interface Order {
  id: number;
  product_id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company_name: string | null;
  amount: number;
  payment_status: 'pending' | 'paid' | 'failed' | 'cancelled';
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  notes?: string | null;
  created_at?: string;
}

export interface CheckoutFormState {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  company_name: string;
  notes: string;
}
