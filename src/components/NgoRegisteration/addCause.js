import React, { useState, useEffect } from 'react';
import { Menu , Check, X, AlertCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Footer from '../LandingPageComponents/Footer';

import {
    FaUser,
    FaCog,
    FaSignOutAlt,
    FaHome,
    FaEnvelope,
    FaBirthdayCake,
    FaSave,
  } from "react-icons/fa";
  const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.clear();
      navigate("/"); // Redirect to login page
    };
  
    return (
      <nav className="bg-white p-4">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center ml-8">
            <div className="text-black font-bold text-3xl flex items-center">
              Savor and Serve
            </div>
          </div>
  
          <div className="relative">
            <button
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
              className="text-black p-2 rounded hover:bg-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
  
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

const AddCauseForm = () => {
    const navigate = useNavigate();
  // State for cause data
  const [newCause, setNewCause] = useState({
    title: "",
    description: "",
    goal: "",
    timeline: ""
  });

  // State for validation and progress
  const [validationErrors, setValidationErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedCauseDetails, setAddedCauseDetails] = useState(null);

  // Retrieve NGO ID from local storage
  const [ngoId, setNgoId] = useState(null);

  useEffect(() => {
    // Retrieve NGO ID when component mounts
    const storedNgoId = localStorage.getItem('ngoId');
    if (storedNgoId) {
      setNgoId(storedNgoId);
    } else {
      // Handle case where NGO ID is not found
      alert('Please register an NGO first');
    }
  }, []);

  // Validation function
  const validateForm = () => {
    const errors = {};
    let completedFields = 0;
    const totalFields = Object.keys(newCause).length;

    // Title validation
    if (!newCause.title.trim()) {
      errors.title = "Cause title is required";
    } else {
      completedFields++;
    }

    // Description validation
    if (newCause.description.trim().length < 20) {
      errors.description = "Description must be at least 20 characters";
    } else {
      completedFields++;
    }

    // Goal validation
    const goalNumber = parseFloat(newCause.goal);
    if (isNaN(goalNumber) || goalNumber <= 0) {
      errors.goal = "Goal must be a positive number";
    } else {
      completedFields++;
    }

    // Timeline validation
    if (!newCause.timeline) {
      errors.timeline = "Timeline is required";
    } else {
      // Additional check to ensure timeline is in the future
      const selectedDate = new Date(newCause.timeline);
      const today = new Date();
      if (selectedDate <= today) {
        errors.timeline = "Timeline must be in the future";
      } else {
        completedFields++;
      }
    }

    // Calculate progress
    const progressPercentage = Math.round((completedFields / totalFields) * 100);
    setProgress(progressPercentage);

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes with validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCause(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Trigger immediate validation
    validateForm();
  };

  // Add Cause Handler
  const handleAddCause = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }

      // Ensure we have an NGO ID
      if (!ngoId) {
        throw new Error("No NGO ID found. Please register an NGO first.");
      }

      const requestBody = {
        title: newCause.title,
        description: newCause.description,
        goal: parseFloat(newCause.goal),
        timeline: newCause.timeline
      };

      const response = await fetch(`http://localhost:3005/api/ngo/addcause/${ngoId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Cause addition failed: ${errorText}`);
      }

      const data = await response.json();
      
      // Set added cause details and show success modal
      setAddedCauseDetails(data.data);
      setShowSuccessModal(true);

      // Reset form
      setNewCause({ title: '', description: '', goal: '', timeline: '' });

    } catch (error) {
      // Show error dialog
      alert(error.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add Cause to NGO</h2>
      
      {/* Progress Tracking */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Cause Details Completion</span>
          <span className="text-sm font-medium text-blue-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full" 
            style={{width: `${progress}%`}}
          ></div>
        </div>
      </div>

      <form className="space-y-4">
        {/* Cause Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cause Title</label>
          <input
            type="text"
            name="title"
            value={newCause.title}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border ${
              validationErrors.title 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 p-2`}
            placeholder="Enter cause title"
          />
          {validationErrors.title && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <X className="mr-1 h-4 w-4" /> {validationErrors.title}
            </p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cause Description</label>
          <textarea
            name="description"
            value={newCause.description}
            onChange={handleInputChange}
            rows="4"
            className={`mt-1 block w-full rounded-md border ${
              validationErrors.description 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 p-2`}
            placeholder="Describe the cause in detail (minimum 20 characters)"
          />
          {validationErrors.description && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <X className="mr-1 h-4 w-4" /> {validationErrors.description}
            </p>
          )}
        </div>

        {/* Goal Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fundraising Goal</label>
          <input
            type="number"
            name="goal"
            value={newCause.goal}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border ${
              validationErrors.goal 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 p-2`}
            placeholder="Enter fundraising goal amount"
            min="0"
            step="0.01"
          />
          {validationErrors.goal && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <X className="mr-1 h-4 w-4" /> {validationErrors.goal}
            </p>
          )}
        </div>

        {/* Timeline Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Cause Timeline</label>
          <input
            type="date"
            name="timeline"
            value={newCause.timeline}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border ${
              validationErrors.timeline 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 p-2`}
          />
          {validationErrors.timeline && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <X className="mr-1 h-4 w-4" /> {validationErrors.timeline}
            </p>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="button"
            onClick={handleAddCause}
            className={`px-6 py-2 rounded-md transition-colors ${
              progress < 100 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            disabled={progress < 100}
          >
            {progress < 100 ? 'Complete All Fields' : 'Add Cause'}
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <Check className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
              Cause Added Successfully
            </h2>
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Your cause <strong>{addedCauseDetails?.title}</strong> has been added to your NGO.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Fundraising Goal: ${addedCauseDetails?.goal.toLocaleString()}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                    setShowSuccessModal(false);
                    navigate("/ngodashboard");
                }}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
     
    </div>
     <Footer/>
     </>
  );
};

export default AddCauseForm;