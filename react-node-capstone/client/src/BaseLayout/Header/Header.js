import React, {useContext} from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import AuthContext from "../../Context/AuthContext";
import Avatar from "@material-ui/core/Avatar";
import Notifications from "./notifications/NotificationsIcon";


export default function Header(props) {

    const authContext = useContext(AuthContext);


    return (
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">

                <span className="mdl-layout__drawer-button">
                    <i className="material-icons">menu</i>
                </span>
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
                        <Link className="mdl-navigation__link" to="/profile">
                            My Profile
                        </Link>
                        <Link className="mdl-navigation__link" to="/profileView">
                            Profile
                        </Link>
                        <Link onClick={authContext.logout} className="mdl-navigation__link">
                            Logout
                        </Link>
                        <Link className="mdl-navigation__link">
                            <Notifications/>
                        </Link>
                    </nav>

                    <button
                        className="mdl-layout--small-screen-only mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon large-icon-button"
                        id="hdrbtn">
                        <i className="material-icons large-icon">more_vert</i>
                    </button>

                    <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right" htmlFor="hdrbtn">
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
                        <Link to="/profile">
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
