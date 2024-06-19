import { Employee, IEmployee } from "src/domain/entities/employee";

interface IEmployeeExtended extends IEmployee {
  branchName: string;
}

export class EmployeeMapper {
  static toDTO(employee: Employee): Partial<IEmployeeExtended> {
    return {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      avatar: employee.avatar,
      branchName: employee.branch.name,
    };
  }
}
