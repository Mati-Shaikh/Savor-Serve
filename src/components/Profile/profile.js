import React, { useState, useEffect } from "react";
//import { FaEnvelope, FaBirthdayCake, FaSave } from 'react-icons/fa';
import { Menu, X } from "lucide-react";
import Footer from "../LandingPageComponents/Footer";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaHome,
  FaEnvelope,
  FaBirthdayCake,
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // navigate to login page
    navigate("/");
  };

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between">
        {/* Structify Logo and Home Link */}
        <div className="flex items-center ml-8">
          <div className="text-black font-bold text-3xl flex items-center">
            Structify
          </div>
          <div className="flex ml-24">
            <a
              href="/home"
              className="text-black font-bold text-xl flex items-center relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-black after:left-0 after:bottom-[-2px] after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              <FaHome className="mr-2" />
              Home
            </a>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className="relative">
          <button
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="text-black p-2 rounded hover:bg-white transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div
              className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaUser className="mr-2" /> Account
              </a>
              <a
                href="/"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaCog className="mr-2" /> Settings
              </a>
              <a
                onClick={handleLogout}
                className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const PersonalInfoPage = () => {
  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3005/api/auth/getProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: localStorage.getItem("token"), // Assuming you store token in local storage
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
        alert("Error fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3005/api/auth/updateProfile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"), // Assuming you store token in local storage
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data");
      }

      const updatedUser = await response.json();
      localStorage.setItem(
        "userFullName",
        updatedUser.FirstName + " " + updatedUser.LastName
      );
      setUser(updatedUser); // Update state with the new user data
      alert("Personal info updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Error updating user data.");
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8" style={{ width: "60%" }}>
        <h1 className="text-2xl font-bold mb-6">Personal info</h1>
        <div>
          <hr style={{ border: "0.5px solid black" }} />
        </div>
        <div className="bg-white rounded p-6">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="FirstName"
                >
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="FirstName"
                  type="text"
                  name="FirstName"
                  value={user.FirstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block text-gray-700 text-sm font-semibold mb-2"
                  htmlFor="LastName"
                >
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="LastName"
                  type="text"
                  name="LastName"
                  value={user.LastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-semibold mb-2"
                htmlFor="Age"
              >
                Age <span className="text-red-500">*</span>
              </label>
              <input
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Age"
                type="number"
                name="Age"
                value={user.Age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex items-center">
              <button
                className="hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline border-2"
                type="submit"
              >
                Update personal info
              </button>
              <p className="ml-4 text-sm text-gray-600">
                By clicking "Update personal info", I acknowledge that all{" "}
                <br /> information submitted above is factually correct.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoPage;
