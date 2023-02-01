import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('você recebeu uma solicitação de amizade');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('voc')).toThrowError('Content length error.');
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('v'.repeat(241))).toThrowError(
      'Content length error.',
    );
  });
});
