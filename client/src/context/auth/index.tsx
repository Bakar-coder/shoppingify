import React, { useReducer } from "react";
import { CartItemType, User, UserType } from "../../generated/graphql";
import { SET_CART, SET_USER } from "../types";
import { authContext } from "./context";
import { AuthReducer } from "./reducer";
import { preloadedState } from "./state";
interface propTypes {}

const AuthState: React.FC<propTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, preloadedState);
  const { Provider } = authContext;
  const setUser = (user: User) =>
    dispatch && dispatch({ type: SET_USER, payload: user });
  const setCart = (cart: [CartItemType]) =>
    dispatch && dispatch({ type: SET_CART, payload: cart });

  return <Provider value={{ ...state, setUser, setCart }}>{children}</Provider>;
};

export default AuthState;
