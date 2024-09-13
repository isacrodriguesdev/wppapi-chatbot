import { Branch, IBranch } from "@/domain/entities/Branch";
import { Authorization } from "@/domain/interfaces/Authorization";
import BranchRepository from "@/domain/repositories/BranchRepository";
import NotFoundError from "@/shared/exceptions/NotFoundError";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class GetBranchById {
  constructor(
    private branchRepository: BranchRepository,
    private readonly authorization: Authorization,
  ) {}

  async execute(id: string): Promise<any> {
    const branch = await this.branchRepository.find(id);

    if (!branch) {
      throw new NotFoundError();
    }

    const token = await this.authorization.sign(
      {
        branchId: branch.id,
        companyId: branch.companyId,
      },
      "30d",
    );

    return {
      branch: branch.serialize(),
      token,
    };
  }
}
