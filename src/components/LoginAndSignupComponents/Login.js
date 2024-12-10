import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loginData = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch("http://localhost:3005/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Get error details from server
        throw new Error(errorData.message || "Login failed. Please check your credentials.");
      }

      const responseData = await response.json();

      // Store user details and token in localStorage
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("userId", responseData.user._id);
      localStorage.setItem("userFullName", responseData.user.FullName);
      localStorage.setItem("userRole", responseData.user.Role);

      // Navigate based on user role
      switch (responseData.user.Role) {
        case "Donor":
          navigate("/home");
          break;
        case "Admin":
          navigate("/admin");
          break;
        case "NGO":
          navigate("/ngodashboard");
          break;
        case "GroceryShop":
          navigate("/grocerydashboard");
          break;
        default:
          navigate("/home"); // Fallback navigation
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset Password Functionality
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError("");
    setResetSuccess("");

    const resetData = {
      Email: resetEmail,
      NewPassword: newPassword,
    };

    try {
      const response = await fetch("http://localhost:3005/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to reset password.");
      }

      setResetSuccess(responseData.message);
      setResetEmail("");
      setNewPassword("");
    } catch (err) {
      setResetError(err.message || "An error occurred while resetting the password.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src="/box.png" alt="Logo" className="w-32 h-32" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center space-x-4 mb-6">
          <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <FaGoogle className="text-red-500" size={20} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <FaFacebook className="text-blue-600" size={20} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors">
            <FaApple className="text-gray-800" size={20} />
          </button>
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="mx-2 text-gray-500">•</span>
          <button
            onClick={() => setShowResetPasswordModal(true)}
            className="text-blue-500 hover:underline"
          >
            Forgot password?
          </button>
          <span className="mx-2 text-gray-500">•</span>
          <a href="/signup" className="text-blue-500 hover:underline">
            New user? Sign up
          </a>
        </div>
      </div>

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-80">
            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
            {resetError && <p className="text-red-500 mb-2">{resetError}</p>}
            {resetSuccess && <p className="text-green-500 mb-2">{resetSuccess}</p>}
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Reset Password
              </button>
            </form>
            <button
              onClick={() => setShowResetPasswordModal(false)}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
