import React, { FC, useContext } from "react";
import router from "next/router";
import { STATIC_URL } from "../../../_constants";
import {
  CartItemType,
  ProductType,
  useAddToCartMutation,
} from "../../generated/graphql";
import { authContext } from "../../context/auth/context";
import { addToCartHandler } from "../../hooks/auth";
import { SET_USER } from "../../context/types";

interface cardTypes {
  product: ProductType;
}

const Card: FC<cardTypes> = ({ product }) => {
  const [, addToCart] = useAddToCartMutation();
  const { cart, user, setCart } = useContext(authContext);
  // const cart = data?.getCart;
  const cartItem =
    cart && cart.find((prod?: CartItemType) => prod?.title === product.title);

  return (
    <div className="card">
      <div className="card__image">
        <img
          src={STATIC_URL + "/" + product.images}
          alt={product.title}
          onClick={() => router.push(`/shop/products/${product.title}`)}
        />
      </div>

      <div className="card__content">
        <h3 className="card__title">{product.title}</h3>
        <p className="card__details">
          {product.description.substring(0, 55)}
          <span>...</span>
        </p>

        <div className="span">
          <span className="card__price">
            PRICE:{" "}
            <span>
              <i className="ion-social-usd" />
              {product.discount
                ? (
                    product!.price -
                    (parseFloat(product.discount) / 100) * product.price
                  ).toFixed(2)
                : product.price.toFixed(2)}
            </span>
          </span>
          <span className="card__icon">
            <i className="ion-ios-star" />
            <i className="ion-ios-star" />
            <i className="ion-ios-star-half" />
            <i className="ion-ios-star-outline" />
            <i className="ion-ios-star-outline" />
          </span>
        </div>
        <div>
          {!cartItem ? (
            <button
              className="cart__button"
              onClick={async () => {
                user &&
                  (await addToCart({
                    productId: product.id,
                    quantity: 1,
                  }));

                addToCartHandler(
                  { setCart, user, cart },
                  { ...product, quantity: 1 }
                );
              }}
            >
              ADD TO CART
            </button>
          ) : (
            <button
              className="cart__button"
              onClick={() => router.push("/shop/cart")}
            >
              IN CART
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
