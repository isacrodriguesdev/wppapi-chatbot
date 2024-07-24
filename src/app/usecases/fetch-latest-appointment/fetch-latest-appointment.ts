import { Injectable } from "@nestjs/common";
import { Appointment } from "src/domain/entities/appointment";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";

@Injectable()
export class FetchLatestAppointment {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(branchId: string): Promise<Appointment[]> {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const appointments = await this.appointmentRepository.fetchByRangeDate(branchId, startDate, endDate);
    return appointments
      .filter((appointment) => appointment.status !== "canceled")
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .sort((a, b) => (a.status === "done" ? 1 : 0) - (b.status === "done" ? 1 : 0));
  }
}
