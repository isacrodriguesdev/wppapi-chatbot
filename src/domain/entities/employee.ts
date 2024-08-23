import { BaseEntity } from "src/domain/entities/base-entity";
import { Branch } from "src/domain/entities/branch";
import { Company } from "src/domain/entities/company";
import { User } from "src/domain/entities/user";

export interface IEmployee {
  id?: string;
  name: string;
  phone: string;
  avatar?: string;
  email?: string;
  password?: string;
  branchId: string;
  deviceId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
  company?: Company;
  branch?: Branch;
}

export class Employee extends BaseEntity {
  private _name: string;
  private _phone: string;
  private _avatar?: string;
  private _email?: string;
  private _password?: string;
  private _branchId: string;
  private _deviceId?: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _user?: User;
  private _company?: Company;
  private _branch?: Branch;

  constructor(props: IEmployee, id?: string) {
    super(id);
    this._name = props.name;
    this._phone = props.phone;
    this._avatar = props.avatar;
    this._email = props.email;
    this._password = props.password;
    this._branchId = props.branchId;
    this._deviceId = props.deviceId;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();

    this._user = props.user ? new User(props.user, props.user.id) : undefined;
    this._company = props.company ? new Company(props.company, props.company.id) : undefined;
    this._branch = props.branch ? new Branch(props.branch, props.branch.id) : undefined;
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

  get branchId(): string {
    return this._branchId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get user(): User | undefined {
    return this._user;
  }

  get company(): Company | undefined {
    return this._company;
  }

  get branch(): Branch | undefined {
    return this._branch;
  }

  get deviceId(): string | undefined {
    return this._deviceId;
  }

  serialize(): IEmployee {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      avatar: this.avatar,
      email: this.email,
      password: this.password,
      branchId: this.branchId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      company: this.company,
      branch: this.branch,
    };
  }
}
