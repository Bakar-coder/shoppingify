import React, { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useAddToCartMutation,
  useProductsQuery,
  useUserQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { STATIC_URL } from "../../../_constants";
import { authContext } from "../../context/auth/context";
import { addToCartHandler } from "../../hooks/auth";

interface productTypes {
  title: string;
}

const Product: FC<productTypes> = ({}) => {
  const { query, push } = useRouter();
  const [{ data }] = useProductsQuery({ pause: isServer() });
  const [, addToCart] = useAddToCartMutation();
  const title = query.title;
  const products = data?.allProducts.products;
  const product =
    products && products.find((item) => item && item.title === title);
  const { cart, setCart, user } = useContext(authContext);
  const cartItem = cart && cart.find((item: any) => item.title === title);

  const [qty, setQty] = useState({
    quantity: 1,
  });

  useEffect(() => {
    if (cartItem) setQty({ quantity: cartItem.quantity });
  }, [cartItem]);

  const handleInputChange = (e: any) =>
    setQty({ ...qty, quantity: e.target.value });
  return (
    <div className="single__product">
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div
              className="tab-content product-details-large"
              id="myTabContent-3"
            >
              <div className="tab-pane fade show active" id="single-slide-one">
                <div className="single-product-img img-full">
                  <img
                    src={`${STATIC_URL}/${product?.images}`}
                    alt={product?.title}
                  />
                  <a
                    className="venobox vbox-item"
                    data-gall="gallery01"
                    href="img/single-product/large/large1.jpg"
                  >
                    <i className="fa fa-search-plus"></i>
                  </a>
                </div>
              </div>
              <div className="tab-pane fade" id="single-slide-two">
                <div className="single-product-img img-full">
                  <img src="img/single-product/large/large2.jpg" alt="" />
                  <a
                    className="venobox vbox-item"
                    data-gall="gallery01"
                    href="img/single-product/large/large2.jpg"
                  >
                    <i className="fa fa-search-plus"></i>
                  </a>
                </div>
              </div>
              <div className="tab-pane fade" id="single-slide-three">
                <div className="single-product-img img-full">
                  <img src="img/single-product/large/large3.jpg" alt="" />
                  <a
                    className="venobox vbox-item"
                    data-gall="gallery01"
                    href="img/single-product/large/large3.jpg"
                  >
                    <i className="fa fa-search-plus"></i>
                  </a>
                </div>
              </div>
              <div className="tab-pane fade" id="single-slide-four">
                <div className="single-product-img img-full">
                  <img src="img/single-product/large/large4.jpg" alt="" />
                  <a
                    className="venobox vbox-item"
                    data-gall="gallery01"
                    href="img/single-product/large/large4.jpg"
                  >
                    <i className="fa fa-search-plus"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="single-product-content">
              <h1 className="single-product-name">{product?.title}</h1>
              <div className="single-product-reviews">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
              </div>
              <div className="single-product-price">
                <div className="product-discount">
                  <span className="price striped">
                    ${product?.price.toFixed(2)}
                  </span>{" "}
                  {product?.discount && (
                    <span className="price">
                      $
                      {(
                        product!.price -
                        (parseFloat(product.discount) / 100) * product!.price
                      ).toFixed(2)}
                    </span>
                  )}
                  {product?.discount && (
                    <span className="discount"> {product.discount}% OFF</span>
                  )}
                </div>
              </div>
              <div className="product-info">
                <p>{product?.description}</p>
              </div>
              <div className="single-product-action">
                <form action="#">
                  {/* <div className="product-variants">
                    <div className="product-variants-item">
                      <span className="control-label">Size</span>
                      <select
                        className="nice-select"
                        name="size"
                        style={{ display: "none" }}
                      >
                        <option value="1">S</option>
                        <option value="2">M</option>
                        <option value="3">X</option>
                        <option value="4">XL</option>
                      </select>
                      <div className="nice-select" tabIndex={0}>
                        <span className="current">S</span>
                        <ul className="list">
                          <li data-value="1" className="option selected">
                            S
                          </li>
                          <li data-value="2" className="option">
                            M
                          </li>
                          <li data-value="3" className="option">
                            X
                          </li>
                          <li data-value="4" className="option">
                            XL
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-variants-item">
                      <span className="control-label">Color</span>
                      <select
                        className="nice-select"
                        name="color"
                        style={{ display: "none" }}
                      >
                        <option value="1">Red</option>
                        <option value="2">Green</option>
                        <option value="3">Blue</option>
                        <option value="4">White</option>
                      </select>
                      <div className="nice-select" tabIndex={0}>
                        <span className="current">Red</span>
                        <ul className="list">
                          <li data-value="1" className="option selected">
                            Red
                          </li>
                          <li data-value="2" className="option">
                            Green
                          </li>
                          <li data-value="3" className="option">
                            Blue
                          </li>
                          <li data-value="4" className="option">
                            White
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                   */}
                  <div className="product-add-to-cart">
                    <span className="control-label">Quantity</span>
                    <div className="cart-plus-minus">
                      <input
                        className="cart-plus-minus-box"
                        type="text"
                        name="qtybutton"
                        onChange={handleInputChange}
                        value={qty.quantity}
                      />
                      <div
                        className="dec qtybutton"
                        onClick={() =>
                          qty.quantity > 1 &&
                          setQty({ ...qty, quantity: qty.quantity - 1 })
                        }
                      >
                        <i className="ion-ios-arrow-down"></i>
                      </div>
                      <div
                        className="inc qtybutton"
                        onClick={() =>
                          setQty({ ...qty, quantity: qty.quantity + 1 })
                        }
                      >
                        <i className="ion-ios-arrow-up"></i>
                      </div>
                    </div>
                    <div className="add">
                      <div
                        className="add-to-cart"
                        style={{ display: "inline-block" }}
                        onClick={() => {
                          addToCartHandler(
                            { cart, user, setCart },
                            { ...product, quantity: qty.quantity }
                          );

                          addToCart({
                            productId: product!.id,
                            quantity: qty.quantity,
                          });

                          return push("/shop/cart");
                        }}
                      >
                        <i className="ion-android-cart"></i> add-to-cart
                      </div>
                      <span className="product-availability">In stock</span>
                    </div>
                  </div>
                </form>

                <div className="single-product-share mt-20">
                  <ul>
                    <li className="categories-title">Share :</li>
                    <li>
                      <a href="#">
                        <i className="ion-social-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ion-social-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ion-social-googleplus"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="ion-social-pinterest"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <div className="block-reassurance mt-30">
                <ul>
                  <li>
                    <div className="block-reassurance-item">
                      <img src="img/icon/single-icon1.png" alt="" />
                      <span>
                        Security policy (edit with Customer reassurance module)
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="block-reassurance-item">
                      <img src="img/icon/single-icon2.png" alt="" />
                      <span>
                        Delivery policy (edit with Customer reassurance module)
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="block-reassurance-item">
                      <img src="img/icon/single-icon3.png" alt="" />
                      <span>
                        Security policy (edit with Customer reassurance module)
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
             */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
