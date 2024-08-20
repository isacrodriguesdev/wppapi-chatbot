import { BaseEntity } from "src/domain/entities/base-entity";
import { IMessage } from "src/domain/entities/message";

export interface IMessageOption {
  index: number;
  child: MessageLabel;
  content: string;
  message?: string | null;
  value?: any;
}

export interface IMessageOptionCreator extends Omit<IMessageOption, "child" | "index" | "message"> {
  index?: number;
  child?: MessageLabel;
  message?: string;
}

export class MessageOption extends BaseEntity {
  private _index: number;
  private _content: string;
  private _child: MessageLabel;
  private _value?: any;

  constructor(messageOption: IMessageOptionCreator, id?: string) {
    super(id);
    this._index = messageOption.index;
    this._child = messageOption.child;
    this._content = messageOption.content;

    if (messageOption.value) {
      this._value = messageOption.value;
    }
  }

  get index(): number {
    return this._index;
  }

  set index(index: number) {
    this._index = index;
  }

  get content(): string {
    return this._content;
  }

  set content(content: string) {
    this._content = content;
  }

  get message(): string | null {
    return `*# ${this.index}*・${this._content}`;
  }

  get child(): MessageLabel {
    return this._child;
  }

  get value(): any {
    return this._value;
  }

  replace(placeholder: string, value: string): void {
    const regexp = new RegExp(`{{${placeholder}}}`, "g");
    this._content = this._content.replace(regexp, value);
  }

  public serialize(): IMessageOption {
    return {
      index: this.index,
      content: this.content,
      child: this.child,
      value: this.value,
    };
  }
}
