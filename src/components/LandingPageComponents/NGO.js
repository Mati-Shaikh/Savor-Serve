import React, { useState, useEffect } from "react";
import axios from "axios";
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
  ChevronDown,
} from "lucide-react";

const NGODashboard = () => {
  // Function to fetch token from localStorage
  const getToken = () => localStorage.getItem("token") || "";

  // State for managing active tab
  const [activeTab, setActiveTab] = useState("profile");
  const [ngoId, setNgoId] = useState(null); // Will update after registration
  const [token, setToken] = useState(getToken()); // Initialize token

  // NGO Profile State
  const [ngoProfile, setNgoProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    website: "",
  });

  // Causes State
  const [causes, setCauses] = useState([]);
  const [newCause, setNewCause] = useState({
    title: "",
    description: "",
    goal: "",
    timeline: "",
  });

  // Packages State
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    price: "",
  });

  // Tabs Configuration
  const tabs = [
    { id: "profile", icon: <FileText className="h-4 w-4" />, label: "Profile" },
    { id: "causes", icon: <BookOpen className="h-4 w-4" />, label: "Causes" },
    { id: "impactees", icon: <Users className="h-4 w-4" />, label: "Impactees" },
    { id: "donations", icon: <Activity className="h-4 w-4" />, label: "Donations" },
    { id: "packages", icon: <Globe className="h-4 w-4" />, label: "Packages" },
  ];

  // Validate token before making requests
  useEffect(() => {
    if (!token) {
      alert("You are not logged in. Please log in again.");
    }
  }, [token]);

  // API Call to Register NGO
  const handleNGORegistration = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/ngo/register",
        {
          name: ngoProfile.name,
          registrationNumber: ngoProfile.name.replace(/\s+/g, ""), // Generating a dummy registration number
          description: ngoProfile.description,
          address: ngoProfile.address,
          phone: ngoProfile.phone,
          website: ngoProfile.website,
          impactees: [
            {
              name: "Initial Impactee",
              phone: "+1234567890",
              cnic: "12345",
            },
          ],
        },
        {
          headers: { token },
        }
      );

      alert(response.data.message);
      setNgoId(response.data.ngo._id); // Save the registered NGO ID
    } catch (error) {
      console.error("Registration Error:", error);
      if (error.response) {
        alert(error.response.data.message || "Registration failed.");
      } else {
        alert("Registration failed. Please check your input.");
      }
    }
  };

  // API Call to Update NGO Profile
  const handleUpdateProfile = async () => {
    if (!ngoId) {
      alert("Please register the NGO first.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3005/api/ngo/updateProfile/${ngoId}`,
        {
          name: ngoProfile.name,
          description: ngoProfile.description,
          address: ngoProfile.address,
          phone: ngoProfile.phone,
          website: ngoProfile.website,
        },
        {
          headers: { token },
        }
      );

      alert(response.data.message);
    } catch (error) {
      console.error("Update Profile Error:", error);
      if (error.response) {
        alert(error.response.data.message || "Profile update failed.");
      } else {
        alert("Profile update failed.");
      }
    }
  };

  // Handling changes in NGO profile form
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setNgoProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // API Call to Add Cause
  const handleAddCause = async () => {
    try {
      const response = await axios.post(`http://localhost:3005/api/ngo/addcause/${ngoId}`, {
        title: newCause.title,
        description: newCause.description,
        goal: parseFloat(newCause.goal),
        timeline: newCause.timeline
      }, {
        headers: { token: token }
      });
      
      alert(response.data.message);
      setCauses([...causes, response.data.data]);
      setNewCause({ title: '', description: '', goal: '', timeline: '' });
    } catch (error) {
      console.error('Add Cause Error:', error);
      alert('Adding cause failed');
    }
  };

  // API Call to Add Package to Cause
  const handleAddPackage = async (causeId) => {
    try {
      const response = await axios.post(`http://localhost:3005/api/ngo/${ngoId}/causes/${causeId}/packages`, {
        title: newPackage.title,
        description: newPackage.description,
        price: parseFloat(newPackage.price)
      }, {
        headers: { token: token }
      });
      
      alert(response.data.message);
      setNewPackage({ title: '', description: '', price: '' });
    } catch (error) {
      console.error('Add Package Error:', error);
      alert('Adding package failed');
    }
  };

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
                <span>Active Causes: {causes.length}</span>
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
            {/* Profile Tab */}
            {activeTab === 'profile' && (
             <div>
             <h2 className="mb-6 text-xl font-semibold">NGO Profile</h2>
             <form className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">NGO Name</label>
                   <input
                     type="text"
                     value={ngoProfile.name}
                     onChange={(e) => setNgoProfile({ ...ngoProfile, name: e.target.value })}
                     className="w-full rounded-md border p-2"
                     placeholder="Enter NGO name"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Phone</label>
                   <input
                     type="text"
                     value={ngoProfile.phone}
                     onChange={(e) => setNgoProfile({ ...ngoProfile, phone: e.target.value })}
                     className="w-full rounded-md border p-2"
                     placeholder="Enter phone number"
                   />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Address</label>
                   <input
                     type="text"
                     value={ngoProfile.address}
                     onChange={(e) => setNgoProfile({ ...ngoProfile, address: e.target.value })}
                     className="w-full rounded-md border p-2"
                     placeholder="Enter address"
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-medium">Website</label>
                   <input
                     type="text"
                     value={ngoProfile.website}
                     onChange={(e) => setNgoProfile({ ...ngoProfile, website: e.target.value })}
                     className="w-full rounded-md border p-2"
                     placeholder="Enter website"
                   />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-medium">Description</label>
                 <textarea
                   value={ngoProfile.description}
                   onChange={(e) => setNgoProfile({ ...ngoProfile, description: e.target.value })}
                   className="w-full rounded-md border p-2"
                   rows="4"
                   placeholder="Describe your NGO"
                 />
               </div>
               <div className="flex space-x-4">
                 <button
                   type="button"
                   onClick={handleNGORegistration}
                   className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                 >
                   Register NGO
                 </button>
                 <button
                   type="button"
                   onClick={handleUpdateProfile}
                   className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                 >
                   Update Profile
                 </button>
               </div>
             </form>
           </div>
            )}

            {/* Causes Tab */}
            {activeTab === 'causes' && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Active Causes</h2>
                  <div className="flex space-x-4">
                    {/* Add Cause Form */}
                    <div className="flex space-x-2">
                      <input 
                        type="text"
                        value={newCause.title}
                        onChange={(e) => setNewCause({...newCause, title: e.target.value})}
                        placeholder="Cause Title"
                        className="rounded-md border p-2"
                      />
                      <input 
                        type="number"
                        value={newCause.goal}
                        onChange={(e) => setNewCause({...newCause, goal: e.target.value})}
                        placeholder="Goal Amount"
                        className="rounded-md border p-2"
                      />
                      <input 
                        type="date"
                        value={newCause.timeline}
                        onChange={(e) => setNewCause({...newCause, timeline: e.target.value})}
                        className="rounded-md border p-2"
                      />
                      <button 
                        onClick={handleAddCause}
                        className="flex items-center space-x-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Cause</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {causes.map((cause, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{cause.title}</h3>
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                          Active
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {cause.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          Goal: ${cause.goal}
                        </div>
                        <div className="text-sm text-gray-600">
                          Timeline: {new Date(cause.timeline).toLocaleDateString()}
                        </div>
                      </div>
                      {/* Add Package Section */}
                      <div className="mt-4 flex space-x-2">
                        <input 
                          type="text"
                          value={newPackage.title}
                          onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
                          placeholder="Package Title"
                          className="rounded-md border p-2"
                        />
                        <input 
                          type="number"
                          value={newPackage.price}
                          onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
                          placeholder="Package Price"
                          className="rounded-md border p-2"
                        />
                        <button 
                          onClick={() => handleAddPackage(cause._id)}
                          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                          Add Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

      {/* Modal for Add Impactees (if needed) */}
      {activeTab === 'impactees' && (
        <div className="mt-6 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">Impactees Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Impactee Name</label>
              <input 
                type="text"
                className="w-full rounded-md border p-2"
                placeholder="Enter impactee name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input 
                type="text"
                className="w-full rounded-md border p-2"
                placeholder="Enter phone number"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">CNIC</label>
              <input 
                type="text"
                className="w-full rounded-md border p-2"
                placeholder="Enter CNIC number"
              />
            </div>
            <div className="flex items-end">
              <button className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Add Impactee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Donations Tab */}
      {activeTab === 'donations' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-6 text-xl font-semibold">Donation Tracking</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Donor Name</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Cause</th>
                  <th className="p-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Sample Donation Entries */}
                <tr className="border-b">
                  <td className="p-3">John Doe</td>
                  <td className="p-3">$500</td>
                  <td className="p-3">2024-01-15</td>
                  <td className="p-3">Clean Water Initiative</td>
                  <td className="p-3">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Available Packages</h2>
            <button className="flex items-center space-x-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              <Plus className="h-4 w-4" />
              <span>Create New Package</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Sample Package Cards */}
            <div className="rounded-lg border p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Health Support Package</h3>
              <p className="text-sm text-gray-600 mb-4">
                Comprehensive health support for children
              </p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-blue-600">$250</span>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600">
                  Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NGODashboard;