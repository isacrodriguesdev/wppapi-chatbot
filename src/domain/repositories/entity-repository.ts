export abstract class EntityRepository<T> {
  abstract create(entity: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<T>;
  abstract findAll(): Promise<T[]>;
}
