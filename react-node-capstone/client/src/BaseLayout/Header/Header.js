import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";
import ls from "local-storage";

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        ls.set("isLoggedIn", false);
        ls.set("user_type", "");
        window.location = "/login";
    }

    render() {

        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title white">
                        ULM Scheduling Application
          </span>

                    <div className="mdl-layout-spacer"></div>


                    <div>
                        <nav className="mdl-navigation mdl-layout--large-screen-only header-nav">
                            <Link className="mdl-navigation__link" to="/">
                                Home
                            </Link>
                            <Link className="mdl-navigation__link" to="/calendar">
                                Calendar
                            </Link>
                            <Link className="mdl-navigation__link" to="/profile">
                                My Profile
                            </Link>
                            <Link className="mdl-navigation__link" to="/login" onClick={this.logout}>
                                Logout
                            </Link>
                        </nav>

                        <button
                            className="mdl-layout--small-screen-only mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon large-icon-button"
                            id="hdrbtn"
                        >
                            <i className="material-icons large-icon">more_vert</i>
                        </button>

                        <ul
                            className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right"
                            htmlFor="hdrbtn"
                        >
                            <Link to="/">
                                <li className="mdl-menu__item">
                                    <i className="material-icons">home</i>Home

                                </li>
                            </Link>
                            <Link to="/calendar">
                                <li className="mdl-menu__item">
                                    <i className="material-icons">calendar_today</i>Calendar

                                </li>
                            </Link>
                            <Link to="/profile">
                                <li className="mdl-menu__item">
                                    <i className="material-icons">face</i>My Profile

                                </li>
                            </Link>
                            <Link to="login" onClick={this.logout}>
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
}

export default Header;
