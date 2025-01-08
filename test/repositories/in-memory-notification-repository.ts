import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async findManyByRecipientId(
    recipientId: string,
  ): Promise<Notification[] | null> {
    return this.notifications.filter(
      (item) => item.recipientId === recipientId,
    );
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((item) => item.recipientId === recipientId)
      .length;
  }
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );
    return notification || null;
  }

  async save(notification: Notification): Promise<void> {
    const index = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );
    if (index >= 0) {
      this.notifications[index] = notification;
    } else {
      this.notifications.push(notification);
    }
  }

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
