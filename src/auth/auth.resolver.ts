import {Args, Mutation, Resolver} from "@nestjs/graphql";

import {AuthType} from "./types";
import {UserService} from "../user/user.service";
import {Public} from "../common/decorators";
import {AuthService} from "./auth.service";
import {IAuth} from "./interfaces";


@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {
  }

  @Public()
  @Mutation(_returns => AuthType)
  async login(@Args("email") email: string, @Args("password") password: string): Promise<IAuth> {
    return this.authService.login({email, password});
  }

  @Public()
  @Mutation(_returns => AuthType)
  async refreshToken(@Args("refreshToken") refreshToken: string): Promise<IAuth> {
    return this.authService.refresh({refreshToken});
  }

  @Mutation(_returns => Boolean)
  async logout(@Args("refreshToken") refreshToken: string): Promise<boolean> {
    await this.authService.delete({refreshToken});
    return true;
  }

  @Public()
  @Mutation(_returns => AuthType)
  async signup(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<IAuth> {
    const user = await this.userService.create({email, password});
    return this.authService.loginUser(user);
  }
}
