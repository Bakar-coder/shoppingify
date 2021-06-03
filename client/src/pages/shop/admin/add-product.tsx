import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import Add from "../../../components/admin/addProduct";
import Layout from "../../../components/layouts";
import { isAdmin } from "../../../hocs/requireAuth";
import { createUrqlClient } from "../../../utils/urqlClient";

interface addproductTypes {}

const addproduct: FC<addproductTypes> = ({}) => {
  return (
    <Layout>
      <Add />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(isAdmin(addproduct));
