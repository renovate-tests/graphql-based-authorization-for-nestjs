import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {UserEntity} from "../user/user.entity";


@Entity({schema: "test", name: "auth"})
export class AuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({type: "varchar"})
  public refreshToken: string;

  @JoinColumn()
  @OneToOne(_type => UserEntity, {
    eager: true,
  })
  public user: UserEntity;

  @Column({type: "timestamptz"})
  public createdAt: string;

  @BeforeInsert()
  public beforeInsert(): void {
    this.createdAt = new Date().toISOString();
  }
}
