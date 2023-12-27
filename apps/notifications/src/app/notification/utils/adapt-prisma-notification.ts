import { Notification } from "@prisma/client";
import { NotificationRdo } from "../rdo/notification.rdo";

export function adaptPrismaNotification(prismaNotification: Notification | null): NotificationRdo {
    if (prismaNotification) {
      const Notification = {
        ...prismaNotification,
        createdDate: prismaNotification.createdDate.toISOString(),
        isActive: true
      };
      return Notification;
    }
    return null;
  }