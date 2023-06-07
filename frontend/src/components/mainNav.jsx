import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { setUser, deleteToken } from '../reducers/userReducer';

import argentBankLogo from "../img/argentBankLogo.png";

export default function MainNav() {
  const { pathname } = useLocation();
  const { firstName, token } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();
    dispatch(deleteToken());
    navigate('/');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      try {
        const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, config);
        const userData = response.data.body;
        dispatch(setUser(userData));
      } catch (error) {
        console.log(error);
      }
    };

    if (pathname === "/profile") {
      fetchUserData();
    }
  }, [dispatch, pathname]);

  if (pathname === "/" || pathname === "/sign-in") {
    return (
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/" onClick={logout}>
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
        <Link className="main-nav-logo" to="/" onClick={logout}>
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