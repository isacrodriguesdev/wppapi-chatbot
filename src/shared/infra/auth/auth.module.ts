import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { Authorization } from "@/domain/interfaces/Authorization";
import { JwtStrategy } from "@/shared/infra/auth/passport-jwt/jwt.strategy";
import { JwtService } from "@/shared/infra/auth/passport-jwt/jwt.service";

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
