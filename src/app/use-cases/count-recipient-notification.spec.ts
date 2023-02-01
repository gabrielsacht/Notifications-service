import { makeNotification } from '@test/factories/notifications-factory';
import { InMemoryNotificationRespository } from '../../../test/repositories/in-memory-notification-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count recipients notifications', () => {
  it('should be able to count notifications of a recipientId', async () => {
    const notificationRespository = new InMemoryNotificationRespository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRespository,
    );

    await notificationRespository.create(makeNotification());
    await notificationRespository.create(makeNotification());
    await notificationRespository.create(
      makeNotification({ recipientId: 'id-test-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'id-test',
    });

    expect(count).toEqual(2);
  });
});
