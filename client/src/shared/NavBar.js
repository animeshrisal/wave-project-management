import React from "react";
import { NavLink, Redirect } from 'react-router-dom';
import "./NavBar.scss";

const NavBar = () => {

    const logoutUser = () => {
        localStorage.removeItem('user')
    } 

    return (
        <ul className="nav-list">
            <NavLink activeClassName="selected-nav-item" className="nav-item" to="/projects">Project</NavLink>
            <NavLink activeClassName="selected-nav-item" className="nav-item"to="/profile">Account</NavLink>
            <NavLink activeClassName="selected-nav-item" className="nav-item"to="/" onClick={logoutUser()}>Logout</NavLink>
        </ul>
    )   
}


export default NavBar;