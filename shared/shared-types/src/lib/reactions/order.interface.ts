import { PaymentMethod } from "./payment-method.enum";

export interface Order {
  orderId: number;
  orderType: string;
  workoutId: number;
  userId: string;
  price: number;
  count: number;
  orderPrice: number;
  paymentMethod: PaymentMethod;
  createdDate: string;
}