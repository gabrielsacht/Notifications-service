import { makeNotification } from '@test/factories/notifications-factory';
import { InMemoryNotificationRespository } from '../../../test/repositories/in-memory-notification-repository';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const unreadNotification = new UnreadNotification(notificationRespository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationRespository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRespository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification when it does not exists', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const unreadNotification = new UnreadNotification(notificationRespository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'id-fake',
      });
    }).rejects.toThrow('Notification not found.');
  });
});
