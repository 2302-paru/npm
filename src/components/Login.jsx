// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "mentee",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Redirect mentee or mentor accordingly
    if (formData.role === "mentee") {
      navigate("/home");
    } else {
      navigate("/mentor-dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <h1 className="text-4xl font-bold text-white mb-8">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg flex flex-col gap-6"
      >
        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
          required
        />

        {/* Role */}
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 text-white"
        >
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-white rounded-lg text-black font-bold hover:bg-gray-200 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
