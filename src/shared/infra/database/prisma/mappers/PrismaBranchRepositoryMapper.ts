import { BaseEntity } from "@/domain/entities/BaseEntity";
import { Branch } from "@/domain/entities/Branch";

export class PrismaBranchRepositoryMapper {
  static toDomain(branch: any): Branch {
    return new Branch(
      {
        name: branch.name,
        active: branch.active,
        address: branch.address,
        coordinates: branch.coordinates,
        phone: branch.phone,
        createdAt: branch.createdAt,
        updatedAt: branch.updatedAt,
        companyId: BaseEntity.fromBuffer(branch.companyId),
      },
      BaseEntity.fromBuffer(branch.id),
    );
  }
}
