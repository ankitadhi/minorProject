import { useState, useContext } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const Login = () => {
  const [loggedIn, setLoggedIn] = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = () => navigate("/register");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      setLoggedIn(true);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError("Invalid username or password");
      console.log("error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-500">Please sign in to continue</p>
          </div>

          {error && (
            <div className="bg-red-50 p-3 rounded-lg flex items-center gap-2 text-red-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-blue-700 transition-all transform hover:scale-[1.01]"
          >
            Sign In
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={handleClick}
              className="text-teal-600 hover:text-teal-800 font-semibold underline underline-offset-2 transition-colors"
            >
              Create account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
