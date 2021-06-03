import React, { FC, useContext, useEffect, useState } from "react";
import { authContext } from "../../../context/auth/context";
import { shopContext } from "../../../context/shop/context";
import {
  CartItemType,
  useProductsQuery,
  useUserQuery,
} from "../../../generated/graphql";
import { addToCartHandler } from "../../../hooks/auth";
import { isServer } from "../../../utils/isServer";
import HeaderMiddle from "./middle";
import Nav from "./nav";
import Top from "./top";

interface indexTypes {
  nav: boolean;
  toggleNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: FC<indexTypes> = ({ nav, toggleNav }) => {
  const [{ data, fetching }] = useUserQuery({ pause: isServer() });
  const { user, setCart, setUser, cart } = useContext(authContext);
  const items = !isServer() && localStorage.getItem("cart");
  const cartItems = data?.user?.cart
    ? data?.user?.cart
    : items
    ? JSON.parse(items)
    : [];

  useEffect(() => {
    if (!fetching && data?.user?.user && !user) setUser(data?.user?.user);
    if (!fetching && !cart) setCart(cartItems);
  }, []);

  return (
    <>
      <Top />
      <HeaderMiddle />
      <Nav nav={nav} toggleNav={toggleNav} />
    </>
  );
};

export default Header;
