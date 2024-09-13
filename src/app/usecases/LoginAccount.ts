import { Injectable } from "@nestjs/common";
import { UnauthorizedError } from "@/shared/exceptions/unauthorized-error";
import { Authorization } from "@/domain/interfaces/Authorization";
import { PasswordEncryption } from "@/domain/interfaces/PasswordEncryption";
// import { EmployeeRepository } from "@/domain/repositories/employee-repository";

@Injectable()
export class LoginAccount {
  constructor(
    private readonly authorization: Authorization,
    private readonly passwordEncryption: PasswordEncryption,
    // private readonly employeeRepository: EmployeeRepository,
  ) {}

  async execute(email: string, password: string): Promise<any> {
    // const employee = await this.employeeRepository.findByEmail(email);
    // if (!employee) {
    //   throw new UnauthorizedError();
    // }
    // const passwordMatch = await this.passwordEncryption.compare(password, employee.password);
    // if (!passwordMatch) {
    //   throw new UnauthorizedError();
    // }
    // const token = await this.authorization.sign(
    //   { id: employee.user.id, email: employee.email, branchId: employee.branchId },
    //   "365d",
    // );
    // return {
    //   employee: employee.serialize(),
    //   token,
    // };
  }
}
