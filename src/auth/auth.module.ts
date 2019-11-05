import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from "@nestjs/typeorm";

import {AuthService} from "./auth.service";
import {JwtStrategy} from "./jwt.strategy";
import {UserModule} from "../user/user.module";
import {AuthResolver} from "./auth.resolver";
import {AuthEntity} from "./auth.entity";
import {accessTokenExpiresIn} from "./auth.constants";

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: accessTokenExpiresIn,
      },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
