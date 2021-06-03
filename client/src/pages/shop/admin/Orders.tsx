import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { createUrqlClient } from "../../../utils/urqlClient";

interface OrdersTypes {}

const Orders: FC<OrdersTypes> = ({}) => {
  return <></>;
};

export default withUrqlClient(createUrqlClient)(Orders);
