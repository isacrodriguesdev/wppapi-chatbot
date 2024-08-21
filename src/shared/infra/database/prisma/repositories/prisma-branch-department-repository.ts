import { Department } from "src/domain/entities/department";
import { BranchDepartmentRepository } from "src/domain/repositories/branch-department-repository";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

export class PrismaBranchDepartmentRepository implements BranchDepartmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async fetch(branchId: string): Promise<Department[]> {
    const departments = await this.prisma.departmentBranch.findMany({
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
