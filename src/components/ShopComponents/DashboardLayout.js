import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, X, TrendingUp, Package, Users, DollarSign } from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, 
  ComposedChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer,
  RadialBarChart, RadialBar, Legend
} from 'recharts';
import { fetchShopDetails } from '../../Services/api';
import ShopDetailsCard from './ShopDetailsCard';
import UpdateShopForm from './UpdateShopForm';
import Footer from '../LandingPageComponents/Footer';
import RegisterShopModal from './RegisterShopModal';

// Sample data for charts
const monthlyData = [
  { name: 'Jan', donations: 4000, funds: 240, donors: 200 },
  { name: 'Feb', donations: 3000, funds: 198, donors: 180 },
  { name: 'Mar', donations: 5000, funds: 280, donors: 250 },
  { name: 'Apr', donations: 4500, funds: 308, donors: 290 },
  { name: 'May', donations: 6000, funds: 389, donors: 320 },
  { name: 'Jun', donations: 5500, funds: 380, donors: 290 }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-black font-bold text-3xl flex items-center transform hover:scale-105 transition-transform">
            Savor and Serve
          </div>
        </div>

        <div className="relative">
          <button
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className="text-black p-2 rounded-full hover:bg-white/10 transition-all duration-300"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {isOpen && (
            <div
              className="absolute right-0 w-48 bg-white rounded-lg shadow-xl py-2 z-10 transform transition-all duration-300 ease-out"
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 transition duration-300"
              >
                <Package className="mr-2 h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const StatCard = ({ icon: Icon, title, value, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${trend > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
        <Icon className={trend > 0 ? 'text-green-600' : 'text-red-600'} size={24} />
      </div>
    </div>
    <div className="mt-2">
      <span className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {trend}% {trend > 0 ? '↑' : '↓'}
      </span>
      <span className="text-gray-500 text-sm ml-1">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  const [shopDetails, setShopDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Show modal when shopDetails is not available
  useEffect(() => {
    if (!shopDetails) {
      setIsRegisterModalOpen(true);
    } else {
      setIsRegisterModalOpen(false);
    }
  }, [shopDetails]);

  const loadShopDetails = async () => {
    try {
      setIsLoading(true);
      const details = await fetchShopDetails();
      setShopDetails(details);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading shop details:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadShopDetails();
  }, [updateTrigger]);

  const handleUpdateSuccess = () => {
    setUpdateTrigger(prev => prev + 1);
  };


  const handleRegisterSuccess = (newShopDetails) => {
    setShopDetails(newShopDetails);
    setIsRegisterModalOpen(false); // Close the modal after successful registration
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
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 animate-fade-in">
          Grocery Supplier Dashboard
        </h1>

        {/* Shop Management Section */}
        {/* Shop Management Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {shopDetails ? (
            <>
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <ShopDetailsCard shopDetails={shopDetails} />
              </div>
              <div className="transform transition-all duration-300 hover:scale-[1.02]">
                <UpdateShopForm
                  currentDetails={shopDetails}
                  onUpdateSuccess={handleUpdateSuccess}
                />
              </div>
            </>
          ) : (
            <p>Loading shop details...</p>
          )}
        </div>

        {/* Register Shop Modal */}
        {isRegisterModalOpen && (
          <RegisterShopModal
            onClose={() => setIsRegisterModalOpen(false)} // Allow manual closing
            onSuccess={handleRegisterSuccess} // Pass success handler
          />
        )}
      

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
  <StatCard
    icon={DollarSign}
    title="Total Donations"
    value={`${
      shopDetails?.donations?.reduce((total, donation) => total + donation.amount, 0) || 0
    }`}
    trend={12} // Example trend value, update with actual logic if needed
  />
  <StatCard 
    icon={Package}
    title="Funds"
    value={`${
      shopDetails?.donations?.reduce((total, donation) => total + donation.amount, 0) || 0
    }`}
    trend={8}
  />
  <StatCard 
    icon={Users}
    title="Donors"
    value="890"
    trend={-3}
  />
  <StatCard 
    icon={TrendingUp}
    title="Growth"
    value="15%"
    trend={5}
  />
</div>
 

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* donations Trend */}
          <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Donations Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="donations" 
                    stroke="#6366f1" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* funds vs donors */}
          <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Goals vs Donors</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="funds" fill="#6366f1" />
                  <Line type="monotone" dataKey="donors" stroke="#ec4899" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;