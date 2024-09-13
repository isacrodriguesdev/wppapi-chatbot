import { BaseEntity } from "@/domain/entities/BaseEntity";

export interface IUser {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  birthDate?: Date;
  profileImage?: string;
  cpf?: string;
  active: boolean;
  roles: string[];
  branchId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends BaseEntity {
  private _phone: string;
  private _name?: string;
  private _email?: string;
  private _birthDate?: Date;
  private _profileImage?: string;
  private _cpf?: string;
  private _active: boolean;
  private _roles: string[];
  private _branchId: string;
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(user: Omit<IUser, "id">, id?: string) {
    super(id);
    this._phone = user.phone;
    this._name = user.name;
    this._email = user.email;
    this._birthDate = user.birthDate;
    this._profileImage = user.profileImage;
    this._cpf = user.cpf;
    this._active = user.active;
    this._roles = user.roles;
    this._branchId = user.branchId;
    this._createdAt = user.createdAt ?? new Date();
    this._updatedAt = user.updatedAt ?? new Date();
  }

  get phone(): string {
    return this._phone;
  }

  get name(): string | undefined {
    return this._name;
  }

  get email(): string | undefined {
    return this._email;
  }

  get birthDate(): Date | undefined {
    return this._birthDate;
  }

  get profileImage(): string | undefined {
    return this._profileImage;
  }

  get cpf(): string | undefined {
    return this._cpf;
  }

  get active(): boolean {
    return this._active;
  }

  get roles(): string[] {
    return this._roles;
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

  serialize(): IUser {
    return {
      id: this.id,
      phone: this._phone,
      name: this._name,
      email: this._email,
      birthDate: this._birthDate,
      profileImage: this._profileImage,
      cpf: this._cpf,
      active: this._active,
      roles: this._roles,
      branchId: this.branchId,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
