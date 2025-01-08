import { Notification } from '@application/entities/notification';
import { CancelNotificationUseCase } from './cancel-notification.usecase';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found.error';
import { makeNotification } from '@test/factories/notification-factory';

describe('CancelNotification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );
    const notification = new Notification(makeNotification());
    await notificationRepository.create(notification);

    await cancelNotificationUseCase.execute({
      notificationId: notification?.id ?? '',
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification that does not exist', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationRepository,
    );

    await expect(
      cancelNotificationUseCase.execute({
        notificationId: '123',
      }),
    ).rejects.toThrow(NotificationNotFound);
  });
});
