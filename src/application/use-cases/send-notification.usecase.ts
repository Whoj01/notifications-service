import { Injectable } from '@nestjs/common';
import { Notification } from '../entities/notification';
import { Content } from '../entities/notification-content';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface SendNotificationRequest {
  id?: string | null;
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;
    const notification = new Notification({
      id: '',
      recipientId,
      content: new Content(content),
      category,
    });

    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
