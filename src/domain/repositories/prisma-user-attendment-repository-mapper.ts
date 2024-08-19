import { UserAttendment } from "src/domain/entities/user-attendment";
import { PrismaUserRepositoryMapper } from "src/shared/infra/database/prisma/mappers/prisma-user-repository-mapper";

export class PrismaUserAttendmentRepositoryMapper {
  static toDomain(userAttendment: any): UserAttendment {
    return new UserAttendment(
      {
        userId: userAttendment.userId,
        departmentId: userAttendment.departmentId,
        employeeId: userAttendment.employeeId,
        branchId: userAttendment.branchId,
        status: userAttendment.status,
        createdAt: userAttendment.createdAt,
        updatedAt: userAttendment.updatedAt,
        user: userAttendment.user && PrismaUserRepositoryMapper.toDomain(userAttendment.user),
      },
      userAttendment.id,
    );
  }

  static toPersistence(userAttendment: UserAttendment): any {
    return {
      id: userAttendment.id,
      userId: userAttendment.userId,
      departmentId: userAttendment.departmentId,
      employeeId: userAttendment.employeeId,
      branchId: userAttendment.branchId,
      status: userAttendment.status,
      createdAt: userAttendment.createdAt,
      updatedAt: userAttendment.updatedAt,
    };
  }
}
