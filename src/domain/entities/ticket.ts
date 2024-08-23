import { BaseEntity } from "src/domain/entities/base-entity";
import { Department } from "src/domain/entities/department";
import { Employee } from "src/domain/entities/employee";
import { IUser, User } from "src/domain/entities/user";

export interface ITicket {
  id: string;
  userId: string;
  branchId: string;
  departmentId: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
  department?: Department;
  assignment?: User;
}

export namespace ITicket {
  export enum Status {
    OPEN = "open",
    CLOSED = "closed",
  }
}

interface TicketProps extends Omit<ITicket, "id" | "status"> {
  status?: string;
}

export class Ticket extends BaseEntity {
  private _userId: string;
  private _branchId: string;
  private _departmentId: string;
  private _status: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _user?: User;
  private _department?: Department;
  private _assignment?: User;

  constructor(props: TicketProps, id?: string) {
    super(id);
    this._userId = props.userId;
    this._branchId = props.branchId;
    this._departmentId = props.departmentId;
    this._status = props.status;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._user = props.user ? new User(props.user, props.user.id) : undefined;
    this._department = props.department ? new Department(props.department, props.department.id) : undefined;
    this._assignment = props.assignment ? new User(props.assignment, props.assignment.id) : undefined;
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

  get user() {
    return this._user;
  }

  get department() {
    return this._department;
  }

  get assignment() {
    return this._assignment;
  }

  serialize() {
    return {
      id: this.id,
      userId: this.userId,
      branchId: this.branchId,
      departmentId: this.departmentId,
      status: this.status,
      createdAt: this.createdAt,
    };
  }
}
