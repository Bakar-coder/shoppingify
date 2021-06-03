import { getConnection } from "typeorm";
import { CartItemType } from "../types/cart";
import { CartItem } from "../entities/CartItem";

export const getCart = async (cartId: number): Promise<CartItemType[]> => {
  const cartItems: CartItemType[] = [];
  const cart = await getConnection().manager.find(CartItem, {
    where: { cartId },
    relations: ["product"],
  });

  cart.forEach((item) =>
    cartItems.push({
      productId: item.productId,
      title: item.product.title,
      description: item.product.description,
      discount: item.product.discount,
      price: item.product.price,
      images: item.product.images,
      quantity: item.quantity,
    } as CartItemType)
  );

  return cartItems;
};
