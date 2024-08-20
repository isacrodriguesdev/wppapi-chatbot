import { MessageDatastore } from "src/app/datastores/message-datastore/message-datastore";
import { IMessageOption, MessageOption } from "src/domain/entities/message-option";
import { MessageRepository } from "src/domain/repositories/message-repository";

export enum MessageLabel {
  START = "start",
  WELLCOME = "welcome",
  SELECT_BRANCH = "select_branch",
  SELECT_SERVICE = "select_service",
  SELECT_DATE = "select_date",
  SELECT_DAY_PERIOD = "select_day_period",
  SELECT_TIME = "select_time",
  SCHEDULE_COMPLETED = "schedule_completed",
  SCHEDULED_SERVICES = "scheduled_services",
  APPOINTMENT_DETAILS = "appointment_details",
  COMPANY_LOCATION = "company_location",
  SCHEDULE_CANCELLATION = "schedule_cancellation",
  UNAVAILABLE_TIMES = "unavailable_times",
  FULL_SCHEDULES = "full_schedules",
  SCHEDULE_REMINDER = "schedule_reminder",
  INVALID_OPTION = "invalid_option",
  APPOINTMENT_REMINDER = "appointment_reminder",
  SELECT_OPERATOR = "select_operator",
  ASK_NAME = "ask_name",
  SELECT_DEPARTMENT = "select_department",
  CONVERSATION_START = "conversation_start",
  CONVERSATION_END = "conversation_end",
}

export interface IMessage {
  id: string;
  branchId?: string;
  name: MessageLabel;
  contents: string[];
  actions: string[];
  options: IMessageOption[];
  payload?: any | null;
  group?: string;
}

export class Message {
  private _id: string;
  private _branchId?: string;
  private _name: MessageLabel;
  private _contents: string[];
  private _actions: string[];
  private _options: MessageOption[] = [];
  private _payload?: any | null;
  private _group?: string;
  private endContents: string[] = [];

  private messageDataStore: MessageDatastore;
  private messageRepository: MessageRepository;

  constructor(message: Omit<IMessage, "id">, messageDataStore: MessageDatastore, messageRepository: MessageRepository) {
    this._branchId = message.branchId;
    this._name = message.name;
    this._contents = message.contents;
    this._actions = message.actions;
    this._payload = message.payload;
    this._group = message.group;

    this.messageDataStore = messageDataStore;
    this.messageRepository = messageRepository;

    if (message.options) {
      message.options.sort((a, b) => a.index - b.index);
      for (const option of message.options) {
        const messageOption = new MessageOption(option);
        this.addOption(messageOption);
      }
    }
  }

  get id(): string {
    return this._id;
  }

  get branchId(): string | undefined {
    return this._branchId;
  }

  get name(): MessageLabel {
    return this._name;
  }

  get contents(): string[] {
    return this._contents;
  }

  set contents(contents: string[]) {
    this._contents = contents;
  }

  get actions(): string[] {
    return this._actions;
  }

  get options(): MessageOption[] {
    return this._options;
  }

  get payload(): any | null {
    return this._payload;
  }

  get group(): string {
    return this._group;
  }

  async getPayload(userId: string): Promise<any | null> {
    if (this.group) {
      const groupMessages = await this.messageRepository.fetchByGroup(this.group, this.branchId);
      let payload = {};

      for (const message of groupMessages) {
        const newPayload = await this.messageDataStore.getPayload(userId, message.name);
        if (newPayload) {
          payload = { ...payload, ...newPayload };
        }
      }
      return payload;
    }

    return this._payload;
  }

  setPayload(payload: any | null) {
    this._payload = payload;
  }

  addOption(option: MessageOption): void {
    option.index = this._options.length + 1;
    this._options.push(option);
  }

  addContent(content: string) {
    this.endContents.push(content);
  }

  build(): string {
    const texts = [...this.contents, ...this.options.map((option) => option.message), ...this.endContents];
    return texts.join("\n");
  }

  serialize(): IMessage {
    return {
      id: this.id,
      name: this.name,
      contents: this.contents,
      actions: this.actions,
      options: this.options.map((option) => option.serialize()),
      payload: this._payload,
    };
  }

  replace(placeholder: string, value: string): void {
    const regexp = new RegExp(`{{${placeholder}}}`, "g");

    this._contents = this._contents.map((content) => content.replace(regexp, value));
    this._options = this._options.map((option) => {
      option.content = option.content.replace(regexp, value);
      return option;
    });
  }
}
