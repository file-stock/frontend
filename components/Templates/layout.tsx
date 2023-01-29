import { FC, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type LayoutProps = {
  children: JSX.Element;
};
const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="text-text">
      <NavBar />
      <main className="py-4">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
