import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVg2o6XAUE05cIl5s09KhLfxMNH56aeKE",
  authDomain: "authentication-51789.firebaseapp.com",
  projectId: "authentication-51789",
  storageBucket: "authentication-51789.appspot.com",
  messagingSenderId: "921096435188",
  appId: "1:921096435188:web:12c9a200a2374035eb35a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
        throw new Error("Login failed. Please check your credentials.");
      }

      const responseData = await response.json();
      localStorage.setItem("token", responseData.token); // Store JWT token
      localStorage.setItem("userId", responseData.user._id); // Store user ID
      localStorage.setItem("userFullName", responseData.user.FullName); // Store full name
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Access the user information from the result object
      const user = result.user;

      // Log the user object to the console to see its structure and data
      console.log("Google Login successful:", user);

      // Storing the user in localStorage (optional for user persistence)
      localStorage.setItem("user", JSON.stringify(user));
      // Redirect to dashboard
      navigate("/home");
    } catch (err) {
      setError("Google Login failed. Please try again.");
      console.error("Google Login Error:", err); // Log any errors that might occur during the process
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src="/box.png" alt="Logo" className="w-32 h-32" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
          >
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
          <a href="/resetpassword" className="text-blue-500 hover:underline">
            Reset password
          </a>
          <span className="mx-2 text-gray-500">•</span>
          <a href="/signup" className="text-blue-500 hover:underline">
            New user? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
