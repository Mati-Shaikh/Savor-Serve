import React, { useState, useEffect } from 'react';
import { 
  User, 
  LogOut, 
  Wallet, 
  History,
  Users,
  Plus,
  CheckCircle,
  Clock,
  Heart,
  Edit,
  AlertCircle
} from 'lucide-react';
//import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
//import { Alert, AlertDescription } from '@/components/ui/alert';

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const [walletBalance, setWalletBalance] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Simulated fetch calls - replace with actual API calls
  useEffect(() => {
    // Fetch user data
    fetchUserData();
    // Fetch pending requests
    fetchPendingRequests();
    // Fetch donation history
    fetchDonationHistory();
    // Fetch wallet balance
    fetchWalletBalance();
  }, []);

  const fetchUserData = async () => {
    // Replace with actual API call
    const mockUserData = {
      name: 'John Donor',
      email: 'john@example.com',
      phone: '+1234567890',
      address: '123 Charity Lane',
      impactStats: {
        totalDonations: 15,
        peopleHelped: 25,
        activeRequests: 3
      }
    };
    setUserData(mockUserData);
    setProfileData(mockUserData);
  };

  const fetchPendingRequests = async () => {
    // Replace with actual API call
    const mockRequests = [
      {
        id: 'REQ001',
        beneficiaryName: 'Alice Smith',
        amount: 500,
        status: 'pending',
        date: '2024-11-14',
        ngoVerified: true
      },
      {
        id: 'REQ002',
        beneficiaryName: 'Bob Johnson',
        amount: 300,
        status: 'pending',
        date: '2024-11-13',
        ngoVerified: false
      }
    ];
    setPendingRequests(mockRequests);
  };

  const fetchDonationHistory = async () => {
    // Replace with actual API call
    const mockHistory = [
      {
        id: 'DON001',
        beneficiaryName: 'Sarah Wilson',
        amount: 1000,
        status: 'completed',
        date: '2024-11-10',
        impact: 'Education Support'
      },
      {
        id: 'DON002',
        beneficiaryName: 'Mike Brown',
        amount: 750,
        status: 'completed',
        date: '2024-11-08',
        impact: 'Medical Aid'
      }
    ];
    setDonationHistory(mockHistory);
  };

  const fetchWalletBalance = async () => {
    // Replace with actual API call
    setWalletBalance(5000);
  };

  const handleProfileUpdate = async () => {
    // Replace with actual API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUserData(profileData);
      setEditMode(false);
      // Show success message
    } catch (error) {
      // Handle error
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    // Clear session/localStorage
    // Redirect to login page
  };

  const handleAddFunds = async (amount) => {
    // Implement Stripe integration
    // Update wallet balance
  };

  const handleAddBeneficiary = async (beneficiaryData) => {
    // Implement beneficiary addition logic
    // Send request to admin
    // Update pending requests
  };

  const tabs = [
    { id: 'profile', icon: <User className="h-4 w-4" />, label: 'Profile' },
    { id: 'wallet', icon: <Wallet className="h-4 w-4" />, label: 'Wallet' },
    { id: 'requests', icon: <Users className="h-4 w-4" />, label: 'Requests' },
    { id: 'history', icon: <History className="h-4 w-4" />, label: 'History' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header with Logout */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600">Manage your donations and impact</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Impact Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold">{userData?.impactStats?.totalDonations || 0}</p>
            </div>
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Wallet Balance</p>
              <p className="text-2xl font-bold">${walletBalance}</p>
            </div>
            <Wallet className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">People Helped</p>
              <p className="text-2xl font-bold">{userData?.impactStats?.peopleHelped || 0}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Requests</p>
              <p className="text-2xl font-bold">{userData?.impactStats?.activeRequests || 0}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col space-y-6">
        {/* Tabs */}
        <div className="border-b">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 border-b-2 px-4 py-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="rounded-lg bg-white p-6 shadow">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <Edit className="h-4 w-4" />
                  <span>{editMode ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!editMode}
                      className="mt-1 w-full rounded-md border p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      disabled={!editMode}
                      className="mt-1 w-full rounded-md border p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!editMode}
                      className="mt-1 w-full rounded-md border p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!editMode}
                      className="mt-1 w-full rounded-md border p-2"
                    />
                  </div>
                </div>

                {editMode && (
                  <button
                    onClick={handleProfileUpdate}
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Wallet Management</h2>

              <div className="rounded-lg bg-blue-50 p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Balance</p>
                    <p className="text-3xl font-bold text-blue-600">${walletBalance}</p>
                  </div>
                  <Wallet className="h-12 w-12 text-blue-500" />
                </div>

                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAddFunds(100)}
                      className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Add $100
                    </button>
                    <button
                      onClick={() => handleAddFunds(500)}
                      className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Add $500
                    </button>
                    <button
                      onClick={() => handleAddFunds(1000)}
                      className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Add $1000
                    </button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      placeholder="Enter custom amount"
                      className="flex-1 rounded-md border p-2"
                    />
                    <button className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
                      Add Funds
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div>
                <h3 className="mb-4 text-lg font-medium">Recent Transactions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Type</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {/* Add transaction history here */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Beneficiary Requests</h2>
                <button 
                  //onClick={() => setShowAddBeneficiary(true)}
                  className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Beneficiary</span>
                </button>
              </div>

              {/* Add Beneficiary Form */}
              {/* {showAddBeneficiary && (
                <div className="rounded-lg border bg-gray-50 p-4">
                  <h3 className="mb-4 text-lg font-medium">Add New Beneficiary</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Beneficiary Name</label>
                      <input 
                        type="text" 
                        className="mt-1 w-full rounded-md border p-2"
                        placeholder="Enter full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                      <input 
                        type="tel" 
                        className="mt-1 w-full rounded-md border p-2"
                        placeholder="Enter contact number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Required Amount</label>
                      <input 
                        type="number" 
                        className="mt-1 w-full rounded-md border p-2"
                        placeholder="Enter amount needed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Purpose</label>
                      <select className="mt-1 w-full rounded-md border p-2">
                        <option value="">Select purpose</option>
                        <option value="education">Education</option>
                        <option value="medical">Medical</option>
                        <option value="housing">Housing</option>
                        <option value="food">Food & Necessities</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea 
                        className="mt-1 w-full rounded-md border p-2"
                        rows="3"
                        placeholder="Describe the beneficiary's situation"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button 
                      //onClick={() => setShowAddBeneficiary(false)}
                      className="rounded-md border px-4 py-2 text-gray-600 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleAddBeneficiary}
                      className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Submit Request
                    </button>
                  </div>
                </div> */}
              

              {/* Pending Requests */}
              <div>
                <h3 className="mb-4 text-lg font-medium">Pending Requests</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">ID</th>
                        <th className="px-4 py-2 text-left">Beneficiary</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">NGO Verified</th>
                        <th className="px-4 py-2 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {pendingRequests.map((request) => (
                        <tr key={request.id}>
                          <td className="px-4 py-2">{request.id}</td>
                          <td className="px-4 py-2">{request.beneficiaryName}</td>
                          <td className="px-4 py-2">${request.amount}</td>
                          <td className="px-4 py-2">
                            <span className={`rounded-full px-2 py-1 text-sm ${
                              request.status === 'pending' 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {request.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{request.date}</td>
                          <td className="px-4 py-2">
                            {request.ngoVerified ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Clock className="h-5 w-5 text-yellow-500" />
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Donation History</h2>

              {/* Filters */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Search donations..."
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <select className="rounded-md border p-2">
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                </select>
                <select className="rounded-md border p-2">
                  <option>All Categories</option>
                  <option>Education</option>
                  <option>Medical</option>
                  <option>Housing</option>
                  <option>Food & Necessities</option>
                </select>
              </div>

              {/* Donation History Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Beneficiary</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Impact Category</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {donationHistory.map((donation) => (
                      <tr key={donation.id}>
                        <td className="px-4 py-2">{donation.id}</td>
                        <td className="px-4 py-2">{donation.beneficiaryName}</td>
                        <td className="px-4 py-2">${donation.amount}</td>
                        <td className="px-4 py-2">{donation.date}</td>
                        <td className="px-4 py-2">{donation.impact}</td>
                        <td className="px-4 py-2">
                          <span className={`rounded-full px-2 py-1 text-sm ${
                            donation.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {donation.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              View Details
                            </button>
                            <button className="text-green-600 hover:text-green-800">
                              Download Receipt
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Impact Summary */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="text-sm font-medium text-gray-600">Total Impact</h4>
                  <p className="mt-2 text-2xl font-bold text-blue-600">
                    ${donationHistory.reduce((sum, donation) => sum + donation.amount, 0)}
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="text-sm font-medium text-gray-600">Lives Impacted</h4>
                  <p className="mt-2 text-2xl font-bold text-green-600">
                    {donationHistory.length}
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-4">
                  <h4 className="text-sm font-medium text-gray-600">Most Common Category</h4>
                  <p className="mt-2 text-2xl font-bold text-purple-600">
                    Education
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;