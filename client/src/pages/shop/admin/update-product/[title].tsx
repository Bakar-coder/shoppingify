import { NextPage } from "next";
import router from "next/router";
import { withUrqlClient } from "next-urql";
import React from "react";
import EditProduct from "../../../../components/admin/editProduct";
import Layout from "../../../../components/layouts";
import { createUrqlClient } from "../../../../utils/urqlClient";
const UpdateProduct: NextPage = () => {
  const title = router.query.title as string;
  return (
    <Layout>
      <EditProduct productTitle={title} />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(UpdateProduct);
