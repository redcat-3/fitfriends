import { Order } from '@project/shared/shared-types';
import { PaymentMethod } from '@prisma/client';

export class OrderEntity implements Order {
  public orderId: number;
  public orderType: string;
  public workoutId: number;
  public userId: string;
  public price: number;
  public count: number;
  public orderPrice: number;
  public paymentMethod: PaymentMethod;
  public createdDate: Date;

  constructor(Order: Order) {
    this.fillEntity(Order);
  }
  
  public toObject() {
    return {...this };
  }

  public fillEntity(order: Order) {
    this.orderId = order.orderId;
    this.orderType = order.orderType;
    this.workoutId = order.workoutId;
    this.userId = order.userId;
    this.price = order.price;
    this.count = order.count;
    this.orderPrice = order.orderPrice;
    this.paymentMethod = order.paymentMethod;
    this.createdDate = order.createdDate;
  }
}
