import { UserProfile } from "src/domain/entities/user-profile";
import { BaseEntity } from "src/domain/entities/base-entity";

export interface IUser {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  companyId: string;
  profile?: UserProfile;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends BaseEntity {
  private _name: string;
  private _avatar?: string;
  private _phone: string;
  private _companyId: string;
  private _profile: UserProfile;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(user: Omit<IUser, "id">, id?: string) {
    super(id);
    this._name = user.name
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .trim();
    this._avatar = user.avatar;
    this._phone = user.phone;
    this._companyId = user.companyId;
    this._profile = user.profile ?? new UserProfile({ userId: this.id });
    this._createdAt = user.createdAt ?? new Date();
    this._updatedAt = user.updatedAt ?? new Date();
  }

  get name() {
    return this._name;
  }

  get avatar() {
    return this._avatar;
  }

  set avatar(avatar: string) {
    this._avatar = avatar;
  }

  get phone() {
    return this._phone;
  }

  get companyId() {
    return this._companyId;
  }

  get profile() {
    return this._profile;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  serialize() {
    return {
      id: this.id,
      name: this._name,
      phone: this._phone,
      companyId: this._companyId,
      createdAt: this._createdAt,
    };
  }
}
