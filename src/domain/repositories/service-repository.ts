import { Service } from "src/domain/entities/service";

export abstract class ServiceRepository {
  abstract findById(id: string): Promise<Service>;
  abstract findAll(branchId: string): Promise<Service[]>;
}
