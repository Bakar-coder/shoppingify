import React, { FC } from "react";

interface topTypes {}

const Top: FC<topTypes> = ({}) => {
  return (
    <section className="header__top">
      <div className="container-fluid header-top-area home-1-ht-bg">
        <div className="">
          <div className="welcome-text">
            <p>
              Welcome to <span className="home6-color">ShopMax</span> Store
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Top;
