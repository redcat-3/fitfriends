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

  public async findAllByWorkoutId(workoutId: number): Promise<Order[] | null> {
    const orders = await this.prisma.order.findMany({
      where: {
        workoutId
      }
    });
    return orders;
  }

  public async findByCoachId(coachId: string ): Promise<Set<number> | null> {
    const ordersByCoachId = await this.prisma.order.findMany({
      where: {
        userId: coachId
      }
    });
    const workouts = new Set(ordersByCoachId.map((order) => order.workoutId));
    return workouts;
  }

  public async getAgregationWorkout(coachId: string ): Promise<{ workoutId: number, count: number, sum: number} | null> {
    const groupWorkouts = await this.prisma.order.groupBy({
      by: ['workoutId'],
      where: {
        coachId,
      },
      _count: {
        orderId: true,
      },
      _sum: {
        orderPrice: true,
      }
    });
    return { workoutId, count: aggregation._count.orderId, sum: aggregation._sum.orderPrice};
  }

  public async destroy(orderId: number): Promise<void> {
    await this.prisma.order.delete({ where: {orderId} });
  }
}
