import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../reducers/userReducer';

import argentBankLogo from '../img/argentBankLogo.png'

const logout = async(e) => {
  e.preventDefault()
  localStorage.clear();
  window.location.href = "/";
}

export default function UserPage() {
  const { firstName, lastName } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUserData = async () => {
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

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="" onClick={logout}>
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="./profile">
            <i className="fa fa-user-circle"></i>
            Tony
          </a>
          <a className="main-nav-item" href="" onClick={logout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}
