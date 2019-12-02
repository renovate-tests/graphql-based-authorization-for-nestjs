import {Field, ObjectType} from "type-graphql";
import {UserType} from ".";


@ObjectType()
export class UserListType {
  @Field(_type => [UserType])
  public list: UserType[];

  @Field()
  public count: number;
}
