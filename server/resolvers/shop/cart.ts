import { Arg, Ctx, Mutation, Int, Resolver, Query } from "type-graphql";
import { CartItem } from "../../entities/CartItem";
import { getConnection } from "typeorm";
import { appContext } from "../../context";
import { getCart } from "../../utils/getCart";
import { UserType } from "../../types/user";
import { User } from "../../entities/User";

@Resolver()
export class CartResolver {
  @Query(() => UserType)
  async getCart(@Ctx() { res }: appContext): Promise<UserType> {
    const cartId = res.locals.user.cart.id;
    const cart = await getCart(cartId);
    return { user: res.locals.user, cart };
  }

  @Mutation(() => UserType)
  async addToCart(
    @Ctx() { res }: appContext,
    @Arg("productId", () => Int!) productId: number,
    @Arg("quantity", () => Int!) quantity: number
  ): Promise<UserType> {
    let newQuantity = quantity ? quantity : 1;
    const user = await getConnection().manager.findOne(
      User,
      res.locals.user.id,
      { relations: ["cart"] }
    );

    let cart = await getCart(user!.cart.id);
    const [item] = cart.filter((item) => item.id === productId);

    if (!item) {
      const newItem = await CartItem.create({
        cartId: user!.cart.id,
        productId,
        quantity: newQuantity,
      }).save();

      cart = await getCart(newItem.cartId);
      return { user, cart };
    }

    const newItem = await CartItem.findOne({
      where: { cartId: user?.cart.id, productId: item.id },
    });
    newItem!.quantity = quantity;
    await newItem?.save();
    cart = await getCart(user!.cart.id);
    return { user, cart };
  }

  @Mutation(() => [UserType])
  async decrementCartItem(
    @Ctx() { res }: appContext,
    @Arg("productId", () => Int!) productId: number,
    @Arg("quantity", () => Int!) quantity: number
  ): Promise<UserType> {
    const user = await getConnection().manager.findOne(
      User,
      res.locals.user.id,
      { relations: ["cart"] }
    );
    const cartId = user!.cart.id;
    let cart = await getCart(cartId);
    const [item] = cart.filter((item) => item.id === productId);
    item.quantity = quantity ? quantity : item.quantity - 1;
    await item.save();
    return {
      user,
      cart: cart.map((i) => (i.id === item.id ? item : i)),
    };
  }

  @Mutation(() => UserType)
  async removeCartItem(
    @Ctx() { res }: appContext,
    @Arg("productId", () => Int!) productId: number
  ): Promise<UserType> {
    let user = await getConnection().manager.findOne(User, res.locals.user.id, {
      relations: ["cart"],
    });
    const cartId = user!.cart.id;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where('"cartId" = :cartId', { cartId })
      .andWhere('"productId" = :productId', { productId })
      .execute();
    const cart = await getCart(cartId);
    return { user, cart };
  }

  @Mutation(() => Boolean)
  async clearCart(@Ctx() { res }: appContext): Promise<boolean> {
    const cartId = res.locals.user.cartId;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(CartItem)
      .where('"cartId" = :cartId', { cartId })
      .execute();

    return true;
  }
}
