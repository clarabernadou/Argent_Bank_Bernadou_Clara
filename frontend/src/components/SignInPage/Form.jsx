import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setToken } from '../../reducers/userReducer';
import axios from "axios";

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        { email: email, password: password },
        { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
      );
  
      if (response.data.body.token) {
        const token = response.data.body.token;
        dispatch(setToken({ token: token, isChecked: isChecked }));
        navigate('/profile');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
  );
}
