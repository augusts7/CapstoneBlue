import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <div>
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger">
      <NavLink className="navbar-brand" to="/">
        Comm System
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/Login">
              <a href="google.com" className="nav-link">Calender</a>
            </NavLink>
          </li>
        </ul>
      </div>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="collapsibleNavbar"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/Login">
              <a href="google.com" className="nav-link">Hello. Sign in here</a>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Header;
