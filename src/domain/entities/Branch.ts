import { BaseEntity } from "@/domain/entities/BaseEntity";

export interface IBranch {
  id: string;
  companyId: string;
  active: boolean;
  name: string;
  phone: string;
  address: string;
  coordinates: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Branch extends BaseEntity {
  private _companyId: string;
  private _active: boolean;
  private _name: string;
  private _phone: string;
  private _address: string;
  private _coordinates: string[];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(branch: Omit<IBranch, "id">, id?: string) {
    super(id);
    this._companyId = branch.companyId;
    this._active = branch.active;
    this._name = branch.name;
    this._phone = branch.phone;
    this._address = branch.address;
    this._coordinates = branch.coordinates;
    this._createdAt = branch.createdAt ?? new Date();
    this._updatedAt = branch.updatedAt ?? new Date();
  }

  get companyId(): string {
    return this._companyId;
  }

  get active(): boolean {
    return this._active;
  }

  get name(): string {
    return this._name;
  }

  get phone(): string {
    return this._phone;
  }

  get address(): string {
    return this._address;
  }

  get coordinates(): string[] {
    return this._coordinates;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  serialize(): IBranch {
    return {
      id: this.id,
      companyId: this._companyId,
      active: this._active,
      name: this._name,
      phone: this._phone,
      address: this._address,
      coordinates: this._coordinates,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
