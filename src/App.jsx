// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import ManagerPage from "./pages/ManagerPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/employee" element={<EmployeePage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Routes>
    </Router>
  );
};

export default App;
