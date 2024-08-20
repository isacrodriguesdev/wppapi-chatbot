import { UserProfile } from "src/domain/entities/user-profile";

export class PrismaUserProfileRepositoryMapper {
  static toDomain(profile: any): UserProfile {
    return new UserProfile(
      {
        userId: profile.userId,
        complement: profile?.complement,
        neighborhood: profile?.neighborhood,
        street: profile?.street,
        city: profile?.city,
        cpf: profile?.cpf,
        email: profile?.email,
        number: profile?.number,
        state: profile?.state,
        zipCode: profile?.zipCode,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
      profile.id,
    );
  }

  static toPersistence(profile: UserProfile): any {
    return {
      id: profile.id,
      userId: profile.userId,
      complement: profile?.complement,
      neighborhood: profile?.neighborhood,
      street: profile?.street,
      city: profile?.city,
      cpf: profile?.cpf,
      email: profile?.email,
      number: profile?.number,
      state: profile?.state,
      zipCode: profile?.zipCode,
      updatedAt: profile.updatedAt,
      createdAt: profile.createdAt,
    };
  }
}
