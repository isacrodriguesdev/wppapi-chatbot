import { BaseEntity } from "src/domain/entities/base-entity";
import { Branch } from "src/domain/entities/branch";

export interface IService {
  id?: string;
  companyId: string;
  branchId: string;
  name: string;
  price: number;
  duration: number;
  createdAt?: Date;
  updatedAt?: Date;
  branch?: Branch;
}

export class Service extends BaseEntity {
  private _companyId: string;
  private _branchId: string;
  private _name: string;
  private _price: number;
  private _duration: number;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _branch?: Branch;

  constructor(props: IService, id?: string) {
    super(id);
    this._companyId = props.companyId;
    this._branchId = props.branchId;
    this._name = props.name;
    this._price = props.price;
    this._duration = props.duration;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._branch = props.branch;

    if (!this._price) {
      this._price = parseFloat(this._price.toFixed(2));
    }
  }

  get companyId() {
    return this._companyId;
  }

  get branchId() {
    return this._branchId;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get duration() {
    return this._duration;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get branch(): Branch {
    return this._branch;
  }

  serialize(): IService {
    return {
      id: this.id,
      companyId: this.companyId,
      branchId: this.branchId,
      name: this.name,
      price: this.price,
      duration: this.duration,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      branch: this.branch,
    };
  }
}
