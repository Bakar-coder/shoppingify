import { NextPage } from "next";
import React from "react";
import Layout from "../../../../components/layouts";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  return (
    <Layout>
      <p>Token is {token}</p>
    </Layout>
  );
};

ChangePassword.getInitialProps = ({ query }) => ({
  token: query.token as string,
});

export default ChangePassword;
