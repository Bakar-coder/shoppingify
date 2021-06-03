import React, { FC } from "react";
import Link from "next/link";
import router from "next/router";
import { useUserQuery, useLogoutMutation } from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";

interface SideNavTypes {
  nav: boolean;
  toggleNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNav: FC<SideNavTypes> = ({ nav, toggleNav }) => {
  const [{ data }] = useUserQuery({ pause: isServer() });
  const [, logout] = useLogoutMutation();
  const user = data?.user?.user;
  return (
    <div className={nav ? "side__nav__open" : "side__nav"}>
      <div className="side__nav__content">
        <div className="menu">
          <i className="ion-close-circled" onClick={() => toggleNav(!nav)} />
        </div>
        <ul className="list">
          <li
            className="list__item"
            onClick={() => router.push("/") && toggleNav(!nav)}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className="list__item"
            onClick={() => router.push("/shop") && toggleNav(!nav)}
          >
            <Link href="/shop">Shop</Link>
          </li>
          <li
            className="list__item"
            onClick={() => router.push("/shop/cart") && toggleNav(!nav)}
          >
            <Link href="/cart">Cart</Link>
          </li>
          <li
            className="list__item"
            onClick={() => router.push("/checkout") && toggleNav(!nav)}
          >
            <Link href="/checkout">Checkout</Link>
          </li>
          {user && (
            <li className="list__item avatar">
              <Link href={`/users/profile/${user.id}`}>
                <a>
                  <img className="avatar" src={user.avatar} alt="" />
                  <span>
                    {user.firstName.split("")[0].toUpperCase() +
                      "-" +
                      user.lastName.split("")[0].toUpperCase() +
                      user.lastName.split("").slice(1).join("").toLowerCase()}
                  </span>
                </a>
              </Link>
            </li>
          )}
          {user && (
            <li
              className="list__item"
              onClick={async () => (await logout()) && router.reload()}
            >
              <i className="ion-log-out " />
              <Link href="/">Logout</Link>
            </li>
          )}
          {!user && (
            <li
              className="list__item"
              onClick={() =>
                router.push("/users/auth/register") && toggleNav(!nav)
              }
            >
              <Link href="/users/auth/register">SignUp</Link>
              <i className="ion-android-person-add" />
            </li>
          )}
          {!user && (
            <li
              className="list__item"
              onClick={() =>
                router.push("/users/auth/login") && toggleNav(!nav)
              }
            >
              <Link href="/users/auth/login">Sigin In</Link>
              <i className="ion-log-in" />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
