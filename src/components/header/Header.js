import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import './header.css';
import logo from '../../assets/logo.svg';


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
                        <NavLink to="/map">Weather map</NavLink>
                    </li>
                    <li>
                        <NavLink to="/different-cities">Weather by cities</NavLink>
                    </li>
                    </div>
                </ul>
              </nav>
        );
    }
}