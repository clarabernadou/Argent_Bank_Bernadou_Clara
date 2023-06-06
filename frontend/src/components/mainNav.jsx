import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom"
import axios from "axios";
import argentBankLogo from "../img/argentBankLogo.png";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';

const logout = (e) => {
  e.preventDefault();
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};

export default function MainNav() {
  const { pathname } = useLocation();
  const { firstName } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, config);
      const userData = response.data.body;
      dispatch(setUser(userData));
    };

    fetchUserData();
  }, [dispatch]);

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
            {firstName}
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