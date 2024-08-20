import { BaseEntity } from "src/domain/entities/base-entity";

export interface IUserProfile {
  id: string;
  userId: string;
  email?: string;
  cpf?: string;
  complement?: string;
  street?: string;
  neighborhood?: string;
  number?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserProfile extends BaseEntity {
  private _userId: string;
  private _email?: string;
  private _cpf?: string;
  private _complement?: string;
  private _street?: string;
  private _neighborhood?: string;
  private _number?: string;
  private _zipCode?: string;
  private _city?: string;
  private _state?: string;
  private _createdAt?: Date;
  private _updatedAt?: Date;

  constructor(userDetail: Omit<IUserProfile, "id">, id?: string) {
    super(id);
    this._userId = userDetail.userId;
    this._email = userDetail.email;
    this._cpf = userDetail.cpf;
    this._complement = userDetail.complement;
    this._street = userDetail.street;
    this._neighborhood = userDetail.neighborhood;
    this._number = userDetail.number;
    this._zipCode = userDetail.zipCode;
    this._city = userDetail.city;
    this._state = userDetail.state;
    this._createdAt = userDetail.createdAt ?? new Date();
    this._updatedAt = userDetail.updatedAt ?? new Date();
  }

  get userId() {
    return this._userId;
  }

  get email() {
    return this._email;
  }

  get cpf() {
    return this._cpf;
  }

  get complement() {
    return this._complement;
  }

  set complement(value: string | undefined) {
    this._complement = value;
  }

  get street() {
    return this._street;
  }

  get neighborhood() {
    return this._neighborhood;
  }

  get number() {
    return this._number;
  }

  get zipCode() {
    return this._zipCode;
  }

  set zipCode(value: string | undefined) {
    this._zipCode = value;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}
