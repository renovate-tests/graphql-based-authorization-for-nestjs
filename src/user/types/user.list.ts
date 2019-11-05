import {Field, ObjectType} from "type-graphql";
import {UserEntity} from "../user.entity";


@ObjectType()
export class UserListType {
  @Field(_type => [UserEntity])
  public list: UserEntity[];

  @Field()
  public count: number;
}
