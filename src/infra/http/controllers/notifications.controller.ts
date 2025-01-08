import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotificationUseCase } from '@application/use-cases/send-notification.usecase';
import { NotificationViewModelMapper } from '../view-models/notification-view-model';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification.usecase';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification.usecase';
import { UnReadNotificationUseCase } from '@application/use-cases/unread-notification.usecase';
import { CountRecipientNotificationUseCase } from '@application/use-cases/count-recipient-notifications.usecase';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications.usecase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private SendNotificationUseCase: SendNotificationUseCase,
    private CancelNotificationUseCase: CancelNotificationUseCase,
    private ReadNotificationUseCase: ReadNotificationUseCase,
    private UnReadNotificationUseCase: UnReadNotificationUseCase,
    private CountRecipientNotificationsUseCase: CountRecipientNotificationUseCase,
    private GetRecipientNotificationsUseCase: GetRecipientNotificationsUseCase,
  ) {}
  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.ReadNotificationUseCase.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unRenad(@Param('id') id: string) {
    await this.UnReadNotificationUseCase.execute({ notificationId: id });
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } =
      await this.GetRecipientNotificationsUseCase.execute({
        recipientId,
      });

    return {
      notifications: notifications?.map((item) =>
        NotificationViewModelMapper.toHttp(item),
      ),
    };
  }

  @Get('count/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.CountRecipientNotificationsUseCase.execute({
      recipientId,
    });

    return { count };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.CancelNotificationUseCase.execute({ notificationId: id });
  }

  @Post('create')
  async create(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body;

    const { notification } = await this.SendNotificationUseCase.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModelMapper.toHttp(notification),
    };
  }
}
