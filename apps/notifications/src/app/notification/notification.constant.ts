export const NotificationsError = {
  UserError: 'Не может быть выбран пользователь, являющийся инициатором тренировки',
  UserNotFound: 'User is not found',
  WrongRole: 'User role is wrong',
  StatusError: "Status must be change",
  AuthError: "User is not recipient of this Notification",
  AuthUserError: "User is not creator of this Notification, and is not recipient of this order",
  NotCreatorError: 'Only creator can delete Notification',
} as const;
  
export const NotificationMessages = { 
  Add : "Notification added successfully",
  Delete : "Notification deleted successfully",
  Show: "Notification showing",
  Index: "Notifications are showing"
} as const;
  
export const NotificationPath = { 
  Main:"notification",
  Add:"add",
  Id:"list/:notificationId",
  Index:"list",
} as const;

export const  API_TAG_NAME ="Notification"
  