import { BaseEntity } from "src/domain/entities/base-entity";
import { Company } from "src/domain/entities/company";
import { Employee } from "src/domain/entities/employee";
import { Message } from "src/domain/entities/message";
import { OperatingDay } from "src/domain/entities/operating-day";
import { Schedule } from "src/domain/entities/schedule";
import { Service } from "src/domain/entities/service";

export interface IBranch {
  id: string;
  companyId: string;
  name: string;
  phone: string;
  zipCode?: string;
  complement?: string;
  state?: string;
  city?: string;
  geoLocation: string[];
  createdAt?: Date;
  updatedAt?: Date;
  company?: Company;
  schedules?: Schedule[];
  operatingDays?: OperatingDay[];
  services?: Service[];
  employees?: Employee[];
  messages?: Message[];
}

export class Branch extends BaseEntity {
  private _companyId: string;
  private _name: string;
  private _phone: string;
  private _zipCode?: string;
  private _complement?: string;
  private _state?: string;
  private _city?: string;
  private _geoLocation: string[];
  private _createdAt: Date;
  private _updatedAt: Date;
  private _company?: Company;
  private _schedules: Schedule[];
  private _operatingDays: OperatingDay[];
  private _services: Service[];
  private _employees: Employee[];
  private _messages: Message[];

  constructor(props: Omit<IBranch, "id">, id?: string) {
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
    this._company = props.company;
    this._schedules = props.schedules ?? [];
    this._operatingDays = props.operatingDays ?? [];
    this._services = props.services ?? [];
    this._employees = props.employees ?? [];
    this._messages = props.messages ?? [];
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

  get geoLocation(): string[] {
    return this._geoLocation;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get company(): Company {
    return this._company;
  }

  get schedules(): Schedule[] {
    return this._schedules;
  }

  get operatingDays(): OperatingDay[] {
    return this._operatingDays;
  }

  get services(): Service[] {
    return this._services;
  }

  get employees(): Employee[] {
    return this._employees;
  }

  get messages(): Message[] {
    return this._messages;
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
      company: this.company,
      schedules: this.schedules,
      operatingDays: this.operatingDays,
      services: this.services,
      employees: this.employees,
      messages: this.messages,
    };
  }

  static deserialize(data: IBranch): Branch {
    return new Branch(data);
  }
}
