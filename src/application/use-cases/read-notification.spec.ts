import { Notification } from '@application/entities/notification';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found.error';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotificationUseCase } from './read-notification.usecase';

describe('ReadNotification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );
    const notification = new Notification(makeNotification());
    await notificationRepository.create(notification);

    await readNotificationUseCase.execute({
      notificationId: notification?.id ?? '',
    });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification that does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const readNotificationUseCase = new ReadNotificationUseCase(
      notificationRepository,
    );

    await expect(
      readNotificationUseCase.execute({
        notificationId: '123',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
