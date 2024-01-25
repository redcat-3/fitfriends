export enum PaymentMethod {
  Visa = 'visa',
  Mir = 'mir',
  Umoney = 'umoney',
}

export const PAYMENT_METHOD = [
  'visa',
  'mir',
  'iomoney'
] as const;

export enum RequestStatus {
  Consider = 'consider',
  Rejected = 'rejected',
  Accept = 'accept',
}

export enum OrderType {
  subscription
}

export type IRequest = {
  requestId?: number;
  requester: string;
  userId: string;
  createdDate: Date;
  updatedDate: Date;
  status: RequestStatus;
}

export type INotification = {
  notificationId: number;
  userId: string;
  createdDate: string;
  text: string;
  isActive: boolean;
};

export type Order = {
  orderId?: number;
  orderType: OrderType;
  workoutId: number;
  userId: string;
  coachId: string;
  price: number;
  count: number;
  orderPrice: number;
  paymentMethod: PaymentMethod;
  createdDate: Date;
}

export type OrderCreate = {
  workoutId: number;
  userId: string;
  count: number;
  orderType: OrderType;
}

export type OrderToCoach = {
  workoutId: number;
  orderPrice: number;
  countWorkout: number;
}

export type Feedback = {
  feedbackId?: number;
  workoutId: number;
  userId: string;
  avatar: string;
  name: string;
  rating: number;
  text: string;
  createdDate: Date;
}

export interface IFeedback {
  feedbackId: number;
  workoutId: number;
  userId: string;
  rating: number;
  text: string;
  createdDate: Date;
}

export type FeedbackCreate = {
  workoutId: number;
  rating: number;
  text: string;
}

export type Balance = {
  balanceId?: number;
  userId: string;
  workoutId: number;
  price: number;
  count: number;
}