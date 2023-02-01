import { makeNotification } from '@test/factories/notifications-factory';
import { InMemoryNotificationRespository } from '../../../test/repositories/in-memory-notification-repository';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const readNotification = new ReadNotification(notificationRespository);

    const notification = makeNotification();

    await notificationRespository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRespository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification when it does not exists', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const readNotification = new ReadNotification(notificationRespository);

    expect(() => {
      return readNotification.execute({
        notificationId: 'id-fake',
      });
    }).rejects.toThrow('Notification not found.');
  });
});
