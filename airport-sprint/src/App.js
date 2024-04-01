import "./App.css";
import React, { useState } from "react";

import Home from "./components/Home";
import Admin from "./components/Admin";
import Login from "./components/Login";

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
        </Routes>

      </Router>
    </div>
  );
}
export default App;