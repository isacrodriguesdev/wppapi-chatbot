import { BaseEntity } from "src/domain/entities/base-entity";
import { Branch } from "src/domain/entities/branch";
import { Service } from "src/domain/entities/service";
import { User } from "src/domain/entities/user";

export enum ScheduleStatus {
  SCHEDULED = "scheduled",
  CANCELED = "canceled",
  DONE = "done",
}

export interface ISchedule {
  id: string;
  status?: ScheduleStatus;
  userId: string;
  companyId: string;
  serviceId: string;
  branchId: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  service?: Service;
  user?: User;
  branch?: Branch;
}

interface ScheduleSerialized {
  user?: boolean;
  service?: boolean;
  branch?: boolean;
}

export class Schedule extends BaseEntity {
  private _status: ScheduleStatus;
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

  constructor(props: Omit<ISchedule, "id">, id?: string) {
    super(id);
    this._status = props.status ?? ScheduleStatus.SCHEDULED;
    this._userId = props.userId;
    this._companyId = props.companyId;
    this._serviceId = props.serviceId;
    this._branchId = props.branchId;
    this._date = props.date;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._service = props.service;
    this._user = props.user;
    this._branch = props.branch;
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

  get status(): ScheduleStatus {
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

  serialize(include?: ScheduleSerialized): ISchedule {
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
      service: include.service ? this.service : undefined,
      user: include.user ? this.user : undefined,
      branch: include.branch ? this.branch : undefined,
    };
  }
}
