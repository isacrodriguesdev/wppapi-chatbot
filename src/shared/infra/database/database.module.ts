import { Module } from "@nestjs/common";
import { AppointmentRepository } from "src/domain/repositories/appointment-repository";
import { EmployeeRepository } from "src/domain/repositories/employee-repository";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";
import { PrismaAppointmentRepository } from "src/shared/infra/database/prisma/repositories/prisma-appointment-repository";
import { PrismaEmployeeRepository } from "src/shared/infra/database/prisma/repositories/prisma-employee-repository";

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
  ],
  exports: [AppointmentRepository, EmployeeRepository],
})
export class DatabaseModule {}
