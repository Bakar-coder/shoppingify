import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { CartItem } from "./CartItem";

@Entity()
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int4" })
  userId: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: User;

  @OneToMany(() => CartItem, (item) => item.cart)
  cartItems: CartItem[];
}
