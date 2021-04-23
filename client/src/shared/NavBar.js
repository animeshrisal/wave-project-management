import React from "react";
import { NavLink } from 'react-router-dom';

const NavBar = () => {

    const removeToken = () => {
        localStorage.removeItem('user')
    } 
    return (
    <React.Fragment>
        <NavLink to="/projects">Project</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/" onClick={removeToken}>Logout</NavLink>
    </React.Fragment>
    )   
}


export default NavBar;