import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <h1 className="text-white text-lg font-bold">Task Management</h1>
      <button
        className="text-white"
        onClick={() => navigate("/")}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;