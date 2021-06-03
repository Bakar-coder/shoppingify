import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../../components/layouts";
import Checkout from "../../components/shop/checkout";
import { createUrqlClient } from "../../utils/urqlClient";

interface checkoutTypes {}

const CheckoutPage: FC<checkoutTypes> = ({}) => {
  return (
    <Layout>
      <div className="wrapper">
        <Checkout />
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CheckoutPage);
