import { UserDetails } from "src/domain/entities/user-details";

export class PrismaUserDetailsRepositoryMapper {
  static toDomain(details: any): UserDetails {
    return new UserDetails(
      {
        userId: details.userId,
        complement: details?.complement,
        neighborhood: details?.neighborhood,
        street: details?.street,
        city: details?.city,
        cpf: details?.cpf,
        email: details?.email,
        number: details?.number,
        state: details?.state,
        zipCode: details?.zipCode,
        createdAt: details.createdAt,
        updatedAt: details.updatedAt,
      },
      details.id,
    );
  }

  static toPersistence(details: UserDetails): any {
    return {
      id: details.id,
      userId: details.userId,
      complement: details?.complement,
      neighborhood: details?.neighborhood,
      street: details?.street,
      city: details?.city,
      cpf: details?.cpf,
      email: details?.email,
      number: details?.number,
      state: details?.state,
      zipCode: details?.zipCode,
      updatedAt: details.updatedAt,
      createdAt: details.createdAt,
    };
  }
}
