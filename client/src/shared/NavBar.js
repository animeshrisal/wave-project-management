import React, { useState } from "react";
import { NavLink, Redirect } from 'react-router-dom';
import { useAuthentication } from "../context/AuthContext";
import "./NavBar.scss";

const NavBar = (props) => {

    const { state, dispatch } = useAuthentication()
    if (!state.isAuthenticated){
        return (
            <div/>
        )
    }

    const logoutUser = () => {
        dispatch({type: 'LOGOUT'})         
    }

    return (
         <ul className="nav-list">
            <NavLink activeClassName="selected-nav-item" className="nav-item" to="/projects">Projects</NavLink>
            <NavLink activeClassName="selected-nav-item" className="nav-item"to="/profile">Account</NavLink>
            <NavLink activeClassName="selected-nav-item" className="nav-item"to="/notification">Notifications</NavLink>
            <NavLink activeClassName="selected-nav-item" className="nav-item"to="/login"  onClick={logoutUser}>Logout</NavLink>
        </ul>
    )   
}


export default NavBar;