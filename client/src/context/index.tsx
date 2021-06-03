import React from "react";
import AlertState from "./alert";
import AuthState from "./auth";
import ShopState from "./shop";

interface propTypes {}

const AppContext: React.FC<propTypes> = ({ children }) => {
  return (
    <AlertState>
      <AuthState>
        <ShopState>{children}</ShopState>
      </AuthState>
    </AlertState>
  );
};

export default AppContext;
