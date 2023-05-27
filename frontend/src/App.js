import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './main.css'

import SignIn from "./pages/SignIn";
import UserPage from "./pages/User";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/sign-in" element={<SignIn /> } />
        <Route path="/user" element={<UserPage /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
