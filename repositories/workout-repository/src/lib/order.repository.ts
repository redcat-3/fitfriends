import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Order } from '@project/shared/shared-types';
import { OrderQuery } from '@project/shared/shared-query';
import { OrderEntity } from './entities/order.entity';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class OrderRepository implements CRUDRepository<OrderEntity, number, Order> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: OrderEntity): Promise<Order> {
    return await this.prisma.order.create({data: {...item.toObject()}}); 
  }

  public async findById(orderId: number): Promise<Order | null> {
    return await this.prisma.order.findFirst({
      where: {
        orderId
      }
    });
  }

  public async update(orderId: number, item: OrderEntity): Promise<Order> {
    return await this.prisma.order.update({
      where: {
        orderId
      },
      data: {...item.toObject()}
    });
  }

  public async findByWorkoutId(workoutId: number, {limit, page}:OrderQuery): Promise<Order[] | null> {
    const orders = await this.prisma.order.findMany({
      where: {
        workoutId
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
    return orders;
  }

  public async groupByWorkoutWereCoachId(coachId: string, query: OrderQuery ): Promise<{ workoutId: number, _sum: {count: number, orderPrice: number}}[] | null> {
    const groupWorkouts = await this.prisma.order.groupBy({
      by: ['workoutId'],
      where: {
        coachId,
      },
      _sum: {
        orderPrice: true,
        count: true
      },
      orderBy: {
        _sum: {
          [query.sortBy]: query.sortDirection
        }
      },
      take: query.limit,
      skip: query.page > 0 ? query.limit * (query.page - 1) : undefined,
    });
    return groupWorkouts;
  }

  public async destroy(orderId: number): Promise<void> {
    await this.prisma.order.delete({ where: {orderId} });
  }
}
