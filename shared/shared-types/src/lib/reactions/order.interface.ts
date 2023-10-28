import { PaymentMethod } from "@prisma/client";


export interface Order {
  orderId: number;
  orderType: string;
  workoutId: number;
  userId: string;
  price: number;
  count: number;
  orderPrice: number;
  paymentMethod: PaymentMethod;
  createdDate: Date;
}