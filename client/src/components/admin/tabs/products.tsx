import React, { FC } from "react";
import router from "next/router";
import Link from "next/link";
import {
  useDeleteProductMutation,
  useProductsQuery,
  useUserQuery,
} from "../../../generated/graphql";
import { isServer } from "../../../utils/isServer";
import { STATIC_URL } from "../../../../_constants";

interface productsTypes {}

const Products: FC<productsTypes> = ({}) => {
  const [{ data }] = useUserQuery({ pause: isServer() });
  const [{ data: productsData }] = useProductsQuery({ pause: isServer() });
  const [, deleteProduct] = useDeleteProductMutation();
  const user = data?.user?.user;
  const products = productsData?.allProducts.products;

  return (
    <>
      <div className="admin__content">
        <div className="header">
          <h3>Products</h3>
          <button
            className="button"
            onClick={() => router.push("/shop/admin/add-product")}
          >
            Add Product
          </button>
        </div>
        {products && products.length > 0 ? (
          <div className=" table-responsive">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>IMAGE</th>
                  <th>TITLE</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>FEATURED</th>
                  <th>PUBLISHED</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {user?.seller &&
                  products.map(
                    (product) =>
                      product.user.id === user?.id && (
                        <tr key={product.id}>
                          <td className="product-name">
                            <a href="#">{product.id}</a>
                          </td>
                          <td className="product-thumbnail">
                            <a href="#">
                              <img
                                src={`${STATIC_URL}/${product.images}`}
                                alt={product.title}
                              />
                            </a>
                          </td>
                          <td className="product-name">
                            <a href="#">{product.title}</a>
                          </td>

                          <td className="product-subtotal">${product.price}</td>

                          <td className="product-name">{product.stock}</td>
                          <td className="product-name">{product.featured}</td>
                          <td className="product-name">{product.published}</td>

                          <td className="product-name">
                            <a href="#">Edit</a>
                            <a href="#">Delete</a>
                          </td>
                        </tr>
                      )
                  )}

                {user?.admin &&
                  products &&
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className="product-name">
                        <a href="#">{product.id}</a>
                      </td>
                      <td className="product-thumbnail">
                        <Link href={`/shop/products/${product.title}`}>
                          <a>
                            <img
                              src={`${STATIC_URL}/${product.images}`}
                              alt={product.title}
                            />
                          </a>
                        </Link>
                      </td>
                      <td className="product-name">
                        <a href="#">{product.title}</a>
                      </td>

                      <td className="product-subtotal">{product.price}</td>

                      <td className="product-name">
                        <a href="#">{product.stock}</a>
                      </td>

                      <td className="product-name">
                        {product.featured ? "true" : "false"}
                      </td>
                      <td className="product-name">
                        {product.published ? "true" : "false"}
                      </td>

                      <td className="product-name">
                        <ul>
                          <li
                            onClick={() =>
                              router.push(
                                `/shop/admin/update-product/${product.title}`
                              )
                            }
                          >
                            <i className="ion-edit"></i>
                          </li>
                          <li onClick={() => deleteProduct({ id: product.id })}>
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

export default Products;
