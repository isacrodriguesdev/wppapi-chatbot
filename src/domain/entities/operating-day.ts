import { BaseEntity } from "src/domain/entities/base-entity";

export interface IOperatingDay {
  id: string;
  branchId: string;
  companyId: string;
  weekDay: string;
  startTime: string;
  endTime: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class OperatingDay extends BaseEntity {
  private _branchId: string;
  private _companyId: string;
  private _weekDay: string;
  private _startTime: string;
  private _endTime: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: Omit<IOperatingDay, "id">, id?: string) {
    super(id);
    this._branchId = props.branchId;
    this._companyId = props.companyId;
    this._weekDay = props.weekDay;
    this._startTime = props.startTime;
    this._endTime = props.endTime;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get branchId(): string {
    return this._branchId;
  }

  get companyId(): string {
    return this._companyId;
  }

  get weekDay(): string {
    return this._weekDay;
  }

  get startTime(): string {
    return this._startTime;
  }

  get endTime(): string {
    return this._endTime;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  serialize(): IOperatingDay {
    return {
      id: this.id,
      branchId: this._branchId,
      companyId: this._companyId,
      weekDay: this._weekDay,
      startTime: this._startTime,
      endTime: this._endTime,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
