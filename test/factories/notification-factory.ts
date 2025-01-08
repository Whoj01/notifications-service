import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { Content } from '@application/entities/notification-content';

type overridde = Partial<NotificationProps>;

export function makeNotification(overridde: overridde = {}): Notification {
  return new Notification({
    id: '123',
    category: 'social',
    content: new Content('This is a notification'),
    recipientId: '453',
    ...overridde,
  });
}
