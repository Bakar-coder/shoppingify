import React, { FC, useState } from "react";
import AppContext from "../../context";
import Header from "./header";
import SideNav from "./header/SideNav";

interface indexTypes {}

const Layout: FC<indexTypes> = ({ children }) => {
  const [nav, toggleNav] = useState(false);

  return (
    <AppContext>
      <Header nav={nav} toggleNav={toggleNav} />
      <SideNav nav={nav} toggleNav={toggleNav} />
      <div
        className={nav ? "backdrop  backdrop__open" : "backdrop"}
        onClick={() => toggleNav(!nav)}
      />
      {children}
    </AppContext>
  );
};

export default Layout;
