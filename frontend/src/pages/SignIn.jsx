import React, { useState } from "react";
import axios from "axios";

import MainNav from "../components/mainNav";
import Footer from "../components/Footer";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const login = async (e) => {
    e.preventDefault();
  
    const response = await axios.post(
      "http://localhost:3001/api/v1/user/login",
      { email: email, password: password },
      { 'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json' }
    );
  
    if (response.data.body.token) {
      if (isChecked) {
        localStorage.setItem("token", response.data.body.token);
      } else {
        sessionStorage.setItem("token", response.data.body.token);
      }
      window.location.href = "/profile";
    }
  };  

  return (
    <div>
      <MainNav />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form action="/login" method="post">
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input type="email" id="username" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" onChange={(e) => setIsChecked(e.target.checked)} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" onClick={login}>Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
