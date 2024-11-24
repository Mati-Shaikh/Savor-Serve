import React, { useState, useEffect } from 'react';
import { Menu, Check, X, AlertCircle } from 'lucide-react';
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

const NGORegistrationForm = () => {
    const navigate = useNavigate();
  // State for form data
  const [ngoProfile, setNgoProfile] = useState({
    name: '',
    phone: '',
    address: '',
    website: '',
    description: ''
  });

  // State for form validation and progress
  const [validationErrors, setValidationErrors] = useState({});
  const [progress, setProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredNgoDetails, setRegisteredNgoDetails] = useState(null);

  // Validation function
  const validateForm = () => {
    const errors = {};
    let completedFields = 0;
    const totalFields = Object.keys(ngoProfile).length;

    // Name validation
    if (!ngoProfile.name.trim()) {
      errors.name = "NGO Name is required";
    } else {
      completedFields++;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{11}$/;
    
      completedFields++;

    // Address validation
    if (ngoProfile.address.trim().length < 5) {
      errors.address = "Address is too short";
    } else {
      completedFields++;
    }

    // Website validation (optional but with format check if provided)
    if (ngoProfile.website && !/(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(ngoProfile.website)) {
      errors.website = "Invalid website format";
    } else if (ngoProfile.website) {
      completedFields++;
    }

    // Description validation
    if (ngoProfile.description.trim().length < 20) {
      errors.description = "Description must be at least 20 characters";
    } else {
      completedFields++;
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
    setNgoProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Trigger immediate validation
    validateForm();
  };

  // NGO Registration Handler
  const handleNGORegistration = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing");
      }
  
      // Generate a unique 13-digit CNIC
      const generateUniqueCnic = () => {
        const timestampPart = Date.now().toString().slice(-9); // Last 9 digits of timestamp
        const randomPart = Math.floor(Math.random() * 9000 + 1000).toString(); // Random 4 digits
        return timestampPart + randomPart; // Combine to make 13 digits
      };
  
      const uniqueCnic = generateUniqueCnic();
  
      const requestBody = {
        name: ngoProfile.name,
        registrationNumber: ngoProfile.name.replace(/\s+/g, ""),
        description: ngoProfile.description,
        address: ngoProfile.address,
        phone: ngoProfile.phone,
        website: ngoProfile.website,
        impactees: [
          {
            name: "Initial Impactee",
            phone: "+1234567890",
            cnic: uniqueCnic,
          },
        ],
      };
  
      const response = await fetch("http://localhost:3005/api/ngo/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "token": token,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
      }
  
      const data = await response.json();
      console.log(data.ngo._id);
  
      // Store the ngoId in local storage
      localStorage.setItem("ngoId", data.ngo._id);
  
      // Set registered NGO details and show success modal
      setRegisteredNgoDetails(data.ngo);
      setShowSuccessModal(true);
  
    } catch (error) {
      // Show error dialog or toast
      alert(error.message);
    }
  };
  

  return (
    <>
    <Navbar />
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">NGO Registration</h2>
      
      {/* Progress Tracking */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Profile Completion</span>
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
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">NGO Name</label>
          <input
            type="text"
            name="name"
            value={ngoProfile.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border ${
              validationErrors.name 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 p-2`}
            placeholder="Enter NGO name"
          />
          {validationErrors.name && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <X className="mr-1 h-4 w-4" /> {validationErrors.name}
            </p>
          )}
        </div>

        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={ngoProfile.phone}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border ${
              validationErrors.phone 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 p-2`}
            placeholder="Enter 10-digit phone number"
          />
          {validationErrors.phone && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <X className="mr-1 h-4 w-4" /> {validationErrors.phone}
            </p>
          )}
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={ngoProfile.address}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border ${
              validationErrors.address 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 p-2`}
            placeholder="Enter NGO address"
          />
          {validationErrors.address && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <X className="mr-1 h-4 w-4" /> {validationErrors.address}
            </p>
          )}
        </div>

        {/* Website Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Website (Optional)</label>
          <input
            type="text"
            name="website"
            value={ngoProfile.website}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md border ${
              validationErrors.website 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 p-2`}
            placeholder="Enter website URL"
          />
          {validationErrors.website && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <X className="mr-1 h-4 w-4" /> {validationErrors.website}
            </p>
          )}
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={ngoProfile.description}
            onChange={handleInputChange}
            rows="4"
            className={`mt-1 block w-full rounded-md border ${
              validationErrors.description 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-300 focus:ring-blue-500'
            } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 p-2`}
            placeholder="Describe your NGO (minimum 20 characters)"
          />
          {validationErrors.description && (
            <p className="mt-1 text-xs text-red-600 flex items-center">
              <X className="mr-1 h-4 w-4" /> {validationErrors.description}
            </p>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            type="button"
            onClick={handleNGORegistration}
            className={`px-6 py-2 rounded-md transition-colors ${
              progress < 100 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            disabled={progress < 100}
          >
            {progress < 100 ? 'Complete All Fields' : 'Register NGO'}
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
              NGO Registered Successfully
            </h2>
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Your NGO <strong>{registeredNgoDetails?.name}</strong> has been registered in our system.
              </p>
            </div>
            <div className="flex justify-center">
            <button
      onClick={() => {
        setShowSuccessModal(false); // Hide modal
        navigate("/addCause"); // Navigate to the /addCause route
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

export default NGORegistrationForm;