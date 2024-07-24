import { Injectable } from "@nestjs/common";
import { UnauthorizedError } from "src/shared/exceptions/unauthorized-error";
import { Authorization } from "src/domain/interfaces/authorization";
import { PasswordEncryption } from "src/domain/interfaces/password-encryption";
import { EmployeeRepository } from "src/domain/repositories/employee-repository";
import { EmployeeMapper } from "src/shared/infra/mappers/employee-mapper";

@Injectable()
export class LoginAccount {
  constructor(
    private readonly authorization: Authorization,
    private readonly passwordEncryption: PasswordEncryption,
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async execute(email: string, password: string): Promise<any> {
    const employee = await this.employeeRepository.findByEmail(email);

    if (!employee) {
      throw new UnauthorizedError();
    }

    const passwordMatch = await this.passwordEncryption.compare(password, employee.password);

    if (!passwordMatch) {
      throw new UnauthorizedError();
    }

    const token = await this.authorization.sign(
      { id: employee.id, email: employee.email, branchId: employee.branchId, companyId: employee.companyId },
      "365d",
    );

    return {
      employee: EmployeeMapper.toDTO(employee),
      token,
    };
  }
}
