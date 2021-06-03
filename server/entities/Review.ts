import { ObjectType, Field } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  userId: number

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn()
  user: User

}