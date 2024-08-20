import { Department } from "src/domain/entities/department";
import { BranchDepartmentRepository } from "src/domain/repositories/branch-department-repository";
import { prisma } from "src/shared/infra/database/prisma/prisma-service";

export class PrismaBranchDepartmentRepository extends BranchDepartmentRepository {
  async fetch(branchId: string): Promise<Department[]> {
    const departments = await prisma.departmentBranch.findMany({
      where: { branchId },
      select: {
        department: {
          select: { id: true, name: true, description: true, createdAt: true, updatedAt: true },
        },
      },
    });

    return departments.map(
      ({ department }) =>
        new Department(
          {
            name: department.name,
            description: department.description,
            createdAt: department.createdAt,
            updatedAt: department.updatedAt,
          },
          department.id,
        ),
    );
  }
}
