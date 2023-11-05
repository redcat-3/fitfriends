import { Order } from '@project/shared/shared-types';
import { OrderType, PaymentMethod } from '@prisma/client';

export class OrderEntity implements Order {
  public orderId: number | undefined;
  public orderType: OrderType;
  public workoutId: number;
  public userId: string;
  public coachId: string;
  public price: number;
  public count: number;
  public orderPrice: number;
  public paymentMethod: PaymentMethod;
  public createdDate: Date;

  constructor(order: Order) {
    this.orderId = order.orderId;
    this.orderType = order.orderType;
    this.workoutId = order.workoutId;
    this.userId = order.userId;
    this.coachId = order.coachId;
    this.price = order.price;
    this.count = order.count;
    this.orderPrice = order.orderPrice;
    this.paymentMethod = order.paymentMethod;
    this.createdDate = order.createdDate;
  }
  
  public toObject() {
    return {...this };
  }

}