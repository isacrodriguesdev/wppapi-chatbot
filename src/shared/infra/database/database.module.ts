import { Module } from "@nestjs/common";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";
import { EmployeeRepository } from "src/domain/repositories/employee-repository";
import { UserAttendmentRepository } from "src/domain/repositories/user-attendment-repository";
import { UserRepository } from "src/domain/repositories/user-repository";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";
import { PrismaAppointmentRepository } from "src/shared/infra/database/prisma/repositories/prisma-appointment-repository";
import { PrismaEmployeeRepository } from "src/shared/infra/database/prisma/repositories/prisma-employee-repository";
import { PrismaUserAttendmentRepository } from "src/shared/infra/database/prisma/repositories/prisma-user-attendment-repository";
import { PrismaUserRepository } from "src/shared/infra/database/prisma/repositories/prisma-user-repository";

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository,
    },
    {
      provide: EmployeeRepository,
      useClass: PrismaEmployeeRepository,
    },
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: UserAttendmentRepository,
      useClass: PrismaUserAttendmentRepository,
    },
  ],
  exports: [AppointmentRepository, EmployeeRepository, UserRepository, UserAttendmentRepository],
})
export class DatabaseModule {}
