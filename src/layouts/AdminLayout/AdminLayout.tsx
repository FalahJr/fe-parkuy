import React from "react";
// import Navbar from "../../components/NavbarAdmin/NavbarAdmin";
import Sidebar from "./Sidebar";
import "./AdminLayout.css";
import "./AdminFont.css";


import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = (props) => {
  return (
    <>
      <Sidebar/>
        <section className="home-section">
            {/* <Navbar/> */}
            <Outlet />
        </section>
    </>
  );
};
export default AdminLayout;