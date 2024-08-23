import { BaseEntity } from "src/domain/entities/base-entity";

export interface ITicketMessage {
  id: string;
  userId: string;
  ticketId: string;
  type: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TicketMessage extends BaseEntity {
  private _userId: string;
  private _ticketId: string;
  private _type: string;
  private _content: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: Omit<ITicketMessage, "id">, id?: string) {
    super(id);

    this._userId = props.userId;
    this._ticketId = props.ticketId;
    this._type = props.type;
    this._content = props.content;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get userId() {
    return this._userId;
  }

  get ticketId() {
    return this._ticketId;
  }

  get type() {
    return this._type;
  }

  get content() {
    return this._content;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
      ticketId: this.ticketId,
      type: this.type,
      content: this.content,
      createdAt: this.createdAt,
    };
  }
}
