import {Test, TestingModule} from "@nestjs/testing";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtModule} from "@nestjs/jwt";

import {AuthService} from "./auth.service";
import {JwtStrategy} from "./jwt.strategy";
import {UserModule} from "../user/user.module";
import ormconfig from "../ormconfig";
import {AuthEntity} from "./auth.entity";
import {accessTokenExpiresIn} from "./auth.constants";


describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormconfig),
        TypeOrmModule.forFeature([AuthEntity]),
        UserModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET_KEY,
          signOptions: {
            expiresIn: accessTokenExpiresIn,
          },
        }),
      ],
      providers: [AuthService, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
