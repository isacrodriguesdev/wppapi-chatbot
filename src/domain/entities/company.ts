import { BaseEntity } from "src/domain/entities/base-entity";
import { Service } from "src/domain/entities/service";
import { Branch } from "src/domain/entities/branch";
import { Employee } from "src/domain/entities/employee";
import { Appointment } from "src/domain/entities/appointment";

export interface ICompany {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
  employees?: Employee[];
  appointments?: Appointment[];
  services?: Service[];
  branchs?: Branch[];
}

export class Company extends BaseEntity {
  private _name: string;
  private _phone: string;
  private _email?: string;
  private _password?: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _employees: Employee[];
  private _appointments: Appointment[];
  private _services: Service[];
  private _branchs: Branch[];

  constructor(props: ICompany, id?: string) {
    super(id);
    this._name = props.name;
    this._phone = props.phone;
    this._email = props.email;
    this._password = props.password;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? new Date();
    this._employees = props.employees ?? [];
    this._appointments = props.appointments ?? [];
    this._services = props.services ?? [];
    this._branchs = props.branchs ?? [];
  }

  get name(): string {
    return this._name;
  }

  get phone(): string {
    return this._phone;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get employees(): Employee[] {
    return this._employees;
  }

  get appointments(): Appointment[] {
    return this._appointments;
  }

  get services(): Service[] {
    return this._services;
  }

  get branchs(): Branch[] {
    return this._branchs;
  }

  serialize(): ICompany {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      employees: this.employees,
      appointments: this.appointments,
      services: this.services,
      branchs: this.branchs,
    };
  }
}
