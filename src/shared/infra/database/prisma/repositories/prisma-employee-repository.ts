import { Injectable } from "@nestjs/common";
import { Employee } from "src/domain/entities/employee";
import { EmployeeRepository } from "src/domain/repositories/employee-repository";
import { PrismaEmployeeRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-employee-repository-mapper";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

@Injectable()
export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<Employee> {
    const employee = await this.prismaService.employee.findFirst({
      where: { email },
      include: { branch: true },
    });

    return PrismaEmployeeRepositoryMapper.toDomain(employee);
  }
}
