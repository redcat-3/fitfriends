import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RequestRepository } from '@project/repositories/workout-repository';
import { RequestEntity } from '@project/repositories/workout-repository';
import { RequestsError } from './request.constant';
import { UserRepository } from '@project/repositories/user-repository';
import { UserRole } from '@project/shared/shared-types';
import dayjs from 'dayjs';
import { RequestStatus } from '@prisma/client';
import { NotificationEntity, NotificationRepository } from '@project/repositories/notification-repository';

@Injectable()
export class RequestsService {
  constructor(
    private readonly requestRepository: RequestRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationRepository: NotificationRepository,
  ) { }

  public async create(requester: string, userId: string) {
    if (requester === userId) {
      throw new NotFoundException(RequestsError.UserError);
    }
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(RequestsError.UserNotFound);
    }
    if (user.role !== UserRole.User) {
      throw new NotFoundException(RequestsError.WrongRole);
    } 
    const request = {
      requester,
      userId,
      createdDate: dayjs().toDate(),
      updatedDate: dayjs().toDate(),
      status: RequestStatus.consider
    }
    const requestEntity = new RequestEntity(request);
    const newRequest = await this.requestRepository.create(requestEntity);
    const initiator = await this.userRepository.findById(requester);
    const text = `Пользователь ${initiator.name} приглашает на совместную тренировку`;
      const notification = {
        text,
        userId,
        createdDate: dayjs().toDate(),
      }
      const notificationEntity = new NotificationEntity(notification);
      this.notificationRepository.create(notificationEntity);
    return newRequest;
  }

  public async update(requestId: number, status: RequestStatus, userId: string) {
    const request = await this.requestRepository.findById(requestId);
    if (userId !== request.userId) {
      throw new BadRequestException(RequestsError.AuthError);
    }
    if (status === request.status) {
      throw new BadRequestException(RequestsError.StatusError);
    }
    const updatedRequest = { 
      ...request, 
      status,
      updatedDate: dayjs().toDate(),
    };
    const requestEntity = await new RequestEntity(updatedRequest);
    return this.requestRepository.update(requestId, requestEntity);
  }

  public async findByRequester(userId: string) {
    return await this.requestRepository.findByRequester(userId);
  }
  
  public async findByRequestId(userId: string, requestId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(RequestsError.UserNotFound);
    }
    const request = await this.requestRepository.findById(requestId);
    if (userId === request.userId || userId === request.requester) {
      return request;
    } else {
      throw new BadRequestException(RequestsError.AuthUserError);
    }
  }

  public async findByUserId(userId: string) {
    return await this.requestRepository.findByUserId(userId);
  }

  public async delete(requestId: number, userId: string) {
    const request = await this.requestRepository.findById(requestId);
    if (request.requester === userId) {
      return await this.requestRepository.destroy(requestId);
    } else {
      throw new BadRequestException(RequestsError.NotCreatorError);
    }
  }
}
