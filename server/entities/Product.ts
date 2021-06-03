import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  userId: number;

  @Field()
  @Column()
  category: string;

  @Field()
  @Column({ unique: true })
  title: string;

  @Field(() => Int)
  @Column()
  stock: number;

  @Field()
  @Column({ type: "numeric" })
  price: number;

  @Field()
  @Column({ type: "text" })
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  discount?: number;

  @Field(() => String, { nullable: true })
  @Column({ default: null, nullable: true })
  discountExpiration?: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  tags?: string;

  @Field()
  @Column({ type: "text" })
  images: string;

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

  @OneToMany(() => CartItem, (items) => items.product)
  cartItems: CartItem[];

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn()
  user: User;
}
