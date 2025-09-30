// src/api/index.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth", // your Express backend
});

// attach token automatically for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const signup = (formData) => API.post("/signup", formData);
export const login = (formData) => API.post("/login", formData);
