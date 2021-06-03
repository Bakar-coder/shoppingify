import React, { FC, useContext } from "react";
import Link from "next/link";
import {
  useLogoutMutation,
  useUserQuery,
  useUsersQuery,
} from "../../../generated/graphql";
import router from "next/router";
import { authContext } from "../../../context/auth/context";
import { isServer } from "../../../utils/isServer";

interface navTypes {
  nav: boolean;
  toggleNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Nav: FC<navTypes> = ({ nav, toggleNav }) => {
  const [, logout] = useLogoutMutation();
  const [{ data }] = useUserQuery({ pause: isServer() });
  const user = data?.user?.user;

  return (
    <nav className="navbar">
      <div className="container-fluid navbar__content">
        <div className="log">
          <Link href="/">
            <a>{/* <h3>SHOP</h3> */}</a>
          </Link>
        </div>
        <div className="menu">
          <i className="ion-android-menu" onClick={() => toggleNav(!nav)} />
        </div>
        <ul className="list">
          <li className="list__item">
            <Link href="/">Home</Link>
          </li>
          <li className="list__item">
            <Link href="/shop">Shop</Link>
          </li>
          <li className="list__item">
            <Link href="/shop/cart">
              <a>Cart</a>
            </Link>
          </li>
          <li className="list__item">
            <Link href="/shop/checkout">Checkout</Link>
          </li>

          {user && (
            <li className="list__item avatar">
              <Link href={`/users/profile/${user.username}`}>
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
          {user?.admin && (
            <li className="list__item">
              <i className="ion-ios-gear" />
              <Link href="/shop/admin/dashboard">Dashboard</Link>
            </li>
          )}
          {user && (
            <li
              className="list__item button button__logout"
              onClick={async () => (await logout()) && router.reload()}
            >
              <i className="ion-log-out" />
              <Link href="/">Logout</Link>
            </li>
          )}
          {!user && (
            <li className="list__item">
              <i className="ion-android-person-add" />
              <Link href="/users/auth/register">SignUp</Link>
            </li>
          )}
          {!user && (
            <li className="list__item">
              <i className="ion-log-in" />
              <Link href="/users/auth/login">Sigin In</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
