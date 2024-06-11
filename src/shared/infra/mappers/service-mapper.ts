import { IService, Service } from "src/domain/entities/service";

export class ServiceMapper {
  static toDTO(service: Service): Partial<IService> {
    return {
      id: service.id,
      name: service.name,
      duration: service.duration,
      price: service.price,
    };
  }
}
