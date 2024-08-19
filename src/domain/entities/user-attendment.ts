import { User, IUser } from "src/domain/entities/user";
import { BaseEntity } from "src/domain/entities/base-entity";

export interface IUserAttendment {
  id: string;
  userId: string;
  departmentId: string;
  employeeId?: string;
  branchId: string;
  status: string;
  user?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserAttendmentCreation extends Omit<IUserAttendment, "id" | "status"> {
  status?: IUserAttendment.Status;
}

export namespace IUserAttendment {
  export enum Status {
    OPEN = "open",
    CLOSED = "closed",
  }
}

export class UserAttendment extends BaseEntity {
  private _userId: string;
  private _departmentId: string;
  private _employeeId: string | undefined;
  private _branchId: string;
  private _status: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  private _user?: IUser;

  constructor(props: IUserAttendmentCreation, id?: string) {
    super(id);
    this._userId = props.userId;
    this._departmentId = props.departmentId;
    this._employeeId = props.employeeId;
    this._branchId = props.branchId;
    this._status = props.status ?? IUserAttendment.Status.OPEN;
    this._user = props.user;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get userId() {
    return this._userId;
  }

  get departmentId() {
    return this._departmentId;
  }

  get employeeId() {
    return this._employeeId;
  }

  get branchId() {
    return this._branchId;
  }

  get status() {
    return this._status;
  }

  get user() {
    return this._user;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
