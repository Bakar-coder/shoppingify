import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import { STATIC_URL } from "../../../_constants";
import { authContext } from "../../context/auth/context";
import {
  CartItemType,
  useAddToCartMutation,
  useProductsQuery,
  useRemoveCartItemMutation,
  useUserQuery,
} from "../../generated/graphql";
import { addToCartHandler, removeCartItemHandler } from "../../hooks/auth";
import { isServer } from "../../utils/isServer";

interface cartTypes {}

const ShoppingCart: FC<cartTypes> = ({}) => {
  const [, removeCartItem] = useRemoveCartItemMutation();
  const [, addToCart] = useAddToCartMutation();
  const { push } = useRouter();
  const [{ data: productsData }] = useProductsQuery({ pause: isServer() });
  const { setCart } = useContext(authContext);
  const items = !isServer() && localStorage.getItem("cart");
  const [{ data }] = useUserQuery({ pause: isServer() });
  const user = data?.user?.user;
  const cart = data?.user?.cart
    ? data?.user?.cart
    : items
    ? JSON.parse(items)
    : [];
  const products = productsData?.allProducts.products;
  const newCart: any = [];

  products &&
    products.forEach(
      (prod) =>
        cart &&
        cart.find((item: CartItemType) => {
          if (item.id === prod.id) newCart.push({ ...prod, ...item });
        })
    );

  const grandTotal =
    !isServer() &&
    newCart.length > 0 &&
    newCart
      .map(
        (item: any) =>
          parseInt(item.quantity) *
          (parseFloat(item.discount)
            ? item.price -
              (parseFloat(item.discount) / 100) * parseFloat(item.price)
            : parseFloat(item.price))
      )
      .reduce((a: any, b: any) => a + b)
      .toFixed(2);

  const cartSubTotal =
    !isServer() &&
    newCart.length > 0 &&
    newCart
      .map((item: any) => parseInt(item.quantity) * parseFloat(item.price))
      .reduce((a: any, b: any) => a + b)
      .toFixed(2);

  const GrandDiscountTotal =
    !isServer() &&
    newCart.length > 0 &&
    newCart
      .map(
        (item: any) =>
          parseInt(item.quantity) *
          (parseFloat(item.discount) &&
            (parseFloat(item.discount) / 100) * parseFloat(item.price))
      )
      .reduce((a: any, b: any) => a + b)
      .toFixed(2);

  return (
    <div className="container-fluid">
      <div className="table">
        <div className="table-responsive">
          <table className="cart__table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price (USD)</th>
                <th>Discount (%)</th>
                <th>Qty</th>
                <th>Sub Total (USD)</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {newCart &&
                newCart.length > 0 &&
                newCart.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>
                      <div className="img-container">
                        <img
                          src={`${STATIC_URL}/${item.images}`}
                          alt={item.title}
                        />
                      </div>
                    </td>
                    <td style={{ textAlign: "left" }}>{item.title}</td>
                    <td>{item.price.toFixed(2)}</td>
                    <td>{item.discount ? parseFloat(item.discount) : ""}</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <span
                        className="increament"
                        onClick={async () => {
                          if (user) {
                            const { data } = await addToCart({
                              productId: item.id,
                              quantity: item.quantity + 1,
                            });

                            !data?.addToCart.user &&
                              addToCartHandler(
                                { setCart, user, cart },
                                { ...item, quantity: item.quantity - 1 }
                              );
                          }

                          addToCartHandler(
                            { setCart, user, cart },
                            { ...item, quantity: item.quantity + 1 }
                          );
                        }}
                      >
                        <i className="ion-plus" />
                      </span>
                      <span
                        className="decreament"
                        onClick={async () => {
                          if (item.quantity > 1) {
                            if (user) {
                              const { data } = await addToCart({
                                productId: item.id,
                                quantity: item.quantity - 1,
                              });

                              !data?.addToCart.user &&
                                addToCartHandler(
                                  { setCart, user, cart },
                                  { ...item, quantity: item.quantity + 1 }
                                );
                            }

                            addToCartHandler(
                              { setCart, user, cart },
                              { ...item, quantity: item.quantity - 1 }
                            );
                          }
                        }}
                      >
                        <i className="ion-minus" />
                      </span>
                      <span
                        className="times"
                        onClick={async () => {
                          removeCartItemHandler(
                            { cart, setCart, user },
                            item.id
                          );
                          return (
                            user &&
                            (await removeCartItem({ productId: item.id }))
                          );
                        }}
                      >
                        <i className="ion-ios-trash" />
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="cart__total">
          <div>
            <h3>SUBTOTAL</h3>
            <h3>${cartSubTotal ? cartSubTotal : 0}</h3>
          </div>

          <div>
            <h3>DISCOUNT</h3>
            <h3>${GrandDiscountTotal ? GrandDiscountTotal : 0}</h3>
          </div>

          <div>
            <h3>GRAND TOTAL</h3>
            <h3>${grandTotal ? grandTotal : 0}</h3>
          </div>
        </div>
        <div className="table__footer">
          <div></div>
          <div>
            <button
              className="btn button button__sub"
              onClick={() => push("/shop")}
            >
              Continue Shopping
            </button>
            <button
              className="btn button"
              onClick={() => push("/shop/checkout")}
            >
              Procced To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
