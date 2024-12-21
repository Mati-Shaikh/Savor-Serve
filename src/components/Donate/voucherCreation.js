import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";
import { FaUser, FaCog, FaSignOutAlt, FaHome ,FaCheckCircle} from "react-icons/fa";
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

const VoucherCreation = () => {
  const [impactees, setImpactees] = useState([]);
  const [needyIndividuals, setNeedyIndividuals] = useState([]);
  const [activeTab, setActiveTab] = useState("impactees"); // "impactees" or "needy"
  const [selectedItem, setSelectedItem] = useState(null);
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch Impactees and Needy Individuals
  useEffect(() => {
    const fetchData = async () => {
      try {
        const impacteesRes = await axios.get("http://localhost:3005/api/admin/impactees", {
          headers: { token },
        });
        const needyRes = await axios.get("http://localhost:3005/api/needyInd/needy", {
          headers: { token },
        });
        setImpactees(impacteesRes.data.impactees);
        setNeedyIndividuals(needyRes.data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [token]);

  // Handle Voucher Creation
  const handleCreateVoucher = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const url =
      activeTab === "impactees"
        ? `http://localhost:3005/api/donor/voucher/${selectedItem._id}`
        : `http://localhost:3005/api/donor/voucherNeedy/${selectedItem._id}`;

    setLoading(true);
    try {
      const response = await axios.post(
        url,
        { amount },
        {
          headers: { token },
        }
      );
      setSuccessMessage("Voucher created successfully!");
      setTimeout(() => setSuccessMessage(""), 3000); // Hide success message after 3 seconds
      setIsModalOpen(false);
      setAmount("");
    } catch (error) {
      console.error("Error creating voucher:", error.message);
      alert("Failed to create voucher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-6">
       
      <h1 className="text-3xl font-bold text-center mb-6">Voucher Creation</h1>

      {/* Tabs for Impactees and Needy */}
      <div className="flex justify-center space-x-6 mb-6">
        <button
          onClick={() => setActiveTab("impactees")}
          className={`px-4 py-2 rounded ${
            activeTab === "impactees" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Impactees
        </button>
        <button
          onClick={() => setActiveTab("needy")}
          className={`px-4 py-2 rounded ${
            activeTab === "needy" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
          }`}
        >
          Needy Individuals
        </button>
      </div>

      {/* Table for Impactees or Needy */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Contact/CNIC</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === "impactees" ? impactees : needyIndividuals).map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {activeTab === "impactees" ? item.impacteeDetails?.name : item.name}
                </td>
                <td className="border px-4 py-2">
                  {activeTab === "impactees" ? item.impacteeDetails?.cnic : item.contactNumber}
                </td>
                <td className="border px-4 py-2">
                  {activeTab === "impactees" ? item.impacteeDetails?.address : item.address}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Create Voucher
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Voucher Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create Voucher</h2>
            <p>
              <strong>Name:</strong>{" "}
              {activeTab === "impactees" ? selectedItem.impacteeDetails?.name : selectedItem.name}
            </p>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full border border-gray-300 rounded p-2 mt-4 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateVoucher}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                {loading ? "Processing..." : "Create Voucher"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Message Popup */}
      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg flex items-center space-x-2">
          <FaCheckCircle size={24} />
          <span>{successMessage}</span>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default VoucherCreation;
