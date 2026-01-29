import React, { useEffect, useState } from "react"
import { FaRegFile , FaLayerGroup, FaParking, FaRegMoneyBillAlt } from "react-icons/fa";
import { Link, NavLink , useNavigate} from "react-router-dom";
import { authService, storageService } from "../../services";
import { ProfileResponse } from "../../types";
// import { storageService } from "../../services";

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const [dropdown1, setDropdown1] = useState<boolean>(false)
  const [dropdown2, setDropdown2] = useState<boolean>(false)
  

  const logout = (): void => {
    try {
        navigate('/auth/login')
        storageService.removeToken()
    } catch (error) {
        // handle error logout
    }
}



// componentDidMount
useEffect(() => {
    const token = storageService.getToken()
    if (!token) navigate('/auth/login')
}, [])
    return(
        <div className="sidebar">
    <div className="logo-details">
      {/* <span className="logo_name">Parkuy</span> */}
      <img src="../../../assets/img/Content/logo.png"/>

    </div>
      <ul className="nav-links">
        <li className="menu-top">
        <NavLink
            to="/admin/"
            className={({ isActive }) =>
              isActive ? 'active top' : 'top'
            }
          >
            <i><FaRegFile /></i>

            <span className="links_name">Rangkuman</span>

          </NavLink>
        </li>
        <li className="menu-top">
          
          <NavLink
            to="/admin/berkas"
            className={({ isActive }) =>
              isActive ? 'active top' : 'top'
            }
          >
            <i><FaLayerGroup /></i>

            <span className="links_name">Berkas</span>

          </NavLink>
          
        </li>
        <li className="menu-top drop-menu"  onClick={() => setDropdown1(!dropdown1)}>
        <NavLink
            to="#"
            className={({ isActive }) =>
              isActive ? ' top' : 'top'
            }
          >
            <i><FaParking /></i>

            <span className="links_name">Parkir</span>

        </NavLink>
        {dropdown1 ? (
          <ul className="submenu" id="parkir">
            <li className="">
              <NavLink
              to="/admin/parkir/lokasi/"
              className={({ isActive }) =>
                isActive ? 'active top' : 'top'
              }
              >
                {/* <i><FaLayerGroup /></i> */}
                <i></i>

                <span className="links_name">Lokasi</span>

              </NavLink>
            </li>
            <li >
            <NavLink
              to="/admin/parkir/petugas/"
              className={({ isActive }) =>
                isActive ? 'active top' : 'top'
              }
              >
                {/* <i><FaLayerGroup /></i> */}
                <i></i>
                <span className="links_name">Petugas</span>

              </NavLink>
            </li>
          </ul>
          ) : null}
        </li>
        <li className="menu-top drop-menu"  onClick={() => setDropdown2(!dropdown2)}>
          <NavLink
              to="#"
              className={({ isActive }) =>
                isActive ? ' top' : 'top'
              }
            >
              <i><FaRegMoneyBillAlt /></i>

              <span className="links_name">Transaksi</span>

          </NavLink>
          {dropdown2 ? (
          <ul className="submenu" id="transaksi">
            <li >
            <NavLink
              to="/admin/transaksi/parkir-masuk"
              className={({ isActive }) =>
                isActive ? 'active top' : 'top'
              }
              >
                {/* <i><FaLayerGroup /></i> */}
                <i></i>
                <span className="links_name">Masuk</span>

              </NavLink>
            </li>
            <li >
            <NavLink
              to="/admin/transaksi/parkir-keluar"
              className={({ isActive }) =>
                isActive ? 'active top' : 'top'
              }
              >
                {/* <i><FaLayerGroup /></i> */}
                <i></i>
                <span className="links_name">Keluar</span>

              </NavLink>
            </li>
          </ul>
    ) : null }
        </li>
        <div className="log_out">
          <li className="menu-bottom">
            <Link to="about">
              <div className="button-profile">
                <div className="item-button img-profile">
                  <img src="../../../assets/img/admin/profile-default.jpg" alt="" width="40px" />
                </div>
                <div className="item-button name-role">
                  <span className="name">Parkuy Administrator</span>
                  <span className="role">Admin</span>
                </div>
              </div>
            </Link>
          </li>
          <li className="menu-bottom">
            <button onClick={() => logout()} className=" button-logout">
              <i className="bx bx-log-out"></i>
              <span className="links_name">Log out</span>
            </button>
          </li>
        </div>
      </ul>
  </div>
    );
};

export default Sidebar;