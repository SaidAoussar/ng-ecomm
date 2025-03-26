import { Address } from "./address.type";
import { OrderItem } from "./order-item.type";
import { PaymentMethod } from "./payment-method.type";

export interface Order {
  id: number;
  customerId?: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  notes?: string;
}
