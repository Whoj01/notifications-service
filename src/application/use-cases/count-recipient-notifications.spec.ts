import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotificationUseCase } from './count-recipient-notifications.usecase';
import { makeNotification } from '@test/factories/notification-factory';

describe('CountRecipientNotifications', () => {
  it('should be able to count the notifications from one recipient', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotificationUseCase(
      notificationRepository,
    );
    const notification = makeNotification();
    await notificationRepository.create(notification);
    await notificationRepository.create(notification);
    await notificationRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: notification.recipientId,
    });

    expect(count).toBe(2);
  });
});
