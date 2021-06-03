import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Layout from "../../components/layouts";
import Payments from "../../components/shop/payments";
import { createUrqlClient } from "../../utils/urqlClient";

interface PaymentMethodTypes {}

const PaymentMethod: FC<PaymentMethodTypes> = ({}) => {
  return (
    <Layout>
      <Payments />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(PaymentMethod);
