import { Employee } from "src/domain/entities/employee";

export abstract class EmployeeRepository {
  abstract findByEmail(email: string): Promise<Employee>;
}
