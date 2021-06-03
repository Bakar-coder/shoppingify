import React, { FC } from "react";
import { withUrqlClient } from "next-urql";
import Layout from "../components/layouts";
import { createUrqlClient } from "../utils/urqlClient";
import Home from "../components";
import { useProductsQuery } from "../generated/graphql";

interface indexTypes {}

const index: FC<indexTypes> = ({}) => {
  return (
    <Layout>
      <Home />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(index);
