import { BaseEntity } from "src/domain/entities/base-entity";

export interface IDepartment {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Department extends BaseEntity {
  private _name: string;
  private _description: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: Omit<IDepartment, "id">, id?: string) {
    super(id);
    this._name = props.name;
    this._description = props.description;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
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
      description: this._description,
      createdAt: this._createdAt,
    };
  }
}
