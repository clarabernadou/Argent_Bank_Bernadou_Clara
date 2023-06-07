import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from 'redux-persist/integration/react';
import "./main.css";

import SignIn from "./pages/SignIn";
import ProfilePage from "./pages/Profile";
import Home from "./pages/Home";

function App() {
  const token = localStorage.getItem('token');

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={token ? <Navigate to="/profile" /> : <Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
