import { BaseEntity } from "src/domain/entities/base-entity";
import { Service } from "src/domain/entities/service";

export interface IBranch {
  id?: string;
  companyId: string;
  name: string;
  phone: string;
  zipCode?: string;
  complement?: string;
  state?: string;
  city?: string;
  geoLocation?: string;
  createdAt?: Date;
  updatedAt?: Date;
  services?: Service[];
}

export class Branch extends BaseEntity {
  private _companyId: string;
  private _name: string;
  private _phone: string;
  private _zipCode?: string;
  private _complement?: string;
  private _state?: string;
  private _city?: string;
  private _geoLocation?: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _services: Service[];

  constructor(props: IBranch, id?: string) {
    super(id);
    this._companyId = props.companyId;
    this._name = props.name;
    this._phone = props.phone;
    this._zipCode = props.zipCode;
    this._complement = props.complement;
    this._state = props.state;
    this._city = props.city;
    this._geoLocation = props.geoLocation;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._services = props.services ?? [];
  }

  get companyId(): string {
    return this._companyId;
  }

  get name(): string {
    return this._name;
  }

  get phone(): string {
    return this._phone;
  }

  get zipCode(): string | undefined {
    return this._zipCode;
  }

  get complement(): string | undefined {
    return this._complement;
  }

  get state(): string | undefined {
    return this._state;
  }

  get city(): string | undefined {
    return this._city;
  }

  get geoLocation(): string | undefined {
    return this._geoLocation;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get services(): Service[] {
    return this._services;
  }

  serialize(): IBranch {
    return {
      id: this.id,
      companyId: this.companyId,
      name: this.name,
      phone: this.phone,
      zipCode: this.zipCode,
      complement: this.complement,
      state: this.state,
      city: this.city,
      geoLocation: this.geoLocation,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      services: this.services,
    };
  }
}
