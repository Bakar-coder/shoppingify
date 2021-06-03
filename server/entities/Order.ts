import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItem";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Order extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: "int4" })
  userId: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderItem, (item) => item.order)
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn()
  user: User;
}
