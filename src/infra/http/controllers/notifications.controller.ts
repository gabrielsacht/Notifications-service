import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification';
import { GetRecipientsNotifications } from '@app/use-cases/get-recipients-notification';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notificaton-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientsNotifications: CountRecipientNotification,
    private getRecipientsNotifications: GetRecipientsNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('/count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientsNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('/from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientsNotifications.execute({
      recipientId,
    });
    return {
      notifications: notifications.map(NotificationViewModel.toHttp),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      category,
      content,
    });

    return {
      notification: NotificationViewModel.toHttp(notification),
    };
  }
}
