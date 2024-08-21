import { UserProfile, IUserProfile } from "src/domain/entities/user-profile";
import { UserProfileRepository } from "src/domain/repositories/user-profile-repository";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

export class PrismaUserProfileRepository implements UserProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(profile: UserProfile): Promise<any> {
    const createdUser = await this.prisma.userProfile.create({
      data: {
        id: profile.id,
        userId: profile.userId,
        email: profile.email,
        cpf: profile.cpf,
        complement: profile.complement,
        street: profile.street,
        neighborhood: profile.neighborhood,
        number: profile.number,
        zipCode: profile.zipCode,
        city: profile.city,
        state: profile.state,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    });
    return createdUser;
  }

  async update(id: string, profile: Partial<IUserProfile>): Promise<any> {
    const updatedUser = await this.prisma.userProfile.update({
      where: { id },
      data: profile,
    });

    return updatedUser;
  }
}
