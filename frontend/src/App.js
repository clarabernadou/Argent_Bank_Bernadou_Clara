import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import './main.css'

import SignIn from "./pages/SignIn";
import UserPage from "./pages/User";
import Home from "./pages/Home";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home /> } />
          <Route path="/sign-in" element={<SignIn /> } />
          <Route path="/profile" element={<UserPage /> } />
        </Routes>
      </BrowserRouter>      
    </Provider>
  );
}

export default App;
