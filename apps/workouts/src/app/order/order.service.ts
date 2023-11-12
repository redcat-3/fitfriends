import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '@project/repositories/workout-repository';
import { CreateOrderDto } from '@project/shared/shared-dto';
import { WorkoutRepository, OrderEntity } from '@project/repositories/workout-repository';
import { EMPTY_WORKOUT, OrdersError } from './order.constant';
import { UserRepository } from '@project/repositories/user-repository';
import { OrderToCoach, UserRole } from '@project/shared/shared-types';
import dayjs from 'dayjs';
import { OrderQuery } from '@project/shared/shared-query';
import { BalanceEntity, BalanceRepository } from '@project/repositories/balance-repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly workoutRepository: WorkoutRepository,
    private readonly userRepository: UserRepository,
    private readonly balanceRepository: BalanceRepository,
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
      coachId: workout.coachId,
      price: workout.price,
      orderPrice: dto.count * workout.price,
      createdDate: dayjs().toDate(),
    }
    const orderEntity = new OrderEntity(order);
    const newOrder = await this.orderRepository.create(orderEntity);
    const balance = {
      userId,
      workoutId: workout.workoutId,
      price: workout.price,
      count: dto.count
    }
    const balanceEntity = new BalanceEntity(balance);
    await this.balanceRepository.create(balanceEntity);
    return newOrder;
  }

  public async findByOrderId(userId: string, id: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(OrdersError.UserNotFound);
    } 
    const order = await this.orderRepository.findById(id);
    if (userId === order.coachId || userId === order.userId) {
      return order;
    } else {
      throw new BadRequestException(OrdersError.AuthError);
    }
    
  }

  public async findByWorkoutId(userId: string, id: number, query: OrderQuery) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(OrdersError.UserNotFound);
    } 
    if (user.role !== UserRole.Coach) {
      throw new BadRequestException(OrdersError.WrongRole);
    }
    const workout = await this.workoutRepository.findById(id);
    if (workout.coachId !== userId) {
      throw new BadRequestException(OrdersError.AuthWorkoutError);
    }
    return await this.orderRepository.findByWorkoutId(id, query);
  }

  public async findByCoachId(id: string, query: OrderQuery) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(OrdersError.UserNotFound);
    } 
    if (user.role !== UserRole.Coach) {
      throw new BadRequestException(OrdersError.WrongRole);
    }
    const groupWorkouts = await this.orderRepository.groupByWorkoutWereCoachId(id, query);
    const orders = [];
    const order: OrderToCoach = {workout: EMPTY_WORKOUT, countWorkout: 0, orderPrice: 0};
    let summaryPrice = 0;
    if (groupWorkouts.length > 0) {
      groupWorkouts.map(async (item) => {
        order.workout = await this.workoutRepository.findById(item.workoutId);
        order.countWorkout = item._sum.count;
        order.orderPrice = item._sum.orderPrice;
        orders.push(order);
        summaryPrice = summaryPrice + item._sum.orderPrice;
      });
    }
    return {orders, summaryPrice};
  }
}
