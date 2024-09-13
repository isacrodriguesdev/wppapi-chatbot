import { BaseEntity } from "@/domain/entities/BaseEntity";

export interface IEmployee {
  id: string;
  userId: string;
  branchId: string;
  phone?: string;
  email: string;
  password: string;
  deviceId?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Employee extends BaseEntity {
  private _userId: string;
  private _branchId: string;
  private _phone?: string;
  private _email: string;
  private _password: string;
  private _deviceId?: string;
  private _active: boolean;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(employee: Omit<IEmployee, "id">, id?: string) {
    super(id);
    this._userId = employee.userId;
    this._branchId = employee.branchId;
    this._phone = employee.phone;
    this._email = employee.email;
    this._password = employee.password;
    this._deviceId = employee.deviceId;
    this._active = employee.active ?? true;
    this._createdAt = employee.createdAt ?? new Date();
    this._updatedAt = employee.updatedAt ?? new Date();
  }

  get userId() {
    return this._userId;
  }

  get branchId() {
    return this._branchId;
  }

  get phone(): string | undefined {
    return this._phone;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get deviceId(): string | undefined {
    return this._deviceId;
  }

  get active() {
    return this._active;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  set email(email: string) {
    this._email = email;
  }

  set password(password: string) {
    this._password = password;
  }

  set deviceId(deviceId: string) {
    this._deviceId = deviceId;
  }

  set active(active: boolean) {
    this._active = active;
  }

  serialize() {
    return {
      id: this.id,
      userId: this._userId,
      branchId: this._branchId,
      phone: this._phone,
      email: this._email,
      password: this._password,
      deviceId: this._deviceId,
      active: this._active,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
