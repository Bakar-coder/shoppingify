import DropIn from "braintree-web-drop-in-react";
import React, { FC, useState } from "react";
import {
  usePaymentTokenQuery,
  useUserQuery,
  useProductsQuery,
  CartItemType,
  useMakePaymentMutation,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";

interface paymentsTypes {}

const Payments: FC<paymentsTypes> = ({}) => {
  const [{ data }] = usePaymentTokenQuery({ pause: isServer() });
  const [, proccessPayment] = useMakePaymentMutation();
  const clientToken = data?.getToken.clientToken;
  const [{ data: userData }] = useUserQuery({ pause: isServer() });
  const [{ data: productsData }] = useProductsQuery({ pause: isServer() });
  const items = !isServer() && localStorage.getItem("cart");
  const cart = userData?.user?.cart
    ? userData?.user?.cart
    : items
    ? JSON.parse(items)
    : [];
  const products = productsData?.allProducts.products;
  const newCart: any[] = [];
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

  const [state, setState] = useState({
    instance: "",
    amount: grandTotal,
    nounce: "",
    error: "",
    clientToken,
    transaction: null,
  } as any);

  const makePayment = async () => {
    try {
      const { nonce } = await state.instance.requestPaymentMethod();
      const { data } = await proccessPayment({
        amount: state.amount,
        paymentMethodNonce: nonce,
      });
      const transaction = data?.processPayment.transaction;
      const errors = data?.processPayment.errors;
      if (errors) setState({ ...state, error: errors });
      if (transaction)
        setState({ ...state, transaction: JSON.parse(transaction) });
    } catch (error) {
      setState({ ...state, error: error.message });
    }
  };

  return (
    state.clientToken && (
      <div>
        <DropIn
          options={{ authorization: state.clientToken }}
          onInstance={(instance) => (state.instance = instance)}
        />
        <button onClick={makePayment} className="button">
          PAY NOW
        </button>
      </div>
    )
  );
};

export default Payments;
