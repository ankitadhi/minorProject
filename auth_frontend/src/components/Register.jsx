import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).+$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one capital letter, one number, and one special character"
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await register({ username, email, password });
      setSuccessMessage("Registration Successful, Please Login");
      setTimeout(() => navigate("/login"), 2000);
      console.log("User Registered: ", response.data);
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || "Registration failed, Try again";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transition-all duration-300 hover:shadow-2xl">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Create an Account
            </h2>
            <p className="text-gray-500">Please sign up to get started</p>
          </div>

          {successMessage && (
            <div className="bg-green-50 p-3 rounded-lg flex items-center gap-2 text-green-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">{successMessage}</span>
            </div>
          )}

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
                Email
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

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
              <p className="text-xs text-gray-500 mt-1">
                Password must contain at least one capital letter, one number,
                and one special character.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-blue-700 transition-all transform hover:scale-[1.01]"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Sign Up"}
          </button>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-teal-600 hover:text-teal-800 font-semibold underline underline-offset-2 transition-colors"
            >
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
