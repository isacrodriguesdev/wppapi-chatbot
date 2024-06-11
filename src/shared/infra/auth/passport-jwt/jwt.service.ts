import { Injectable } from "@nestjs/common";
import { JwtService as NestJwtService } from "@nestjs/jwt";
import { Authorization } from "src/domain/interfaces/authorization";

@Injectable()
export class JwtService extends Authorization {
  constructor(private readonly nestJwtService: NestJwtService) {
    super();
  }

  async sign(payload: any, expiresIn: string): Promise<string> {
    return this.nestJwtService.sign(payload, { expiresIn });
  }

  async validate<T>(token: string): Promise<T> {
    try {
      this.nestJwtService.verify(token) as T;
      return this.decode<T>(token);
    } catch (error) {
      return null;
    }
  }

  async decode<T>(token: string): Promise<T> {
    return this.nestJwtService.decode(token) as T;
  }
}
