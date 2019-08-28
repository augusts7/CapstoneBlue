import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <div>
    <nav class="navbar navbar-expand-sm navbar-dark bg-danger">
      <NavLink class="navbar-brand" to="/">
        Comm System
      </NavLink>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item">
            <NavLink to="/Login">
              <a href="google.com" class="nav-link">Calender</a>
            </NavLink>
          </li>
        </ul>
      </div>

      <div
        class="collapse navbar-collapse justify-content-end"
        id="collapsibleNavbar"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <NavLink to="/Login">
              <a href="google.com" class="nav-link">Hello. Sign in here</a>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Header;
