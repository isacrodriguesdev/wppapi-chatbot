import { EmployeeRepository } from "src/domain/repositories/employee-repository";
import { Employee, IEmployee } from "src/domain/entities/employee";
import { PrismaEmployeeRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-employee-repository-mapper";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

export class PrismaEmployeeRepository implements EmployeeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<Employee | null> {
    const employee = await this.prisma.employee.findUnique({
      where: { email },
    });

    return PrismaEmployeeRepositoryMapper.toDomain(employee);
  }

  async update(id: string, employee: Partial<Omit<IEmployee, "id" | "createdAt">>): Promise<void> {
    await this.prisma.employee.update({
      where: { id },
      data: {
        email: employee.email,
        password: employee.password,
        phone: employee.phone,
      },
    });
  }
}
