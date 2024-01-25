import { getRandomNumber, randomDateDate } from "./utils";
import { Order, OrderToCoach, OrderType, PaymentMethod } from "../types/reaction";

export const generateOrder = ( number: number): Order => {
  const count = getRandomNumber(0, 2);
  const price = getRandomNumber(0, 2000);
  const order = {
    orderId: number,
    userId: `user22@pochta.local`,
    workoutId: number,
    createdDate: randomDateDate(new Date(2023, 1, 1), new Date()),
    count,
    price,
    orderType: OrderType.subscription,
    coachId: `user1@pochta.local`,
    orderPrice: price*count,
    paymentMethod: PaymentMethod.Mir
  }
  return order;
}

export const generateOrderToCoach = ( number: number): OrderToCoach => {
  const order = {
    workoutId: number,
    orderPrice: getRandomNumber(0, 2000),
    countWorkout: getRandomNumber(0, 8)
  }
  return order;
}

export function createOrders (count: number) {
  const arr = [1];
  for (let i = 1; i < count; i++) {
	arr.push(i);
  }
  return arr.map((id) => generateOrder(id));
} 

export function createOrdersToCoach (count: number) {
  const arr = [1];
  for (let i = 1; i < count; i++) {
	arr.push(i);
  }
  return arr.map((id) => generateOrderToCoach(id));
} 

export const orders = createOrders(4);
export const ordersToCoach1 = createOrdersToCoach(4);

export function createNextOrders (count: number) {
  const arr = [0];
    for (let i = 1; i < count; i++) {
      arr.push(i);
    }
  return arr.map((id) => generateOrder(id));
}

export function createNextOrdersToCoach (count: number) {
  const arr = [0];
    for (let i = 1; i < count; i++) {
      arr.push(i);
    }
  return arr.map((id) => generateOrderToCoach(id));
}