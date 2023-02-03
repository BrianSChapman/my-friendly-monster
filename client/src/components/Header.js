import React from "react";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
      <h1 className="title justify-content-center">My Friendly Monsters</h1>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">
              Create Monster
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Logout
            </a>
            <div className="navbar">
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
