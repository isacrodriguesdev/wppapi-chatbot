import { Appointment, IAppointment } from "src/domain/entities/appointment";
import { IService } from "src/domain/entities/service";
import { IUser } from "src/domain/entities/user";
import { ServiceMapper } from "src/shared/infra/mappers/service-mapper";
import { UserMapper } from "src/shared/infra/mappers/user-mapper";

export class AppointmentMapper {
  static toDTO(appointment: Appointment): Partial<IAppointment> {
    return {
      id: appointment.id,
      status: appointment.status,
      userId: appointment.userId,
      companyId: appointment.companyId,
      serviceId: appointment.serviceId,
      branchId: appointment.branchId,
      date: appointment.date,
      service: ServiceMapper.toDTO(appointment.service) as IService,
      user: UserMapper.toDTO(appointment.user) as IUser,
      // branch: appointment.branch,
    };
  }
}
