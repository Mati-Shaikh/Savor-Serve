import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Example admin key (in a real app, securely validate this on the server)
const ADMIN_KEY = "123456";

const AdminPage = () => {
  const [adminKey, setAdminKey] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes for OTP-style inputs
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && !isNaN(value)) {
      const newKey = [...adminKey];
      newKey[index] = value;
      setAdminKey(newKey);

      // Automatically move to the next input if the current one is filled
      if (index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        nextInput && nextInput.focus();
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredKey = adminKey.join("");
    if (enteredKey === ADMIN_KEY) {
      // Save admin session (optional)
      localStorage.setItem("isAdmin", true);
      navigate("/admin/dashboard"); // Navigate to admin dashboard page
    } else {
      setError("Invalid admin key. Please try again.");
      setAdminKey(Array(6).fill(""));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-2">
            {adminKey.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enter Admin Dashboard
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <a href="/" className="text-blue-500 hover:underline">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
