import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('nova solicitação de amizade'),
      category: 'Social',
      recipientId: 'id',
    });

    expect(notification).toBeTruthy();
  });

  // it('should not be able to create a notification content with less than 5 characters', () => {
  //   expect(() => new Content('voc')).toThrowError('Content length error.');
  // });

  // it('should not be able to create a notification content with more than 240 characters', () => {
  //   expect(() => new Content('v'.repeat(241))).toThrowError(
  //     'Content length error.',
  //   );
  // });
});
