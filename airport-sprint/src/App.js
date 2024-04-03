import "./App.css";
import React, { useState } from "react";

import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Arrivals from "./components/Arrivals";
import Departures from "./components/Departures";
import api from './api/axiosConfig';
import { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log("Logging in...");
    setIsLoggedIn(true);
  };
  
  return (
    <div className="app-wrapper">
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={isLoggedIn ? <Admin /> : <Navigate to ="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/arrivals" element={<Arrivals />} />
          <Route path="/departures" element={<Departures />} />
        </Routes>

      </Router>
    </div>
  );
}
export default App;