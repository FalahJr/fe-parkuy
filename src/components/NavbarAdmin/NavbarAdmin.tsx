import React from "react";
import { FaSearch , FaSlidersH, FaAlignJustify} from "react-icons/fa";
import './NavbarAdmin.css';


interface NavbarAdminProps {
	title?: string;
	// color?: string;
	// size?: string;
	// type?: string;
	// icon?: string;
	// iconSize?: number;
	style?: {};
	onClick?: () => void;
}

const NavbarAdmin: React.FC<NavbarAdminProps> = ({
	title = 'Selamat Evening',
	// size = 'medium',
	// type = 'normal',
	// icon = '',
	// iconSize = 30,
	style = {},
	onClick,
}) => {
	return (
        <nav>
            <div className="sidebar-button">
                <i className="bx bx-menu sidebarBtn">
                    <FaAlignJustify/>
                </i>
                <span className="title-dashboard">
                    {title}
                </span>
                <i className="filterBtn">
                    <FaSlidersH/>
                </i>

            </div>
            {/* <div className="profile-details">
                <form className="search">
                <input type="text" placeholder="Search.." name="search" />
                <button type="submit">
                    <FaSearch/>
                </button>
                </form>
            </div> */}
        </nav>
    );
};

export default NavbarAdmin;