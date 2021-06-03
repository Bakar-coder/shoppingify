import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useRegisterMutation } from "../../generated/graphql";
import { errorMap } from "../../utils/errorMap";
import InputField from "../includes/InputField";

interface signupTypes {}

const signup: FC<signupTypes> = ({}) => {
  const [error, setError] = useState(`` as any);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [{ fetching }, login] = useRegisterMutation();
  const router = useRouter();
  const handleInputChange = (e: any) => {
    if (error) setError(``);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmission = async (e: any) => {
    e.preventDefault();
    const { data } = await login(user);
    if (data?.register.errors) return setError(errorMap(data?.register.errors));
    return router.replace(`/`);
  };

  return (
    <div className="container-fluid">
      <form className="form" onSubmit={handleSubmission}>
        <div className="form__header">
          <h3>Sign Up</h3>
          <p>Hallo! create a free account.</p>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <InputField
              error={error && error.firstName ? error.firstName : null}
              placeholder="FIrst Name"
              value={user.firstName}
              onChange={handleInputChange}
              name="firstName"
              required
            />
          </div>
          <div className="col-md-6 col-12">
            <InputField
              error={error && error.lastName ? error.lastName : null}
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleInputChange}
              name="lastName"
              required
            />
          </div>
        </div>

        <InputField
          error={error && error.username ? error.username : null}
          placeholder="Username"
          value={user.username}
          onChange={handleInputChange}
          name="username"
          required
        />

        <InputField
          error={error && error.email ? error.email : null}
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
          name="email"
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

        <InputField
          error={error && error.password2 ? error.password2 : null}
          type="password"
          placeholder="Confirm Password"
          value={user.password2}
          onChange={handleInputChange}
          name="password2"
          required
        />

        <div className="button__section">
          <button type="submit" className="button">
            Register
          </button>
          <div>
            <span>
              <Link href="/auth/login">
                <a>Already Registered ? Signin</a>
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default signup;
