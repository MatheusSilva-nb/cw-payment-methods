export interface PaymentMethod {
  id: number;
  name: string;
  kind: string; // e.g., 'Money', 'CreditCard', 'Online'
  active?: boolean;
}

export interface ApiError {
  message: string;
  status?: number;
}
