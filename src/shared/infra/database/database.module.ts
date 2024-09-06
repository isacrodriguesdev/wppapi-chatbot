import { Module } from "@nestjs/common";
import { ScheduleRepository } from "src/domain/repositories/schedule-repository";
import { EmployeeRepository } from "src/domain/repositories/employee-repository";
import { UserRepository } from "src/domain/repositories/user-repository";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";
import { PrismaScheduleRepository } from "src/shared/infra/database/prisma/repositories/prisma-schedule-repository";
import { PrismaEmployeeRepository } from "src/shared/infra/database/prisma/repositories/prisma-employee-repository";
import { PrismaUserRepository } from "src/shared/infra/database/prisma/repositories/prisma-user-repository";
import { TicketRepository } from "src/domain/repositories/ticket-repository";
import { PrismaTicketRepository } from "src/shared/infra/database/prisma/repositories/prisma-ticket-repository";
import { PrismaTicketMessageRepository } from "src/shared/infra/database/prisma/repositories/prisma-ticket-message-repository";
import { TicketMessageRepository } from "src/domain/repositories/ticket-message-repository";

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
      provide: TicketRepository,
      useClass: PrismaTicketRepository,
    },
    {
      provide: TicketMessageRepository,
      useClass: PrismaTicketMessageRepository,
    },
  ],
  exports: [ScheduleRepository, EmployeeRepository, UserRepository, TicketRepository, TicketMessageRepository],
})
export class DatabaseModule {}
