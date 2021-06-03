import React, { FC, useState } from "react";
import router from "next/router";
import {
  useProductsQuery,
  CartItemType,
  useUserQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

interface cartTypes {}

const Checkout: FC<cartTypes> = ({}) => {
  const [{ data: productsData }] = useProductsQuery({ pause: isServer() });
  const [{ data }] = useUserQuery({ pause: isServer() });
  const items = !isServer() && localStorage.getItem("cart");
  let shippingAdd = !isServer() && localStorage.getItem("shipping");
  let shipping = shippingAdd && JSON.parse(shippingAdd);
  const user = data?.user?.user;
  const cart = data?.user?.cart
    ? data?.user?.cart
    : items
    ? JSON.parse(items)
    : [];

  const [state, setState] = useState({
    firstName: shipping?.firstName || user?.firstName || "",
    lastName: shipping?.lastName || user?.lastName || "",
    email: shipping?.email || user?.email || "",
    phone: shipping?.phone || "",
    company: shipping?.company || "",
    country: shipping?.country || "",
    street: shipping?.street || "",
    apartment: shipping?.apartment || "",
    city: shipping?.city || "",
    notes: shipping?.notes || "",
    createAccount: false,
    addr: !isServer() && localStorage.getItem("shipping"),
  });
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

  if (shipping && !state.addr) setState({ ...state, addr: "shipped" });

  const handleInputChange = (e: any) => {
    if (state.addr && shipping) {
      localStorage.removeItem("shipping");
      setState({ ...state, addr: null });
    } else setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("shipping", JSON.stringify(state));
    setState({ ...state, addr: shippingAdd && JSON.parse(shippingAdd) });
  };

  return (
    <div className="container-fluid">
      <div className="checkout_form">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <form onSubmit={handleSubmit} className="form">
              <h3>Billing Details</h3>
              <div className="row">
                <div className="col-lg-6 mb-30">
                  <div className="form__group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="First Name"
                      name="firstName"
                      value={state.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-30">
                  <div className="form__group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Last Name"
                      name="lastname"
                      value={state.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-12 mb-30">
                  <div className="form__group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Company Name"
                      name="company"
                      value={state.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="col-12 mb-30">
                  <div className="form__group">
                    <input
                      placeholder="Street address"
                      type="text"
                      className="form__input"
                      name="street"
                      value={state.street}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-12 mb-30">
                  <div className="form__group">
                    <input
                      placeholder="Apartment, suite, unit etc. (optional)"
                      type="text"
                      className="form__input"
                      name="apartment"
                      value={state.apartment}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-12 mb-30">
                  <div className="form__group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Town / City"
                      name="city"
                      value={state.city}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-12 mb-30">
                  <div className="form__group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="State / County"
                      name="country"
                      value={state.country}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-30">
                  <div className="form__group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Phone"
                      name="phone"
                      value={state.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6 mb-30">
                  <div className="form__group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Email Address "
                      name="email"
                      value={state.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                {!user && (
                  <div className="col-12 mb-30">
                    <input
                      id="b_c_account"
                      type="checkbox"
                      data-target="createp_account"
                    />
                    <label
                      className="righ_0"
                      htmlFor="b_c_account"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-controls="collapseOne"
                    >
                      Create an account?
                    </label>

                    {state.createAccount && (
                      <div
                        id="collapseOne"
                        className="collapse one"
                        data-parent="#accordion"
                      >
                        <div className="card-body1">
                          <input
                            placeholder="Account password"
                            type="password"
                            className="form__input"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="col-12">
                  <div className="order-notes">
                    <label htmlFor="order_note">Order Notes</label>
                    <textarea
                      id="order_note"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      className="form__input"
                      name="notes"
                      value={state.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>

                {!state.addr && (
                  <div className="order_button">
                    <button type="submit" className="button">
                      SAVE & ORDER
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="order_wrapper">
              <div className="table table-responsive">
                <form action="#">
                  <h3>Your order</h3>
                  <table className="cart__table">
                    <thead>
                      <tr>
                        <th className="product-name">Product</th>
                        <th className="product-name">Quantity</th>
                        <th className="product-total">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newCart.map((item: any) => (
                        <tr key={item.id}>
                          <td>{item.title}</td>
                          <td>{item.quantity}</td>
                          <td className="amount">
                            {" "}
                            ${(item.quantity * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>Cart Subtotal</th>
                        <td />
                        <td>${cartSubTotal}</td>
                      </tr>
                      <tr>
                        <th>Discount</th>
                        <td />
                        <td>${GrandDiscountTotal}</td>
                      </tr>
                      <tr className="order_total">
                        <th>Order Total</th>
                        <td />
                        <td>${grandTotal}</td>
                      </tr>
                    </tfoot>
                  </table>
                </form>
              </div>
              <div
                className="payment-method"
                style={{ marginTop: "3rem", marginBottom: "3rem" }}
              >
                {state.addr && (
                  <div className="order_button">
                    <button
                      type="submit"
                      className="button"
                      onClick={() => router.push("/shop/payments")}
                    >
                      ORDER NOW
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
