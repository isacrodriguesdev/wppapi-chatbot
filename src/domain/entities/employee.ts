import { BaseEntity } from "src/domain/entities/base-entity";
import { Branch } from "src/domain/entities/branch";

export interface IEmployee {
  id?: string;
  name: string;
  phone: string;
  avatar?: string;
  email?: string;
  password?: string;
  companyId: string;
  branchId: string;
  androidDeviceToken: string;
  createdAt?: Date;
  updatedAt?: Date;
  branch?: Branch;
}

export class Employee extends BaseEntity {
  private _name: string;
  private _phone: string;
  private _avatar?: string;
  private _email?: string;
  private _password?: string;
  private _companyId: string;
  private _branchId: string;
  private _androidDeviceToken: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _branch?: Branch;

  constructor(props: IEmployee, id?: string) {
    super(id);
    this._name = props.name;
    this._phone = props.phone;
    this._avatar = props.avatar;
    this._email = props.email;
    this._password = props.password;
    this._companyId = props.companyId;
    this._branchId = props.branchId;
    this._androidDeviceToken = props.androidDeviceToken;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._branch = props.branch;
  }

  get name(): string {
    return this._name;
  }

  get phone(): string {
    return this._phone;
  }

  get avatar(): string | undefined {
    return this._avatar;
  }

  get email(): string | undefined {
    return this._email;
  }

  get password(): string | undefined {
    return this._password;
  }

  get companyId(): string {
    return this._companyId;
  }

  get branchId(): string {
    return this._branchId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get branch(): Branch | undefined {
    return this._branch;
  }

  get androidDeviceToken(): string {
    return this._androidDeviceToken;
  }

  serialize(): IEmployee {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      avatar: this.avatar,
      email: this.email,
      password: this.password,
      companyId: this.companyId,
      branchId: this.branchId,
      androidDeviceToken: this.androidDeviceToken,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
