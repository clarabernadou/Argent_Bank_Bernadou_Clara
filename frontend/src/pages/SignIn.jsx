import React, { useState } from "react";
import axios from "axios";

import argentBankLogo from '../img/argentBankLogo.png'

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async(e) => {
    e.preventDefault()
    console.log(username, password);
    const response = await axios.post("http://localhost:3001/api/v1/user/login", {"username": username, "password": password});
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
      console.log(response.data.token);
    } else {
      console.log("bad email or bad password");
    }
  }

  return (
    <div>
      <nav className="main-nav">
        <a className="main-nav-logo" href="./">
          <img
            className="main-nav-logo-image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
          <a className="main-nav-item" href="./sign-in">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        </div>
      </nav>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form action="/login" method="post">
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {/* PLACEHOLDER DUE TO STATIC SITE */}
            <a onClick={login} className="sign-in-button">Sign In</a>
            {/* SHOULD BE THE BUTTON BELOW */}
            {/* <button className="sign-in-button">Sign In</button> */}
            {/*  */}
          </form>
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}
