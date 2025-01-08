import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications.usecase';

describe('GetRecipientNotifications', () => {
  it('should be able to get the notifications from one recipient', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotificationsUseCase(
      notificationRepository,
    );
    const notification = makeNotification();
    await notificationRepository.create(notification);
    await notificationRepository.create(notification);
    await notificationRepository.create(
      makeNotification({ recipientId: '123' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: notification.recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: notification.recipientId }),
        expect.objectContaining({ recipientId: notification.recipientId }),
      ]),
    );
  });
});
