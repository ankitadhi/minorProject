import axios from "axios"; // Remove the curly braces

const API = axios.create({
  baseURL: "http://127.0.0.1:8080/api/",
});

export const login = (credentials) => API.post("/login/", credentials);
export const register = (data) => API.post("/register/", data)