import React, { FC, useState } from "react";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import Layout from "../../../components/layouts";
import InputField from "../../../components/includes/InputField";
import Signin from "../../../components/auth/signin";
import { createUrqlClient } from "../../../utils/urqlClient";

interface types {}

const ForgotPassword: FC<types> = ({}) => {
  const [error, setError] = useState(`` as any);
  const [user, setUser] = useState({
    email: ``,
  });
  // const [{ fetching }, login] = useLoginMutation();
  // const router = useRouter();
  const handleInputChange = (e: any) => {
    if (error) setError(``);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e: any) => {
    e.preventDefault();
    // const { data } = await login(user);
    // if (data?.login.errors) return setError(errorMap(data?.login.errors));
    // return router.replace(`/`);
  };

  return (
    <Layout>
      <div className="wrapper">
        <form className="form" onSubmit={handleSubmission}>
          <div className="form__header">
            <h3>Reset Password</h3>
            <p>Enter your email used to create account...</p>
          </div>
          <InputField
            error={error && error.email ? error.email : null}
            type="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleInputChange}
            name="email"
            required
          />

          <button type="submit" className="button">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
