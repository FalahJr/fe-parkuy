import React from 'react';
// import './DropdownMenu.css';
import { FaLayerGroup} from "react-icons/fa";
import {NavLink} from "react-router-dom";


interface DropdownMenuProps {
	linkTo?: string;
	title?: React.ReactNode;
	style?: {};
	onClick?: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
	linkTo="",
    title="",
	style = {},
	onClick,
}) => {
	return (
        <li className="">
          <NavLink
          to={linkTo}
          className={({ isActive }) =>
            isActive ? 'active top' : 'top'
          }
          >
            {/* <i><FaLayerGroup /></i> */}
            <i></i>

            <span className="links_name">{title}</span>

          </NavLink>
        </li>
	);
};

export default DropdownMenu;
