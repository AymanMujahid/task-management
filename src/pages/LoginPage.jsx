import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "manager") {
          navigate("/manager");
        } else {
          navigate("/employee");
        }
      })
      .catch((err) => alert("Login failed."));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full mb-4"
        />
        <button
          onClick={handleLogin}
          className="p-2 bg-blue-600 text-white rounded w-full hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;