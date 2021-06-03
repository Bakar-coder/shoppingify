import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Cart } from "./Cart";
import { Product } from "./Product";

@Entity()
export class CartItem extends BaseEntity {
  @PrimaryColumn()
  cartId: number;

  @PrimaryColumn()
  productId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn()
  cart: Cart;

  @ManyToOne(() => Product, (prod) => prod.cartItems)
  @JoinColumn()
  product: Product;
}
