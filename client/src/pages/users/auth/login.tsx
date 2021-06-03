import React, { FC } from "react";
import { withUrqlClient } from "next-urql";
import Layout from "../../../components/layouts";
import Signin from "../../../components/auth/signin";
import { createUrqlClient } from "../../../utils/urqlClient";

interface loginTypes {}

const login: FC<loginTypes> = ({}) => {
  return (
    <Layout>
      <Signin />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(login);
