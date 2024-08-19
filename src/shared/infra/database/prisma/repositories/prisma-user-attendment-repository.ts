import { UserAttendment } from "src/domain/entities/user-attendment";
import { IUserAttendment } from "src/domain/entities/user-attendment";
import { PrismaUserAttendmentRepositoryMapper } from "src/domain/repositories/prisma-user-attendment-repository-mapper";
import { UserAttendmentRepository } from "src/domain/repositories/user-attendment-repository";
import { PrismaService } from "src/shared/infra/database/prisma/prisma.service";

export class PrismaUserAttendmentRepository implements UserAttendmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(userAttendment: UserAttendment): Promise<void> {
    await this.prisma.userAttendment.create({
      data: PrismaUserAttendmentRepositoryMapper.toPersistence(userAttendment),
    });
  }

  async fetchByUserId(
    userId: string,
    status: IUserAttendment.Status = IUserAttendment.Status.OPEN,
  ): Promise<UserAttendment[]> {
    const userAttendment = await this.prisma.userAttendment.findMany({
      where: { userId, status },
    });

    return userAttendment.map(PrismaUserAttendmentRepositoryMapper.toDomain);
  }

  async fetch(
    companyId: string,
    status: IUserAttendment.Status = IUserAttendment.Status.OPEN,
  ): Promise<UserAttendment[]> {
    const userAttendment = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: {
        branchs: {
          include: {
            userAttendments: {
              where: { status },
              include: {
                user: {
                  select: { id: true, name: true, phone: true },
                },
              },
            },
          },
        },
      },
    });

    return userAttendment.branchs.flatMap((branch) => {
      return branch.userAttendments.map(PrismaUserAttendmentRepositoryMapper.toDomain);
    });
  }

  async find(id: string): Promise<UserAttendment> {
    const userAttendment = await this.prisma.userAttendment.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, name: true, phone: true },
        },
      },
    });

    return PrismaUserAttendmentRepositoryMapper.toDomain(userAttendment);
  }

  async open(id: string): Promise<void> {
    await this.prisma.userAttendment.update({
      where: { id },
      data: { status: IUserAttendment.Status.OPEN },
    });
  }

  async close(id: string): Promise<void> {
    await this.prisma.userAttendment.update({
      where: { id },
      data: { status: IUserAttendment.Status.CLOSED },
    });
  }
}
