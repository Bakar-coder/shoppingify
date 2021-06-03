import React, { FC } from "react";
import { withUrqlClient } from "next-urql";
import Layout from "../../../components/layouts";
import { createUrqlClient } from "../../../utils/urqlClient";
import Signup from "../../../components/auth/signup";

interface registerTypes {}

const Register: FC<registerTypes> = ({}) => {
  return (
    <Layout>
      <Signup />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
