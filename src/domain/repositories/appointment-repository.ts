import { IAppointment, Appointment } from "src/domain/entities/appointment";

export abstract class AppointmentRepository {
  abstract findById(id: string, status?: IAppointment.Status): Promise<Appointment | null>;
  abstract fetchLatestFromUser(userId: string, status?: IAppointment.Status): Promise<Appointment[]>;
  abstract fetchLatest(branchId: string, status?: IAppointment.Status): Promise<Appointment[]>;
  abstract getLatest(branchId: string, status?: IAppointment.Status): Promise<Appointment>;
  abstract fetchByRangeDate(
    branchId: string,
    startDate: Date,
    endDate: Date,
    status?: IAppointment.Status,
  ): Promise<Appointment[]>;
  abstract fetchByUserId(userId: string, status?: IAppointment.Status): Promise<Appointment[]>;
  abstract update(id: string, appointment: Partial<IAppointment>): Promise<void>;
}
