import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "mentee",
    interests: [],
  });

  const interestsOptions = ["HR", "Safety", "Business", "Technical"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestClick = (interest) => {
    setFormData((prev) => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(formData);
      localStorage.setItem("token", res.data.token);

      if (res.data.user.role === "mentor") {
        navigate("/mentor-dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
        Sign Up
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          required
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
        >
          <option value="mentee">Mentee</option>
          <option value="mentor">Mentor</option>
        </select>

        {formData.role === "mentee" && (
          <div className="flex flex-col gap-1">
            <span className="text-white font-semibold text-sm">
              Select your interests:
            </span>
            <div className="grid grid-cols-2 gap-2 mt-1">
              {interestsOptions.map((interest) => (
                <div
                  key={interest}
                  onClick={() => handleInterestClick(interest)}
                  className={`p-2 sm:p-3 text-center rounded-lg cursor-pointer border ${
                    formData.interests.includes(interest)
                      ? "bg-gray-700 text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full p-2 sm:p-3 bg-white rounded-lg text-black font-bold"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
