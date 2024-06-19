import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";

@Injectable()
export class FetchAnalyticalData {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(branchId: string): Promise<any> {
    const startDate = new Date();
    startDate.setDate(5);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    const appointments = await this.appointmentRepository.fetchByRangeDate(branchId, startDate, endDate);
    const totalAppointments = appointments.filter((appointment) => appointment.status !== "canceled").length;
    const totalCanceledAppointments = appointments.filter((appointment) => appointment.status === "canceled").length;
    const totalDoneAppointments = appointments.filter((appointment) => appointment.status === "done").length;

    const invoicing = appointments
      .filter((appointment) => appointment.status === "done")
      .reduce((total, appointment) => {
        return total + appointment.service.price;
      }, 0);

    return {
      totalAppointments,
      totalCanceledAppointments,
      totalDoneAppointments,
      invoicing,
    };
  }
}
