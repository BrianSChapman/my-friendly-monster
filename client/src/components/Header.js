import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

export default function Header() {
  // const hideLogout = window.location.pathname === "/" || "/signup";
  if (Auth.loggedIn()) {
  return (
    <nav className="navbar navbar-expand-lg shadow-lg">
      <div className="container-fluid">
        <h1 className="title text-center">My Friendly Monster</h1>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <button
              className="nav-link logout-link hidden"
              href="/login"
              onClick={Auth.logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
  } else {
    return (
      <nav className="navbar navbar-expand-lg shadow-lg">
      <div className="container-fluid">
        <h1 className="title text-center">My Friendly Monster</h1>
        <ul className="nav justify-content-end">
          <li className="nav-item"></li>
        </ul>
      </div>
    </nav>
    )
  }
}