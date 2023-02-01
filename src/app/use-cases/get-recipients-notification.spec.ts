import { makeNotification } from '@test/factories/notifications-factory';
import { InMemoryNotificationRespository } from '../../../test/repositories/in-memory-notification-repository';
import { GetRecipientsNotifications } from './get-recipients-notification';

describe('Get recipients notifications', () => {
  it('should be able to list notifications of a recipientId', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const getRecipientsNotifications = new GetRecipientsNotifications(
      notificationRespository,
    );

    await notificationRespository.create(makeNotification());
    await notificationRespository.create(makeNotification());
    await notificationRespository.create(
      makeNotification({ recipientId: 'id-test-2' }),
    );

    const { notifications } = await getRecipientsNotifications.execute({
      recipientId: 'id-test',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'id-test' }),
        expect.objectContaining({ recipientId: 'id-test' }),
      ]),
    );
  });
});
