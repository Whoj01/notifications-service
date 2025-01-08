import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotificationUseCase } from '@application/use-cases/send-notification.usecase';
import { DatabaseModule } from '../database/database.module';
import { CancelNotificationUseCase } from '@application/use-cases/cancel-notification.usecase';
import { ReadNotificationUseCase } from '@application/use-cases/read-notification.usecase';
import { UnReadNotificationUseCase } from '@application/use-cases/unread-notification.usecase';
import { GetRecipientNotificationsUseCase } from '@application/use-cases/get-recipient-notifications.usecase';
import { CountRecipientNotificationUseCase } from '@application/use-cases/count-recipient-notifications.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    UnReadNotificationUseCase,
    CountRecipientNotificationUseCase,
    GetRecipientNotificationsUseCase,
  ],
})
export class HttpModule {}
