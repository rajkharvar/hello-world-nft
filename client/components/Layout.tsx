import Navbar from "./Navbar";
import * as React from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps): React.ReactNode => {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
    </>
  );
};

export default Layout;
