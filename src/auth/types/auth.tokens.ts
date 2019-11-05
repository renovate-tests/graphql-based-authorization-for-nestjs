import {Field, ObjectType} from "type-graphql";
import {IAuth} from "../interfaces";

@ObjectType()
export class AuthTokens implements IAuth {
  @Field()
  public accessToken: string;

  @Field()
  public refreshToken?: string;

  @Field()
  public accessTokenExpiresAt: number;

  @Field()
  public refreshTokenExpiresAt?: number;
}
