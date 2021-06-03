import React, { useReducer } from "react";
import { SET_CART_TOTAL, SET_TOTAL_DISCOUNT } from "../types";
import { shopContext } from "./context";
import { ShopReducer } from "./reducer";
import { preloadedState } from "./state";
interface propTypes {}

const ShopState: React.FC<propTypes> = ({ children }) => {
  const [state, dispatch] = useReducer(ShopReducer, preloadedState);
  const { Provider } = shopContext;
  const setCartTotal = (total: number) =>
    dispatch && dispatch({ type: SET_CART_TOTAL, payload: total });
  const setDiscount = (discount: number) =>
    dispatch && dispatch({ type: SET_TOTAL_DISCOUNT, payload: discount });

  return (
    <Provider value={{ ...state, setCartTotal, setDiscount }}>
      {children}
    </Provider>
  );
};

export default ShopState;
