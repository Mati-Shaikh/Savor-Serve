import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { FaUser, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../LandingPageComponents/Footer";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
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
                            <a
                                href="/settings"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <FaCog className="mr-2" /> Settings
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


const DonateToSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [amount, setAmount] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token"); // Replace with actual token

  // Fetch all suppliers
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/api/donor/donate/getSupplier",
        {
          headers: {
            token: token,
          },
        }
      );
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.error("Error fetching suppliers:", error.message);
    }
  };

  // Handle donation submission
  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      setMessage("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:3005/api/donor/donate/donatetoSupplier",
        {
          amount,
          supplierId: selectedSupplier,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      setMessage("Donation successful!");
      setModalOpen(false);
      setAmount("");
      fetchSuppliers(); // Refresh suppliers data
    } catch (error) {
      console.error("Error donating:", error.message);
      setMessage("Failed to donate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Open modal for donation
  const openModal = (supplierId) => {
    setSelectedSupplier(supplierId);
    setModalOpen(true);
    setMessage(null);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setAmount("");
    setMessage(null);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <>
    
    <Navbar />
    <div className="container mx-auto p-6">
         
      <h1 className="text-3xl font-bold text-center mb-6">Suppliers List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suppliers.map((supplier) => (
          <div
            key={supplier._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold">{supplier.storeName}</h2>
              <p className="text-gray-600">{supplier.address}</p>
              <p className="text-gray-600 mt-2">
                <strong>Contact:</strong> {supplier.contactNumber}
              </p>
              <p className="text-gray-600">
                <strong>Bank Name:</strong> {supplier.bankDetails.bankName}
              </p>
              <p className="text-gray-600">
                <strong>Account Number:</strong> {supplier.bankDetails.accountNumber}
              </p>
            </div>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => openModal(supplier._id)}
            >
              Donate
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Donate to Supplier</h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />
            {message && <p className="text-red-500 mb-4">{message}</p>}
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`${
                  loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
                } text-white font-bold py-2 px-4 rounded`}
                onClick={handleDonate}
                disabled={loading}
              >
                {loading ? "Processing..." : "Donate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default DonateToSupplier;
