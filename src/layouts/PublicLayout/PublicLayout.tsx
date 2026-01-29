import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./PublicLayout.css";
// import "../../index.css";

import "./Font.css";

import { Outlet } from "react-router-dom";

const PublicLayout: React.FC = (props) => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default PublicLayout;
