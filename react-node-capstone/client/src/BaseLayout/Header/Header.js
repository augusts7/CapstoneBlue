import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import AuthContext from "../../Context/AuthContext";
import Notifications from "./notifications/Notifications";
import Messages from "./messages/Messages";
import logo from "../../Application/images/logo.svg";

export default function Header(props) {

    const authContext = useContext(AuthContext);

    return (
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                <span className="logo"><img src ={logo} width="100em" height="80em" alt="logo"/></span>
                <span className="mdl-layout-title white">
                    ULM Scheduling Application
                        </span>
                <div className="mdl-layout-spacer"/>

                <div>
                    <nav className="mdl-navigation mdl-layout--large-screen-only header-nav">
                        <Link className="mdl-navigation__link" to="/">
                            Home
                        </Link>
                        <Link className="mdl-navigation__link" to="/calenderView">
                            Calendar
                        </Link>
                        <Link className="mdl-navigation__link" to="/groupView">
                            Groups
                        </Link>
                        <Link className="mdl-navigation__link" to="/eventsView">
                            Events
                        </Link>
                        <Link className="mdl-navigation__link" to="/profileView">
                            Profile
                        </Link>
                        <Link onClick={authContext.logout} className="mdl-navigation__link" to="/login">
                            Logout
                        </Link>
                        <Link className="mdl-navigation__link">
                            <Notifications/>
                        </Link>
                    </nav>

                    <button
                        className="mdl-layout--small-screen-only mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon large-icon-button"
                        id="menu-lower-right">
                        <i className="material-icons large-icon">more_vert</i>
                    </button>

                    <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect" htmlFor="menu-lower-right">
                        <Link to="/">
                            <li className="mdl-menu__item">
                                <i className="material-icons">home</i>Home
                            </li>
                        </Link>

                        <Link to="/calenderView">
                            <li className="mdl-menu__item">
                                <i className="material-icons">calendar_today</i>Calendar
                            </li>
                        </Link>
                        <Link to="/groupView">
                            <li className="mdl-menu__item">
                                <i className="material-icons">group</i>Groups
                            </li>
                        </Link>
                        <Link to="/eventsView">
                            <li className="mdl-menu__item">
                                <i className="material-icons">group</i>Events
                            </li>
                        </Link>
                        <Link to="/profileView">
                            <li className="mdl-menu__item">
                                <i className="material-icons">face</i>My Profile
                            </li>
                        </Link>
                        <Link onClick={authContext.logout}>
                            <li className="mdl-menu__item">
                                <i className="material-icons">remove_circle</i>Logout
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </header>
    );
}
