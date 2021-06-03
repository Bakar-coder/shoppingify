import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { useUserQuery } from "../../generated/graphql";
import Layout from "../layouts";
import Products from "./tabs/products";
import Users from "./tabs/users";
import { isServer } from "../../utils/isServer";

interface signinTypes {}

const Dashboard: FC<signinTypes> = ({}) => {
  const [{ data }] = useUserQuery({ pause: isServer() });
  const user = data?.user?.user;
  const router = useRouter();
  if (!user?.admin && !user?.seller) router.replace("/");

  const [tab, setTab] = useState({
    products: true,
    users: false,
    orders: false,
    posts: false,
  });

  return (
    <Layout>
      <div className="dashboard">
        {/* siderbar */}
        <div className="sidebar">
          <div className="arrow" />
          <ul>
            <li
              className={tab.products ? "active" : ""}
              onClick={() =>
                setTab({
                  ...tab,
                  products: true,
                  orders: false,
                  posts: false,
                  users: false,
                })
              }
            >
              Products
            </li>
            {user?.admin && (
              <li
                className={tab.users ? "active" : ""}
                onClick={() =>
                  setTab({
                    ...tab,
                    products: false,
                    orders: false,
                    posts: false,
                    users: true,
                  })
                }
              >
                Users
              </li>
            )}
            <li
              className={tab.orders ? "active" : ""}
              onClick={() =>
                setTab({
                  ...tab,
                  products: false,
                  orders: true,
                  posts: false,
                  users: false,
                })
              }
            >
              Orders
            </li>
            <li
              className={tab.posts ? "active" : ""}
              onClick={() =>
                setTab({
                  ...tab,
                  products: false,
                  orders: false,
                  posts: true,
                  users: false,
                })
              }
            >
              Posts
            </li>
          </ul>
        </div>

        {/* content */}
        <div className="content">
          <div className="container-fluid">
            {tab.products && <Products />}
            {tab.users && <Users />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
