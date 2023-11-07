import { BadRequestException, Injectable } from '@nestjs/common';
import { NotificationRepository } from '@project/repositories/notification-repository';
import { NotificationEntity } from '@project/repositories/notification-repository';
import { NotificationsError } from './notification.constant';
import dayjs from 'dayjs';
import { CreateNotificationDto } from '@project/shared/shared-dto';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) { }

  public async create(dto: CreateNotificationDto) {
    const notification = {
      ...dto,
      createdDate: dayjs().toDate(),
    }
    const notificationEntity = new NotificationEntity(notification);
    const newNotification = await this.notificationRepository.create(notificationEntity);
    return newNotification;
  }

  public async findByUser(userId: string) {
    return await this.notificationRepository.findByUserId(userId);
  }
  
  public async findByNotificationId(notificationId: number) {
    return await this.notificationRepository.findById(notificationId);
  }

  public async delete(notificationId: number, userId: string) {
    const notification = await this.notificationRepository.findById(notificationId);
    if (notification.userId === userId) {
      return await this.notificationRepository.destroy(notificationId);
    } else {
      throw new BadRequestException(NotificationsError.NotCreatorError);
    }
  }
}
