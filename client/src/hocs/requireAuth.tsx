import React from "react";
import redirect from "nextjs-redirect";
import { useUserQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

export const isAuth = (Component: any) => (props: any) => {
  const Redirect = redirect("/users/auth/login");
  const [{ data }] = useUserQuery({ pause: isServer() });
  const user = data?.user?.user;
  return user ? <Component {...props} /> : <Redirect />;
};

export const isAdmin = (Component: any) => (props: any) => {
  const Redirect = redirect("/");
  const [{ data }] = useUserQuery({ pause: isServer() });
  const user = data?.user?.user;
  return user?.admin ? <Component {...props} /> : <Redirect />;
};
