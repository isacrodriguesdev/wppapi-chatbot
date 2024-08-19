import { IEmployee } from "src/domain/entities/employee";
import { EmployeeRepository } from "src/domain/repositories/employee-repository";

export class UpdateEmployee {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(employee: Partial<IEmployee>): Promise<void> {
    await this.employeeRepository.update(employee);
  }
}
