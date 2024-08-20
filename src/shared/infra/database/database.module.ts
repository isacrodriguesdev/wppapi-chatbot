import { Module } from "@nestjs/common";
import { ScheduleRepository } from "src/domain/repositories/schedule-repository";
import { EmployeeRepository } from "src/domain/repositories/employee-repository";
import { UserAttendmentRepository } from "src/domain/repositories/user-attendment-repository";
import { UserRepository } from "src/domain/repositories/user-repository";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";
import { PrismaScheduleRepository } from "src/shared/infra/database/prisma/repositories/prisma-schedule-repository";
import { PrismaEmployeeRepository } from "src/shared/infra/database/prisma/repositories/prisma-employee-repository";
import { PrismaUserAttendmentRepository } from "src/shared/infra/database/prisma/repositories/prisma-user-attendment-repository";
import { PrismaUserRepository } from "src/shared/infra/database/prisma/repositories/prisma-user-repository";

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: ScheduleRepository,
      useClass: PrismaScheduleRepository,
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
  exports: [ScheduleRepository, EmployeeRepository, UserRepository, UserAttendmentRepository],
})
export class DatabaseModule {}
