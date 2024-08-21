import { IEmployee } from "src/domain/entities/employee";
import { EmployeeRepository } from "src/domain/repositories/employee-repository";

export class UpdateEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(id: string, employee: Partial<IEmployee>): Promise<void> {
    await this.employeeRepository.update(id, employee);
  }
}
