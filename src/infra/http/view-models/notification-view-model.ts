import { Notification } from '@app/entities/notification/notification';

export class NotificationViewModel {
  static toHttp(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
    };
  }
}
