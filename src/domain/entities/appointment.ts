import { BaseEntity } from "src/domain/entities/base-entity";
import { Branch, IBranch } from "src/domain/entities/branch";
import { IService, Service } from "src/domain/entities/service";
import { IUser, User } from "src/domain/entities/user";

export namespace IAppointment {
  export enum Status {
    SCHEDULED = "scheduled",
    CANCELED = "canceled",
    DONE = "done",
  }
}

export interface IAppointment {
  id?: string;
  status?: IAppointment.Status;
  userId: string;
  companyId: string;
  serviceId: string;
  branchId: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  service?: IService;
  user?: IUser;
  branch?: IBranch;
}

export class Appointment extends BaseEntity {
  private _status: IAppointment.Status;
  private _userId: string;
  private _companyId: string;
  private _serviceId: string;
  private _branchId: string;
  private _date: Date;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _service?: Service;
  private _user?: User;
  private _branch?: Branch;

  constructor(props: IAppointment, id?: string) {
    super(id);
    this._status = props.status ?? IAppointment.Status.SCHEDULED;
    this._userId = props.userId;
    this._companyId = props.companyId;
    this._serviceId = props.serviceId;
    this._branchId = props.branchId;
    this._date = props.date;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._service = props.service as Service;
    this._user = props.user as User;
    this._branch = props.branch as Branch;
  }

  get user(): User {
    return this._user;
  }

  get service(): Service {
    return this._service;
  }

  get branch(): Branch {
    return this._branch;
  }

  get status(): IAppointment.Status {
    return this._status;
  }

  get userId(): string {
    return this._userId;
  }

  get companyId(): string {
    return this._companyId;
  }

  get serviceId(): string {
    return this._serviceId;
  }

  get branchId(): string {
    return this._branchId;
  }

  get date(): Date {
    return this._date;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  serialize(): IAppointment {
    return {
      id: this.id,
      status: this.status,
      userId: this.userId,
      companyId: this.companyId,
      serviceId: this.serviceId,
      branchId: this.branchId,
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      service: this.service,
      user: this.user,
      branch: this.branch,
    };
  }
}
