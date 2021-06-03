import React, { FC } from "react";
import router from "next/router";
import Link from "next/link";
import {
  useProductsQuery,
  useUserQuery,
  useUsersQuery,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { API_URL } from "../../../../_constants";

interface productsTypes {}

const Users: FC<productsTypes> = ({}) => {
  const [{ data }] = useUserQuery({ pause: isServer() });
  const [{ data: usersData }] = useUsersQuery({ pause: isServer() });
  const user = data?.user?.user;
  const users = usersData?.users;

  return (
    <>
      <div className="admin__content">
        <div className="header">
          <h3>Users</h3>
        </div>
        {users && users.length > 0 ? (
          <div className=" table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>FIRST NAME</th>
                  <th>LAST NAME</th>
                  <th>USERNAME</th>
                  <th>EMAIL</th>
                  <th>AVATAR</th>
                  <th>ADMIN</th>
                  <th>SELLER</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {user?.admin &&
                  users &&
                  users.map((user) => (
                    <tr key={user.id}>
                      <td className="product-name">
                        <a href="#">{user.id}</a>
                      </td>
                      <td className="product-thumbnail">
                        <a href="#">{user.firstName}</a>
                      </td>
                      <td className="product-name">
                        <a href="#">{user.lastName}</a>
                      </td>

                      <td className="product-subtotal">${user.username}</td>

                      <td className="product-name">
                        <a href="#">{user.email}</a>
                      </td>

                      <td className="product-name"></td>

                      <td className="product-name">
                        {user.admin ? "true" : "false"}
                      </td>
                      <td className="product-name">
                        {user.seller ? "true" : "false"}
                      </td>

                      <td className="product-name">
                        <ul>
                          <li>
                            <Link
                              href={`/shop/admin/update-product/${user.username}`}
                            >
                              <i className="ion-edit"></i>
                            </Link>
                          </li>
                          <li>
                            <a>
                              <i className="ion-ios-trash"></i>
                            </a>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty">
            <div className="content">
              <h1>Empty</h1>
              <p>No Products found in database.</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Users;
