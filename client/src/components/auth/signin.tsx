import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { errorMap } from "../../utils/errorMap";
import InputField from "../includes/InputField";
import { useLoginMutation } from "../../generated/graphql";

interface signinTypes {}

const Signin: FC<signinTypes> = ({}) => {
  const [error, setError] = useState(`` as any);
  const [user, setUser] = useState({
    usernameOrEmail: ``,
    password: ``,
  });
  const [{ fetching }, login] = useLoginMutation();
  const router = useRouter();
  const handleInputChange = (e: any) => {
    if (error) setError(``);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e: any) => {
    e.preventDefault();
    const { data } = await login(user);
    if (data?.login.errors) return setError(errorMap(data?.login.errors));
    return typeof router.query.next === "string"
      ? router.replace(router.query.next)
      : router.replace(`/`);
  };

  return (
    <div className="container-fluid">
      <form className="form" onSubmit={handleSubmission}>
        <div className="form__header">
          <h3>Sign In</h3>
          <p>Welcome back! Login to continue...</p>
        </div>
        <InputField
          error={error && error.usernameOrEmail ? error.usernameOrEmail : null}
          placeholder="Username Or Email"
          value={user.usernameOrEmail}
          onChange={handleInputChange}
          name="usernameOrEmail"
          required
        />

        <InputField
          error={error && error.password ? error.password : null}
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInputChange}
          name="password"
          required
        />

        <div className="button__section">
          <button type="submit" className="button">
            Login
          </button>
          <div>
            <span>
              <Link href="/auth/register">
                <a>Not Registered ? Signup</a>
              </Link>
            </span>
            <span>
              <Link href="/auth/forgot-password">
                <a>Forgot Password</a>
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
