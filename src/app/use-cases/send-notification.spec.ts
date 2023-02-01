import { InMemoryNotificationRespository } from '../../../test/repositories/in-memory-notification-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const sendNotification = new SendNotification(notificationRespository);

    const { notification } = await sendNotification.execute({
      content: 'Whis is a notification',
      category: 'social',
      recipientId: 'id-test',
    });

    expect(notificationRespository.notifications).toHaveLength(1);
    expect(notification).toEqual(notificationRespository.notifications[0]);
  });
});
