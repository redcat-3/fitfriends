import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '@project/repositories/workout-repository';
import { CreateOrderDto } from '@project/shared/shared-dto';
import { WorkoutRepository, OrderEntity } from '@project/repositories/workout-repository';
import { OrdersError } from './order.constant';
import { UserRepository } from '@project/repositories/user-repository';
import { UserRole } from '@project/shared/shared-types';
import dayjs from 'dayjs';
import { OrderQuery } from '@project/shared/shared-query';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly workoutRepository: WorkoutRepository,
    private readonly userRepository: UserRepository,
  ) { }

  public async create(dto: CreateOrderDto, userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(OrdersError.UserNotFound);
    } 
    if (user.role !== UserRole.User) {
      throw new BadRequestException(OrdersError.WrongRole);
    }
    const workout = await this.workoutRepository.findById(dto.workoutId);
    if (!workout) {
      throw new NotFoundException(OrdersError.WorkoutNotFound);
    } 
    const order = {
      ...dto,
      userId,
      price: workout.price,
      orderPrice: dto.count * workout.price,
      createdDate: dayjs().toDate(),
    }
    const orderEntity = new OrderEntity(order);
    const newOrder = await this.orderRepository.create(orderEntity);
    return newOrder;
  }

  public async findByOrderId(id: number) {
    return await this.orderRepository.findById(id);
  }

  public async findByWorkoutId(id: number, query: OrderQuery) {
    return await this.orderRepository.findByWorkoutId(id, query);
  }
}
