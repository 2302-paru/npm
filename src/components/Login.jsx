import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user._id); // use _id here

      if (res.data.user.role === "mentor") {
        navigate("/mentor-dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg flex flex-col gap-6"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-4">Login</h1>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        >
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select>

        <button
          type="submit"
          className="w-full p-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
