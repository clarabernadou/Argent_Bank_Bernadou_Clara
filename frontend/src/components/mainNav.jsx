import React from "react";
import { Link, useLocation } from "react-router-dom";
import argentBankLogo from "../img/argentBankLogo.png";

const logout = (e) => {
  e.preventDefault();
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};

export default function MainNav() {
  const { pathname } = useLocation();

  if (pathname === "/" || pathname === "/sign-in") {
    return (
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      </nav>
    );
  }

  if (pathname === "/profile") {
    return (
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            Tony
          </Link>
          <a className="main-nav-item" href="/" onClick={logout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      </nav>
    );
  }

  return null;
}