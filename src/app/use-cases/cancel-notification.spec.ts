import { makeNotification } from '@test/factories/notifications-factory';
import { InMemoryNotificationRespository } from '../../../test/repositories/in-memory-notification-repository';
import { CancelNotification } from './cancel-notification';

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const cancelNotification = new CancelNotification(notificationRespository);

    const notification = makeNotification();

    await notificationRespository.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRespository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exists', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const cancelNotification = new CancelNotification(notificationRespository);

    expect(() => {
      return cancelNotification.execute({
        notificationId: 'id-fake',
      });
    }).rejects.toThrow('Notification not found.');
  });
});
