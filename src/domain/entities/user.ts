import { BaseEntity } from "src/domain/entities/base-entity";

export interface IUser {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  phone: string;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends BaseEntity {
  private _name: string;
  private _email?: string;
  private _avatar?: string;
  private _phone: string;
  private _companyId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(user: Omit<IUser, "id">, id?: string) {
    super(id);
    this._name = user.name;
    this._email = user.email;
    this._avatar = user.avatar;
    this._phone = user.phone;
    this._companyId = user.companyId;
    this._createdAt = user.createdAt ?? new Date();
    this._updatedAt = user.updatedAt ?? new Date();
  }

  get name(): string {
    return this._name;
  }

  get email(): string | undefined {
    return this._email;
  }

  get avatar(): string | undefined {
    return this._avatar;
  }

  set avatar(avatar: string) {
    this._avatar = avatar;
  }

  get phone(): string {
    return this._phone;
  }

  get companyId(): string {
    return this._companyId;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  serialize(): IUser {
    return {
      id: this.id,
      name: this._name,
      email: this._email,
      phone: this._phone,
      companyId: this._companyId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
