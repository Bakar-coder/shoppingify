import {
  SET_PRODUCT,
  SET_PRODUCTS,
  SET_CART_TOTAL,
  SET_TOTAL_DISCOUNT,
} from "../types";
import { shop } from "../types/shop";

export const ShopReducer = (state: shop, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PRODUCTS:
      return { ...state, products: payload };
    case SET_PRODUCT:
      return { ...state, product: payload };
    case SET_CART_TOTAL:
      return { ...state, cartTotal: payload };
    case SET_TOTAL_DISCOUNT:
      return { ...state, totalDiscount: payload };
    default:
      return state;
  }
};
