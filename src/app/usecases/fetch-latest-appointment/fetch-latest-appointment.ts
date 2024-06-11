import { Injectable } from "@nestjs/common";
import { Appointment } from "src/domain/entities/appointment";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";

@Injectable()
export class FetchLatestAppointment {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(branchId: string): Promise<Appointment[]> {
    // Pegar as datas de segunda a domingo da semana atual
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Ajustar se o dia for domingo
    const monday = new Date(today.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(sunday.getDate() + 6);

    const appointments = await this.appointmentRepository.fetchByRangeDate(branchId, monday, sunday);

    // Ordenar os agendamentos por data para que os do dia atual fiquem no topo
    appointments.sort((a, b) => {
      const aDate = new Date(a.date).getTime();
      const bDate = new Date(b.date).getTime();
      const todayDate = new Date().setHours(0, 0, 0, 0);

      if (aDate === todayDate && bDate !== todayDate) return -1;
      if (aDate !== todayDate && bDate === todayDate) return 1;
      return aDate - bDate;
    });

    return appointments.filter((appointment) => appointment.status !== "canceled");
  }
}
