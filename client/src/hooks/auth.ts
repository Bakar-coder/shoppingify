import { SET_USER } from "../context/types";

export const addToCartHandler = (cxt: any, payload: any) => {
  const { setCart, user, cart } = cxt;
  const { id, quantity } = payload;
  const items = user ? cart : localStorage.getItem("cart");
  if (!items) {
    localStorage.setItem("cart", JSON.stringify([payload]));
    return setCart([payload]);
  }

  const cartItems = user ? cart : JSON.parse(items);
  const cartItem = cartItems.find((item: any) => item.id === id);
  let newItems;
  if (cartItem) {
    newItems = cartItems.map((item: any) =>
      item.id === id ? { ...cartItem, quantity } : item
    );
  } else {
    newItems = [...cartItems, payload];
  }

  if (user) setCart(newItems);
  else {
    !user && localStorage.setItem("cart", JSON.stringify(newItems));
    const newCart = user ? newItems : localStorage.getItem("cart");
    newCart && setCart(JSON.parse(newCart));
  }
};

export const removeCartItemHandler = (cxt: any, payload: number) => {
  const { setCart, user, cart } = cxt;

  if (!user) {
    const cartItems = localStorage.getItem("cart");
    if (cartItems) {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          JSON.parse(cartItems).filter((item: any) => item.id !== payload)
        )
      );

      setCart(JSON.parse(cartItems).filter((item: any) => item.id !== payload));
    }
  } else {
    setCart([...cart].filter((item) => item.id !== payload));
  }
};
