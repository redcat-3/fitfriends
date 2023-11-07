import { Notification } from '@project/shared/shared-types';

export class NotificationEntity implements Notification {
  public notificationId: number | undefined;
  public userId: string;
  public createdDate: Date;
  public text: string;

  constructor(notification: Notification) {
    this.notificationId = notification.notificationId;
    this.userId = notification.userId;
    this.createdDate = notification.createdDate;
    this.text = notification.text;
  }
  
  public toObject() {
    return {...this };
  }

}