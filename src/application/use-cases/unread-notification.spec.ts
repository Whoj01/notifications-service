import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found.error';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotificationUseCase } from './read-notification.usecase';
import { UnReadNotificationUseCase } from './unread-notification.usecase';

describe('ReadNotification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unReadNotificationUseCase = new UnReadNotificationUseCase(
      notificationRepository,
    );
    const notification = new Notification(
      makeNotification({
        readAt: new Date(),
      }),
    );
    await notificationRepository.create(notification);

    await unReadNotificationUseCase.execute({
      notificationId: notification?.id ?? '',
    });

    expect(notificationRepository.notifications[0].readAt).toBe(null);
  });

  it('should not be able to read a notification that does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unReadNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    await expect(
      unReadNotificationUseCase.execute({
        notificationId: '123',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
