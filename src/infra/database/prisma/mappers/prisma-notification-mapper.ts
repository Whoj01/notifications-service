import { Notification } from '@application/entities/notification';
import { Content } from '@application/entities/notification-content';
import { Notification as RawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrismaEntity(notification: Notification) {
    return {
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(notification: RawNotification): Notification {
    return new Notification({
      id: notification.id,
      content: new Content(notification.content),
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    });
  }
}
