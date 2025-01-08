import { Replace } from 'src/helpers/Replace';
import { Content } from './notification-content';

export interface NotificationProps {
  id?: string | null;
  recipientId: string;
  content: Content;
  category: string;
  createdAt: Date;
  readAt?: Date | null;
  canceledAt?: Date | null;
}

export class Notification {
  private props: NotificationProps;

  constructor(props: Replace<NotificationProps, { createdAt?: Date }>) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public set content(content: Content) {
    this.props.content = content;
  }

  public get id(): string {
    return this.props.id ?? '';
  }

  public read(): void {
    this.props.readAt = new Date();
  }

  public unread(): void {
    this.props.readAt = null;
  }

  public cancel(): void {
    this.props.canceledAt = new Date();
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  public set category(category: string) {
    this.props.category = category;
  }
  public set id(id: string) {
    this.props.id = id;
  }

  public get content(): Content {
    return this.props.content;
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  public get recipientId(): string {
    return this.props.recipientId;
  }

  public get category(): string {
    return this.props.category;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }
}
