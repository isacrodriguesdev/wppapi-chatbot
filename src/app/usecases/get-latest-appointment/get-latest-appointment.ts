import { Injectable } from "@nestjs/common";
import { Appointment, IAppointment } from "src/domain/entities/appointment";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";
import { NotFoundError } from "src/shared/exceptions/not-found-error";

@Injectable()
export class GetLatestAppointment {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(branchId: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.getLatest(branchId, IAppointment.Status.SCHEDULED);
    if (!appointment) {
      throw new NotFoundError();
    }

    return appointment;
  }
}
