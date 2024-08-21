import { Department } from "src/domain/entities/department";

export abstract class BranchDepartmentRepository {
  abstract fetch(branchId: string): Promise<Department[]>;
}
