import { Req, Controller, HttpStatus, Param, Get, UseGuards, Delete } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { API_TAG_NAME, NotificationMessages, NotificationPath } from './notification.constant';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@project/util/util-core';
import { NotificationRdo } from './rdo/notification.rdo';
import { RequestWithUserPayload } from '@project/shared/shared-types';
import { adaptPrismaNotification } from './utils/adapt-prisma-notification';

@ApiTags(API_TAG_NAME)
@Controller(NotificationPath.Main)
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: NotificationMessages.Delete,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(NotificationPath.Id)
  public async deleteNotification(@Param('notificationId') id: number, @Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    return await this.notificationService.delete(id, userId,);
  }

  @ApiResponse({
    type: NotificationRdo,
    status: HttpStatus.OK,
    description: NotificationMessages.Show,
  })
  @UseGuards(JwtAuthGuard)
  @Get(NotificationPath.Id)
  public async showNotification(@Param('notificationId') notificationId: number) {
    const notification = await this.notificationService.findByNotificationId(notificationId);
    return adaptPrismaNotification(notification);
  }

  @ApiResponse({
    type: NotificationRdo,
    status: HttpStatus.OK,
    description: NotificationMessages.Index,
  })
  @UseGuards(JwtAuthGuard)
  @Get(NotificationPath.Index)
  public async indexNotification(@Req() {user}: RequestWithUserPayload) {
    const userId = user.sub;
    const notifications = await this.notificationService.findByUser(userId);
    return notifications.map((notification) => adaptPrismaNotification(notification));
  }
}
