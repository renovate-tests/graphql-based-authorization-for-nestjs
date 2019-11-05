import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository, FindConditions, DeleteResult} from "typeorm";
// eslint-disable-next-line import/default
import uuid from "uuid";

import {IAuth} from "./interfaces";
import {UserService} from "../user/user.service";
import {AuthEntity} from "./auth.entity";
import {accessTokenExpiresIn, refreshTokenExpiresIn} from "./auth.constants";


const date = new Date();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authEntityRepository: Repository<AuthEntity>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<any> {
    return this.userService.getByCredentials(email, password);
  }

  public async getUser(email: string): Promise<any> {
    return this.userService.findOne({email});
  }

  public async login(user: any): Promise<IAuth> {
    const {email} = user;

    const refreshToken = uuid.v4();

    await this.authEntityRepository
      .create({
        user,
        refreshToken,
      })
      .save();

    return {
      accessToken: this.jwtService.sign({email}, {expiresIn: accessTokenExpiresIn}),
      refreshToken: refreshToken,
      accessTokenExpiresAt: date.getTime() + accessTokenExpiresIn,
      refreshTokenExpiresAt: date.getTime() + refreshTokenExpiresIn,
    };
  }

  public findOne(where: FindConditions<AuthEntity>): Promise<AuthEntity | undefined> {
    return this.authEntityRepository.findOne({where});
  }

  public async delete(where: FindConditions<AuthEntity>): Promise<DeleteResult> {
    return this.authEntityRepository.delete(where);
  }
}
