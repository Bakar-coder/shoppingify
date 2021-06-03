import { ObjectType, Field } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  image?: string;

  @Field()
  @Column({ default: false })
  featured: boolean;

  @Field()
  @Column({ default: true })
  published: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (u: User) => u.posts)
  @JoinColumn()
  user: User;
}
