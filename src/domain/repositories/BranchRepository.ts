import { Branch } from "@/domain/entities/Branch";

export default abstract class BranchRepository {
  abstract find(id: string): Promise<Branch | null>;
}
