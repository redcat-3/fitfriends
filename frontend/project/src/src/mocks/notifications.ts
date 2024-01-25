import { randomDate } from "./utils";
import { INotification } from "../types/reaction";

export const generateNotification = ( number: number): INotification => {
  const notification = {
    notificationId: number,
    userId: `user${number}@pochta.local`,
    createdDate: randomDate(new Date(2023, 1, 1), new Date()),
    text: `Пользователь ${number} добавил вас в друзья`,
    isActive: true
  }
  return notification;
}

export function createNotifications (count: number) {
  const arr = [1];
  for (let i = 1; i <= count; i++) {
	arr.push(i);
  }
  return arr.map((id) => generateNotification(id));
} 

export const notifications = createNotifications(5);