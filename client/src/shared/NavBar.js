import React from "react";
import { NavLink } from 'react-router-dom';
import "./NavBar.scss";

const NavBar = () => {

    const removeToken = () => {
        localStorage.removeItem('user')
    } 
    return (
        <ul className="nav-list">
            <li className="nav-item"><a href="#">Home</a></li>
            <li className="nav-item"><a href="#">Account</a></li>
        </ul>
    )   
}


export default NavBar;