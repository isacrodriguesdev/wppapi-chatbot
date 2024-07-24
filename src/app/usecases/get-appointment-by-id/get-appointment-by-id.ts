import { Injectable } from "@nestjs/common";
import { Appointment } from "src/domain/entities/appointment";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";
import { NotFoundError } from "src/shared/exceptions/not-found-error";

@Injectable()
export class GetAppointmentById {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new NotFoundError();
    }

    return appointment;
  }
}
