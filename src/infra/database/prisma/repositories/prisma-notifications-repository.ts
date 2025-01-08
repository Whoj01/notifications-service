import { Notification } from 'src/application/entities/notification';
import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async findManyByRecipientId(
    recipientId: string,
  ): Promise<Notification[] | null> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });

    if (!notifications) {
      return null;
    }

    return notifications.map((notification) =>
      PrismaNotificationMapper.toDomain(notification),
    );
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrismaEntity(notification);

    await this.prisma.notification.update({
      where: {
        id: notification.id,
      },
      data: raw,
    });
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrismaEntity(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }
}
