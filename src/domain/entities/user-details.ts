import { BaseEntity } from "src/domain/entities/base-entity";

export interface IUserDetails {
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

export class UserDetails extends BaseEntity {
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

  constructor(details: Omit<IUserDetails, "id">, id?: string) {
    super(id);
    this._userId = details.userId;
    this._email = details.email;
    this._cpf = details.cpf;
    this._complement = details.complement;
    this._street = details.street;
    this._neighborhood = details.neighborhood;
    this._number = details.number;
    this._zipCode = details.zipCode;
    this._city = details.city;
    this._state = details.state;
    this._createdAt = details.createdAt ?? new Date();
    this._updatedAt = details.updatedAt ?? new Date();
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

  serialize(): IUserDetails {
    return {
      id: this.id,
      userId: this._userId,
      email: this._email,
      cpf: this._cpf,
      complement: this._complement,
      street: this._street,
      neighborhood: this._neighborhood,
      number: this._number,
      zipCode: this._zipCode,
      city: this._city,
      state: this._state,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
