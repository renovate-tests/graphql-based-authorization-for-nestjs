import {Args, Mutation, Resolver} from "@nestjs/graphql";
import {NotFoundException, UnauthorizedException} from "@nestjs/common";

import {AuthTokens} from "./types";
import {UserService} from "../user/user.service";
import {Public} from "../common/decorators";
import {AuthService} from "./auth.service";
import {refreshTokenExpiresIn} from "./auth.constants";


const date = new Date();

@Resolver(() => AuthTokens)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Public()
  @Mutation(_returns => AuthTokens)
  async login(@Args("email") email: string, @Args("password") password: string): Promise<AuthTokens> {
    const user = await this.userService.getByCredentials(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.authService.login(user);
  }

  @Public()
  @Mutation(_returns => AuthTokens)
  async refreshToken(@Args("refreshToken") refreshToken: string): Promise<AuthTokens> {
    const authEntity = await this.authService.findOne({refreshToken});

    if (!authEntity || new Date(authEntity.createdAt).getTime() - date.getTime() > refreshTokenExpiresIn) {
      throw new NotFoundException();
    }

    return this.authService.login(authEntity.user);
  }

  @Mutation(_returns => Boolean)
  async logout(@Args("refreshToken") refreshToken: string): Promise<boolean> {
    await this.authService.delete({refreshToken});
    return true;
  }
}
