import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notification';
import { GetRecipientsNotifications } from '@app/use-cases/get-recipients-notification';
import { ReadNotification } from '@app/use-cases/read-notification';
import { UnreadNotification } from '@app/use-cases/unread-notification';
import { Module } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    GetRecipientsNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class httpModule {}
