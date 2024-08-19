import { UserAttendment, IUserAttendment } from "src/domain/entities/user-attendment";

export abstract class UserAttendmentRepository {
  abstract create(userAttendment: UserAttendment): Promise<void>;
  abstract fetch(companyId: string, status?: IUserAttendment.Status): Promise<UserAttendment[]>;
  abstract fetchByUserId(userId: string, status?: IUserAttendment.Status): Promise<UserAttendment[]>;
  abstract find(id: string): Promise<UserAttendment>;
  abstract open(id: string): Promise<void>;
  abstract close(id: string): Promise<void>;
}
