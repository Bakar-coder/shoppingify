import { SET_CART, SET_USER } from "../types";
import { auth } from "../types/auth";

export const AuthReducer = (state: auth, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      return { ...state, user: payload };

    case SET_CART:
      return { ...state, cart: payload };

    default:
      return state;
  }
};
