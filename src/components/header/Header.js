import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './header.css';
import logo from '../../assets/images/logo.svg';


export default class Header extends Component {

    render() {
        return (
              <nav>
                <ul className="header-bar">
                    <NavLink to="/" className="logo-container">
                        <img className="app-logo" src={logo} alt="logo"/>
                    </NavLink>
                    <div className="navigation-bar">
                    <li>
                        <NavLink to="/">Weather map</NavLink>
                    </li>
                    <li>
                        <NavLink to="/different-cities">Live weather</NavLink>
                    </li>
                    </div>
                </ul>
              </nav>
        );
    }
}