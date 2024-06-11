import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { Authorization } from "src/domain/interfaces/authorization";
import { JwtStrategy } from "src/shared/infra/auth/passport-jwt/jwt.strategy";
import { JwtService } from "src/shared/infra/auth/passport-jwt/jwt.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Secret key
    }),
  ],
  controllers: [],
  providers: [
    JwtStrategy,
    {
      provide: Authorization,
      useClass: JwtService,
    },
  ],
  exports: [Authorization],
})
export class AuthModule {}
