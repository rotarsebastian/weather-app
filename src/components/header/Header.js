import React, { Component } from "react";
import { Link } from "react-router-dom";
import './header.css';
import logo from '../../assets/logo.svg';


export default class Header extends Component {

    render() {
        return (
              <nav>
                <ul className="header-bar">
                    <Link to="/" className="logo-container">
                        <img className="app-logo" src={logo} alt="logo"/>
                    </Link>
                    <div className="navigation-bar">
                    <li>
                        <Link to="/different-cities">Weather in different cities</Link>
                    </li>
                    <li>
                        <Link to="/">Weather in Europe</Link>
                    </li>
                    </div>
                </ul>
              </nav>
        );
    }
}