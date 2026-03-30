import axios from "axios";

const configuredBaseURL = import.meta.env.VITE_API_BASE_URL?.trim();
const defaultBaseURL = import.meta.env.PROD
  ? "https://twodo-mern.onrender.com/api"
  : "http://localhost:5000/api";
const normalizedBaseURL = (configuredBaseURL || defaultBaseURL).replace(/\/+$/, "");

const baseURL = normalizedBaseURL.endsWith("/api")
  ? normalizedBaseURL
  : `${normalizedBaseURL}/api`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
