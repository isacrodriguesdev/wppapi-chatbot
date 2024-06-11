import { Injectable } from "@nestjs/common";
import { IAppointment } from "src/domain/entities/appointment";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";
import { NotFoundError } from "src/shared/exceptions/not-found-error";

@Injectable()
export class UpdateAppointment {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(id: string, data: Partial<IAppointment>): Promise<void> {
    const appointment = await this.appointmentRepository.findById(id);

    if (!appointment) {
      throw new NotFoundError();
    }

    await this.appointmentRepository.update(appointment.id, data);
  }
}
