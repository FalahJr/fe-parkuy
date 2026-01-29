import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { storageService, pengendaraService } from "../../services";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = storageService.getToken();
    const idPengendara = localStorage.getItem("ID_PENGENDARA");

    if (token && idPengendara) {
      setIsLoggedIn(true);
      fetchProfileData(idPengendara);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchProfileData = async (idPengendara: string) => {
    try {
      const response =
        await pengendaraService.getDetailPengendara(idPengendara);

      console.log("Profile data fetched:", response.data);
      if (response.data) setProfileData(response.data);
    } catch (err) {
      console.error("Fetch profile error:", err);
    }
  };

  const handleLogout = () => {
    storageService.removeToken();
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("ID_PENGENDARA");
    navigate("/");
    window.location.reload();
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.length >= 2 ? parts[0][0] + parts[1][0] : name.substring(0, 2);
  };

  return (
    <nav>
      <div className="header">
        <div className="header-logo">
          <div className="img-logo">
            <img src="assets/img/Content/logo.png" alt="Logo" />
          </div>
        </div>
        <div className="togglers">
          <button type="button" className="icon" onClick={() => {}}>
            <i className="fa fa-bars"></i>
          </button>
        </div>
        <ul className="list" id="myTopnav">
          {/* <li className="item">
            <button
              type="button"
              className="navbar_link"
              onClick={() => navigate("/pengendara/location-search")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                font: "inherit",
              }}
            >
              Cari Area Parkir
            </button>
          </li> */}
          <li className="item">
            <a href="#destination" className="navbar_link">
              Gabung Jadi Petugas
            </a>
          </li>
          <li className="item">
            <a href="#event" className="navbar_link">
              Kontak
            </a>
          </li>

          {isLoggedIn ? (
            <li className="item profile-item" ref={dropdownRef}>
              <div
                className="profile-trigger"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <div className="profile-avatar">
                  {profileData?.fullName
                    ? getInitials(profileData.fullName).toUpperCase()
                    : "U"}
                </div>
                <svg
                  className={`dropdown-arrow ${showDropdown ? "open" : ""}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7 10l5 5 5-5z" />
                </svg>
              </div>

              {showDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-header">
                    <div className="dropdown-avatar">
                      {profileData?.fullName
                        ? getInitials(profileData.fullName).toUpperCase()
                        : "U"}
                    </div>
                    <div className="dropdown-info">
                      <p className="dropdown-name">
                        {profileData?.fullName || "User"}
                      </p>
                      <p className="dropdown-email">
                        {profileData?.user?.email || ""}
                      </p>
                    </div>
                  </div>
                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate("/pengendara/edit-profile");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    Edit Profil
                  </button>
                  <button
                    className="dropdown-item logout"
                    onClick={handleLogout}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li className="item">
              <a href="/pengendara/login" className="navbar_link login-btn">
                Login
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
