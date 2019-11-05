import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType, registerEnumType} from "type-graphql";
import {IUser, UserRole} from "./interfaces";


registerEnumType(UserRole, {
  name: "UserRole",
});

@ObjectType()
@Entity({schema: "test", name: "user"})
export class UserEntity extends BaseEntity implements IUser {
  @Field(_type => Int)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column({type: "varchar"})
  public email: string;

  @Column({type: "varchar", select: false})
  public password: string;

  @Field(_type => [UserRole])
  @Column({
    type: "enum",
    enum: UserRole,
    array: true,
  })
  public roles: UserRole[];
}
