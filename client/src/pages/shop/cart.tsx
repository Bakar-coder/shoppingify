import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../../components/layouts";
import ShoppingCart from "../../components/shop/cart";
import { createUrqlClient } from "../../utils/urqlClient";

interface cartTypes {}

const cart: FC<cartTypes> = ({}) => {
  return (
    <Layout>
      <div className="wrapper">
        <ShoppingCart />
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(cart);
