import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { Post } from "./Post";
import { Product } from "./Product";
import { Review } from "./Review";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int!)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  avatar: string;

  @Column()
  password: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  admin: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  seller: boolean;

  @Field(() => Boolean, { nullable: true })
  @Column({ default: false })
  verified: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToMany(() => Product, (prod) => prod.user)
  products: Product[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Review, (rev) => rev.user)
  reviews: Review[];
}
