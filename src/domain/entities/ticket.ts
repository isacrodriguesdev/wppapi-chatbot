import { BaseEntity } from "src/domain/entities/base-entity";

export interface ITicket {
  id: string;
  userId: string;
  branchId: string;
  departmentId: string;
  status: string,
  createdAt?: Date;
  updatedAt?: Date;
}

export namespace ITicket {
  export enum Status {
    OPEN = "open",
    CLOSED = "closed",
  }
}

interface ITicketProps extends Omit<ITicket, "id" | "status"> {
  status?: string,
}

export class Ticket extends BaseEntity {
  private _userId: string;
  private _branchId: string;
  private _departmentId: string;
  private _status: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: ITicketProps, id?: string) {
    super(id);
    this._userId = props.userId;
    this._branchId = props.branchId;
    this._departmentId = props.departmentId;
    this._status = props.status;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get userId() {
    return this._userId;
  }

  get branchId() {
    return this._branchId;
  }

  get departmentId() {
    return this._departmentId;
  }

  get status() {
    return this._status;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
