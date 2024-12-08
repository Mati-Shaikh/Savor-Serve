import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, TrendingUp, Package, Users, DollarSign } from "lucide-react";
import { fetchShopDetails } from "../../Services/api";
import ShopDetailsCard from "./ShopDetailsCard";
import UpdateShopForm from "./UpdateShopForm";
import Footer from "../LandingPageComponents/Footer";
import RegisterShopModal from "./RegisterShopModal";
import VoucherManagement from "../VoucherManagement/voucherManagement";

const Navbar = ({ activeTab, setActiveTab }) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-gray-800">Savor and Serve</h1>

        {/* Center Tabs */}
        <div className="hidden md:flex space-x-6">
          <button
            className={`text-lg ${
              activeTab === "dashboard"
                ? "text-indigo-600 font-semibold underline"
                : "text-gray-600 hover:text-indigo-600"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`text-lg ${
              activeTab === "shop"
                ? "text-indigo-600 font-semibold underline"
                : "text-gray-600 hover:text-indigo-600"
            }`}
            onClick={() => setActiveTab("shop")}
          >
            Shop Management
          </button>
          <button
            className={`text-lg ${
              activeTab === "vouchers"
                ? "text-indigo-600 font-semibold underline"
                : "text-gray-600 hover:text-indigo-600"
            }`}
            onClick={() => setActiveTab("vouchers")}
          >
            Vouchers
          </button>
        </div>

        {/* Hamburger Menu */}
        <div className="relative">
          <button
            onMouseEnter={() => setIsHamburgerOpen(true)}
            onMouseLeave={() => setIsHamburgerOpen(false)}
            className="text-black p-2 rounded-full hover:bg-gray-100 transition-all duration-300"
          >
            {isHamburgerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isHamburgerOpen && (
            <div
              className="absolute right-0 w-36 bg-white rounded-lg shadow-xl py-2 z-10 transform transition-all duration-300 ease-out"
              onMouseEnter={() => setIsHamburgerOpen(true)}
              onMouseLeave={() => setIsHamburgerOpen(false)}
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-300"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const StatCard = ({ icon: Icon, title, value, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${trend > 0 ? "bg-green-100" : "bg-red-100"}`}>
        <Icon className={trend > 0 ? "text-green-600" : "text-red-600"} size={24} />
      </div>
    </div>
    <div className="mt-2">
      <span className={`text-sm ${trend > 0 ? "text-green-600" : "text-red-600"}`}>
        {trend}% {trend > 0 ? "↑" : "↓"}
      </span>
      <span className="text-gray-500 text-sm ml-1">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [shopDetails, setShopDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    const loadShopDetails = async () => {
      try {
        setIsLoading(true);
        const details = await fetchShopDetails();
        setShopDetails(details);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading shop details:", error);
        setIsLoading(false);
      }
    };
    loadShopDetails();
  }, [updateTrigger]);

  const handleUpdateSuccess = () => {
    setUpdateTrigger((prev) => prev + 1);
  };

  const handleRegisterSuccess = (newShopDetails) => {
    setShopDetails(newShopDetails);
    setIsRegisterModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="container mx-auto px-4 py-8">
      {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={DollarSign}
                title="Total Donations"
                value={`${
                  shopDetails?.donations?.reduce((total, donation) => total + donation.amount, 0) ||
                  0
                }`}
                trend={12}
              />
              <StatCard
                icon={Package}
                title="Funds"
                value={`${
                  shopDetails?.donations?.reduce((total, donation) => total + donation.amount, 0) ||
                  0
                }`}
                trend={8}
              />
            </div>
          </>
        )}

        {activeTab === "shop" && shopDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <ShopDetailsCard shopDetails={shopDetails} />
            <UpdateShopForm
              currentDetails={shopDetails}
              onUpdateSuccess={handleUpdateSuccess}
            />
          </div>
        )}

        {activeTab === "vouchers" && <VoucherManagement/>}

        {isRegisterModalOpen && (
          <RegisterShopModal
            onClose={() => setIsRegisterModalOpen(false)}
            onSuccess={handleRegisterSuccess}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
