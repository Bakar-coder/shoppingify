import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { createUrqlClient } from "../../utils/urqlClient";

interface BillingTypes {}

const Billing: FC<BillingTypes> = ({}) => {
  return <></>;
};

export default withUrqlClient(createUrqlClient)(Billing);
