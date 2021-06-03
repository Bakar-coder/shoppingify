import React, { FC } from "react";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import Layout from "../components/layouts";
import { createUrqlClient } from "../utils/urqlClient";

interface ErrorTypes {}

const Error: FC<ErrorTypes> = ({}) => {
  return (
    <Layout>
      <div className="error__page">
        <h3>404</h3>
        <p>The page you're looking for can not be found.</p>
        <button className="button" onClick={() => router.push("/")}>
          Back Home
        </button>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(Error);
