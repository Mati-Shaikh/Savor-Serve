import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import AddImpacteeForm from './AddImpacteeForm';
import AddPackageForm from './AddPackageForm';
import Footer from '../LandingPageComponents/Footer';
import { 
  BarChart, Bar, XAxis, YAxis, Pie, PieChart, Cell, 
  ResponsiveContainer, Tooltip, Legend 
} from 'recharts';
import { 
  Users, 
  Package2, 
  Target, 
  Home, 
  Plus, 
  UserPlus,
  FileText,
  Box,
  X,
  Menu
} from 'lucide-react';


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

const NGODashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [ngoData, setNgoData] = useState(null);
  const [impactees, setImpactees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('view');
  const [totalDonations, setTotalDonations] = useState(0);


  // Fetch Impactees data from API
  const fetchImpactees = async () => {
    try {
      setLoading(true); // Start loading
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await fetch('http://localhost:3005/api/ngo/getImpactees', {
        method: 'GET',
        headers: {
          token:token, // Send token in Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch impactees');
      }

      const data = await response.json();
      console.log(data.impactees);

      setImpactees(data.impactees); // Update state with the retrieved data
    } catch (error) {
      console.error('Error fetching impactees:', error);
      // Handle the error (e.g., show error message)
    } finally {
      setLoading(false); // End loading
    }
  };

  // Fetch impactee data when the component mounts
  useEffect(() => {
    fetchImpactees();
  }, []); 

  useEffect(() => {
    const fetchNGOData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [ngoResponse, donationsResponse] = await Promise.all([
          fetch(`http://localhost:3005/api/ngo/getNGO`, { 
            headers: { 'token': token } 
          }),
          
          fetch('http://localhost:3005/api/ngo/total-donations', {
            headers: { 'token': token }
          })
        ]);

        const ngoData = await ngoResponse.json();
        //console.log('My NGo' + ngoData);
        //const impacteesData = await impacteesResponse.json();
        const donationsData = await donationsResponse.json();

        setNgoData(ngoData.data);
        //setImpactees(Array.isArray(impacteesData) ? impacteesData : []);
        setTotalDonations(donationsData.totalDonations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching NGO data:', error);
        setLoading(false);
      }
    };

    fetchNGOData();
  }, []);

  const renderOverview = () => {
    const causeData = ngoData?.causes?.map(cause => ({
      name: cause.title,
      goal: cause.goal
    })) || [];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <Users className="mr-4 text-blue-500" size={48} />
            <div>
              <h3 className="text-xl font-semibold">Total Impactees</h3>
              <p className="text-2xl font-bold">{impactees.length}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <Package2 className="mr-4 text-green-500" size={48} />
            <div>
              <h3 className="text-xl font-semibold">Total Causes</h3>
              <p className="text-2xl font-bold">{ngoData?.causes?.length || 0}</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <Target className="mr-4 text-purple-500" size={48} />
            <div>
              <h3 className="text-xl font-semibold">Total Goal</h3>
              <p className="text-2xl font-bold">
                ${ngoData?.causes?.reduce((sum, cause) => sum + cause.goal, 0) || 0}
              </p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
            <FileText className="mr-4 text-red-500" size={48} />
            <div>
              <h3 className="text-xl font-semibold">Total Donations</h3>
              <p className="text-2xl font-bold">${totalDonations}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Causes Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={causeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="goal" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Impactees Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Impactees', value: impactees.length },
                    { name: 'Remaining', value: Math.max(0, 100 - impactees.length) }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#0088FE" />
                  <Cell fill="#00C49F" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  
  const RenderNGODetails = () => {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 bg-white shadow-md rounded-lg p-6 sm:p-8">
        {/* NGO Name and Logo */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <img src="https://via.placeholder.com/50" alt="LucidReact Logo" className="w-12 h-12 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-800">{ngoData.name}</h2>
          </div>
          <a
            href={ngoData.website}
            className="text-blue-500 hover:underline text-lg font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
        </div>
  
        {/* NGO Information Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">NGO Information</h3>
          <p className="text-gray-600">Registration Number: {ngoData.registrationNumber}</p>
          <p className="text-gray-600">Description: {ngoData.description}</p>
          <p className="text-gray-600">Address: {ngoData.address}</p>
          <p className="text-gray-600">Phone: {ngoData.phone}</p>
          <p className="text-gray-600">
            Website: <a href={ngoData.website} className="text-blue-500 hover:underline">{ngoData.website}</a>
          </p>
        </div>
  
        {/* Causes Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Causes</h3>
          {ngoData.causes.map(cause => (
            <div key={cause._id} className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-lg font-semibold text-gray-700">{cause.title}</h4>
              <p className="text-gray-600">{cause.description}</p>
              <p className="text-gray-600">Goal: {cause.goal}</p>
              <p className="text-gray-600">Timeline: {new Date(cause.timeline).toLocaleDateString()}</p>
              <h5 className="font-semibold text-gray-700 mt-2">Packages:</h5>
              {cause.packages.map(packageItem => (
                <div key={packageItem._id} className="mb-2 p-2 bg-gray-100 rounded-md">
                  <p className="text-gray-600">Title: {packageItem.title}</p>
                  <p className="text-gray-600">Description: {packageItem.description}</p>
                  <p className="text-gray-600">Price: ${packageItem.price}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
  
        {/* Impactees Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Impactees</h3>
          {ngoData.impactees.length > 0 ? (
            ngoData.impactees.map(impactee => (
              <div key={impactee._id} className="mb-2 p-4 bg-gray-50 rounded-lg shadow-sm">
                <p className="text-gray-600">Name: {impactee.name}</p>
                <p className="text-gray-600">Phone: {impactee.phone}</p>
                <p className="text-gray-600">CNIC: {impactee.cnic}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No impactees available.</p>
          )}
        </div>
      </div>
    );
  };
  
  

  const renderImpacteesSection = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Impactees Management</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setSelectedSection('view')}
            className={`px-4 py-2 rounded ${selectedSection === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            View Impactees
          </button>
          <button 
            onClick={() => setSelectedSection('add')}
            className={`px-4 py-2 rounded ${selectedSection === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Add Impactee
          </button>
        </div>
      </div>

      {selectedSection === 'view' ? (
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">CNIC</th>
                </tr>
              </thead>
              <tbody>
                {impactees.length > 0 ? (
                  impactees.map((impactee, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-3">{impactee.name}</td>
                      <td className="p-3">{impactee.phone}</td>
                      <td className="p-3">{impactee.cnic}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-3 text-center">No impactees found</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      ) : (
        <div>
          <AddImpacteeForm onAddImpactee={fetchImpactees} />
        </div>
      )}
    </div>
  );

  //see 

  const renderPackagesSection = () => (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Packages Management</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <plus className="mr-2" size={20} /> Add Package
        </button>
      </div>
      <AddPackageForm />
    </div>
  );
  // Rest of the component remains the same as in the previous submission

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6">
     
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-2 bg-white shadow-md rounded-lg p-4">
          <div className="space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center p-3 rounded ${activeTab === 'overview' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Home className="mr-3" size={20} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('impactees')}
              className={`w-full flex items-center p-3 rounded ${activeTab === 'impactees' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Users className="mr-3" size={20} /> Impactees
            </button>
            <button 
              onClick={() => setActiveTab('packages')}
              className={`w-full flex items-center p-3 rounded ${activeTab === 'packages' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Package2 className="mr-3" size={20} /> Packages
            </button>
            <button 
              onClick={() => setActiveTab('ngoDetails')}
              className={`w-full flex items-center p-3 rounded ${activeTab === 'ngoDetails' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Package2 className="mr-3" size={20} /> View NGO
            </button>
          </div>
        </div>
        <div className="col-span-10">
          {loading ? (
            <div className="text-center text-xl mt-10">Loading...</div>
          ) : (
            <>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'impactees' && renderImpacteesSection()}
              {activeTab === 'packages' && renderPackagesSection()}
              {activeTab === 'ngoDetails' && RenderNGODetails()}
            </>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default NGODashboard;