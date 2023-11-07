import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { Notification } from '@prisma/client';
import { NotificationEntity } from './notification.entity';
import { PrismaService } from './prisma/prisma.service';
import { DEFAULT_NOTIFCATION_NUMBER, DEFAULT_SORT_DIRECTION } from './notification-repository.constant';

@Injectable()
export class NotificationRepository implements CRUDRepository<NotificationEntity, number, Notification> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: NotificationEntity): Promise<Notification> {
    return await this.prisma.notification.create({data: {...item.toObject()}}); 
  }

  public async findById(notificationId: number): Promise<Notification | null> {
    return await this.prisma.notification.findFirst({
      where: {
        notificationId
      }
    });
  }

  public async update(notificationId: number, item: NotificationEntity): Promise<Notification> {
    return await this.prisma.notification.update({
      where: {
        notificationId
      },
      data: {...item.toObject()}
    });
  }

  public async findByUserId(userId: string): Promise<Notification[] | null> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId
      },
      take: DEFAULT_NOTIFCATION_NUMBER,
      orderBy: [
        {
          createdDate: DEFAULT_SORT_DIRECTION,
        }
      ]
    });
    return notifications;
  }

  public async destroy(notificationId: number): Promise<void> {
    await this.prisma.notification.delete({ where: {notificationId} });
  }
}
