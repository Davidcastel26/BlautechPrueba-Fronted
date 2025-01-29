import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../lib/api";
import { useAuth } from "../context/auth-context";
import { LoggedUserResponse } from "../typescript/interfaces";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post<LoggedUserResponse>(
        `/auth/login`,
        JSON.stringify({ userName, password, expiresInMins: 5 }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data =  response.data;

      if (response.status) {
        login(data.accessToken); // Pasa el token al contexto de autenticación
      } else {
        setError(response.statusText || "Login failed");
      }
    } catch (err) {
      setError("Error connecting to the server");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 bg-white p-6 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userName" className="block text-sm font-medium mb-2">
            Username
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 underline hover:text-blue-700"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
