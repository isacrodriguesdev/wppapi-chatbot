import { Branch } from "src/domain/entities/branch";
import { Company } from "src/domain/entities/company";

export abstract class CompanyRepository {
  abstract findById(companyId: string): Promise<Company>;
  abstract fetchBranches(companyId: string): Promise<Branch[]>;
}
