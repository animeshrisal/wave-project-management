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
            <NavLink activeClassName="selected-nav-item" className="nav-item" to="/projects">Project</NavLink>
            <NavLink activeClassName="selected-nav-item" className="nav-item"to="/profile">Account</NavLink>
            { state.isAuthenticated && <NavLink activeClassName="selected-nav-item" className="nav-item"to="/" onClick={logoutUser}>Logout</NavLink> }
        </ul>
    )   
}


export default NavBar;