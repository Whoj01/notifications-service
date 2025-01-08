import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notification-repository';
import { SendNotificationUseCase } from './send-notification.usecase';

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sendNotificationUseCase = new SendNotificationUseCase(
      notificationRepository,
    );

    const { notification } = await sendNotificationUseCase.execute({
      id: null,
      recipientId: '123',
      content: 'This is a notification',
      category: 'social',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notification).toEqual(notificationRepository.notifications[0]);
  });
});
