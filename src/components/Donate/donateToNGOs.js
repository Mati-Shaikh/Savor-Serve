import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { FaUser, FaSignOutAlt, FaHome, FaCheckCircle } from "react-icons/fa";
import Footer from "../LandingPageComponents/Footer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black font-bold text-3xl">Savor & Serve</div>
        <div className="hidden md:flex space-x-8">
          <a href="/home" className="text-black font-bold text-xl flex items-center">
            <FaHome className="mr-2" /> Home
          </a>
          <a href="/donatetongo" className="text-black font-bold text-xl flex items-center">
            NGOs
          </a>
          <a href="/donatetoSupplier" className="text-black font-bold text-xl flex items-center">
            GroceryShop
          </a>
          <a href="/voucherCreation" className="text-black font-bold text-xl flex items-center">
            VoucherManagement
          </a>
          
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black p-2 rounded hover:bg-gray-100 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isOpen && (
            <div className="absolute right-0 w-48 bg-white rounded-md shadow-lg py-1 z-10">
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUser className="mr-2" /> Account
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const NGOsComponent = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [amount, setAmount] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const token = localStorage.getItem("token");

  const fetchNgos = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/donor/donate/getNgos", {
        headers: { token },
      });
      setNgos(response.data.ngos);
    } catch (error) {
      console.error("Error fetching NGOs:", error.message);
    }
  };

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:3005/api/donor/donate/donatetoNGO",
        { amount, ngoId: selectedNgo },
        { headers: { token } }
      );
      setMessage("Donation successful!");
      setDonationSuccess(true);
      setModalOpen(false);
      setAmount("");
      fetchNgos();
    } catch (error) {
      console.error("Error donating:", error.message);
      setMessage("Failed to donate. Please try again.");
    }
  };

  useEffect(() => {
    if (donationSuccess) {
      const timer = setTimeout(() => {
        setDonationSuccess(false);
      }, 3000);
  
      return () => clearTimeout(timer); // Cleanup timer on unmount or re-trigger
    }
  }, [donationSuccess]);

  const openDonateModal = (ngoId) => {
    setSelectedNgo(ngoId);
    setModalOpen(true);
    setMessage(null);
  };

  const openViewDetailsModal = (ngo) => {
    setSelectedNgo(ngo);
    setViewDetailsOpen(true);
  };

  useEffect(() => {
    fetchNgos();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">NGOs List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ngos.map((ngo) => (
            <div key={ngo._id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 text-white font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-full">
                  {ngo.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{ngo.name}</h2>
                  <p className="text-gray-600">{ngo.description}</p>
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={() => openViewDetailsModal(ngo)}
                >
                  View Details
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={() => openDonateModal(ngo._id)}
                >
                  Donate
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Donate Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Donate to NGO</h2>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full border border-gray-300 rounded p-2 mb-4"
              />
              {message && <p className="text-red-500">{message}</p>}
              <div className="flex justify-end space-x-4">
                <button onClick={() => setModalOpen(false)} className="bg-gray-300 py-2 px-4 rounded">
                  Cancel
                </button>
                <button
                  onClick={handleDonate}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {viewDetailsOpen && selectedNgo && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">{selectedNgo.name}</h2>
              <p><strong>Registration Number:</strong> {selectedNgo.registrationNumber}</p>
              <p><strong>Description:</strong> {selectedNgo.description}</p>
              <p><strong>Phone:</strong> {selectedNgo.phone}</p>
              <p><strong>Address:</strong> {selectedNgo.address}</p>
              <p><strong>Website:</strong> <a href={selectedNgo.website} className="text-blue-500">{selectedNgo.website}</a></p>
              <button
                onClick={() => setViewDetailsOpen(false)}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {donationSuccess && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
              <FaCheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <p className="text-lg font-bold">Donation successful!</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default NGOsComponent;
