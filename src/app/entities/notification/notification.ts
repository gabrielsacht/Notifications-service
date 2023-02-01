import { Replace } from 'src/app/helpers/Replace';
import { Content } from './content';
import { randomUUID } from 'node:crypto';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
  canceledAt?: Date | null;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public get content(): Content {
    return this.props.content;
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get category(): string {
    return this.props.category;
  }

  public set category(category: string) {
    this.props.category = category;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public read() {
    this.props.readAt = new Date();
  }

  public unRead() {
    this.props.readAt = null;
  }
}
