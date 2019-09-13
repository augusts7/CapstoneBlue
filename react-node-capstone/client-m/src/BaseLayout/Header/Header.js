import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title white">ULM Event Scheduler</span>

          <div className="mdl-layout-spacer"></div>

          <div>
            <nav className="mdl-navigation mdl-layout--large-screen-only header-nav">
              {/*
              <li id="a_options" className="mdl-navigation__link">
                <div className="cursor">
                  Appointments
                  <span>
                    <i className="material-icons">keyboard_arrow_down</i>
                  </span>
                </div>
              </li>
              */}
              <Link className="mdl-navigation__link" to="/">
                Home
              </Link>
              <Link className="mdl-navigation__link" to="/addStudents">
                Event Page
              </Link>
              <li id="t_options" className="mdl-navigation__link">
                <div className="cursor">
                  User Profile
                  <span>
                    <i className="material-icons">keyboard_arrow_down</i>
                  </span>
                </div>
              </li>
            </nav>

            <ul
              className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right"
              for="t_options"
            >
              <Link to="/Login">
                <li className="mdl-menu__item">
                  <i className="material-icons">exit_to_app</i>Login
                </li>
              </Link>
              <Link to="/Register">
                <li className="mdl-menu__item">
                  <i className="material-icons">add</i>Register
                </li>
              </Link>
            </ul>

            <ul
              className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right"
              for="a_options"
            >
              <Link to="/calendar">
                <li className="mdl-menu__item">
                  <i className="material-icons">done_all</i>View all timeslots
                </li>
              </Link>
              <Link to="/calendar">
                <li className="mdl-menu__item">
                  <i className="material-icons">add</i>Add New Timeslots
                </li>
              </Link>
            </ul>

            <button
              className="mdl-layout--small-screen-only mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--icon large-icon-button"
              id="hdrbtn"
            >
              <i className="material-icons large-icon">more_vert</i>
            </button>

            <ul
              className="mdl-menu mdl-js-menu mdl-js-ripple-effect mdl-menu--bottom-right"
              for="hdrbtn"
            >
              <Link to="/calendar">
                <li className="mdl-menu__item">
                  <i className="material-icons">home</i>Home
                </li>
              </Link>
              <Link to="/admin/">
                <li className="mdl-menu__item">
                  <i className="material-icons">assessment</i>Admin
                </li>
              </Link>
              <Link to="/calendar">
                <li className="mdl-menu__item">
                  <i className="material-icons">done_all</i>View all
                  appointments
                </li>
              </Link>

              <Link to="/calendar">
                <li className="mdl-menu__item">
                  <i className="material-icons">add</i>Set a new Appointment
                </li>
              </Link>
              <Link to="/profile">
                <li className="mdl-menu__item">
                  <i className="material-icons">done_all</i>View all timeslots
                </li>
              </Link>

              <Link to="/dayView">
                <li className="mdl-menu__item">
                  <i className="material-icons">add</i>Add New Timeslots
                </li>
              </Link>
              <Link to="/dayView">
                <li className="mdl-menu__item">
                  <i className="material-icons">remove_circle</i>Log Out
                </li>
              </Link>
            </ul>
          </div>
        </div>

        <div
          id="p"
          className="progress-bar mdl-progress mdl-js-progress mdl-progress__indeterminate"
        ></div>
      </header>
    );
  }
}

export default Header;
