import { Employee, IEmployee } from "src/domain/entities/employee";

export abstract class EmployeeRepository {
  abstract findByEmail(email: string): Promise<Employee | null>;
  abstract update(id: string, employee: Partial<Omit<IEmployee, "id" | "createdAt">>): Promise<void>;
}
