import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Activity, 
  Coffee, 
  Globe, 
  CreditCard, 
  FileText,
  Check,
  Plus,
  ChevronDown
} from 'lucide-react';

const NGODashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Sample state for demonstration
  const [ngoProfile, setNgoProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: ''
  });

  const tabs = [
    { id: 'profile', icon: <FileText className="h-4 w-4" />, label: 'Profile' },
    { id: 'causes', icon: <BookOpen className="h-4 w-4" />, label: 'Causes' },
    { id: 'impactees', icon: <Users className="h-4 w-4" />, label: 'Impactees' },
    { id: 'donations', icon: <Activity className="h-4 w-4" />, label: 'Donations' },
    { id: 'packages', icon: <Globe className="h-4 w-4" />, label: 'Packages' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">NGO Dashboard</h1>
        <p className="text-gray-600">Manage your NGO profile, causes, and impact</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar Stats */}
        <div className="space-y-4">
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 font-semibold">Quick Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span>Total Impactees: 150</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-500" />
                <span>Active Causes: 12</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-purple-500" />
                <span>Total Donations: $25,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {/* Custom Tabs */}
          <div className="mb-6">
            <div className="flex space-x-4 border-b">
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
            {activeTab === 'profile' && (
              <div>
                <h2 className="mb-6 text-xl font-semibold">NGO Profile</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">NGO Name</label>
                      <input 
                        type="text"
                        className="w-full rounded-md border p-2"
                        placeholder="Enter NGO name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <input 
                        type="email"
                        className="w-full rounded-md border p-2"
                        placeholder="Enter email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea 
                      className="w-full rounded-md border p-2"
                      rows="4"
                      placeholder="Describe your NGO"
                    />
                  </div>
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'causes' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Active Causes</h2>
                  <button className="flex items-center space-x-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
                    <Plus className="h-4 w-4" />
                    <span>Add Cause</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Sample Cause Card */}
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Clean Water Initiative</h3>
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                        Active
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      Providing clean drinking water to rural communities
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Progress: 65%
                      </div>
                      <div className="text-sm text-gray-600">
                        Goal: $50,000
                      </div>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div className="h-2 w-2/3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Add other tab content here */}
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-red-500" />
            <h3 className="font-semibold">Systems Approach</h3>
          </div>
          <p className="text-gray-600">
            Implement systematic solutions for effective NGO management
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold">Community Impact</h3>
          </div>
          <p className="text-gray-600">
            Create and track meaningful impact in communities
          </p>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center space-x-2">
            <Coffee className="h-5 w-5 text-yellow-500" />
            <h3 className="font-semibold">Motivation System</h3>
          </div>
          <p className="text-gray-600">
            Engage and motivate donors through transparent impact tracking
          </p>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;