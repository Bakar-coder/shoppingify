import React, { FC, useRef } from "react";
import { useRouter } from "next/router";
import _ from "lodash";
import { useUserQuery } from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";

interface middleTypes {}

const HeaderMiddle: FC<middleTypes> = ({}) => {
  const router = useRouter();
  const term = useRef("");
  const items = !isServer() && localStorage.getItem("cart");
  const [{ data }] = useUserQuery({ pause: isServer() });
  const cart = data?.user?.cart
    ? data?.user?.cart
    : items
    ? JSON.parse(items)
    : [];

  const handleChange = _.debounce(() => {
    const searchTerm = term.current["value" as any];
    console.log(searchTerm);
  }, 500);

  return (
    <section className="header__middle">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-12">
            <div className="logo">
              <h3>LOGO</h3>
            </div>
          </div>
          <div className="col-lg-4 col-12">
            <input
              type="text"
              className="search"
              placeholder="Search..."
              ref={term as any}
              onChange={handleChange}
            />
            <span className="search-icon">
              <i className="ion-ios-search" />
            </span>
          </div>
          <div className="col-lg-4 col-12">
            <div className="cart" onClick={() => router.push(`/shop/cart`)}>
              <i className="ion-android-cart" />
              {cart && cart.length > 0 ? (
                <sup>{cart.length}</sup>
              ) : (
                <sup>0</sup>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderMiddle;
