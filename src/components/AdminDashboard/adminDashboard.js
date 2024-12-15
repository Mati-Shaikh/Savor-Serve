import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from "./needyModal";
import axios from "axios";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { 
  Users, 
  ShoppingBag, 
  Home, 
  Edit, 
  Trash2, 
  BarChart2, 
  PieChart as PieChartIcon,
  Info,
  Package,
  MapPin,
  Phone,
  Globe ,
  LogOutIcon,
  RefreshCcw
} from 'lucide-react';

// API Service for centralized API calls
const apiService = {

  async fetchWithToken(url, method = 'GET', body = null) {
    const token = localStorage.getItem('token'); // Assuming token is stored
    const headers = {
      'Content-Type': 'application/json',
      token: token
    };

    const config = {
      method,
      headers,
      body: body ? JSON.stringify(body) : null
    };

    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },

  getDonors() {
    return this.fetchWithToken('http://localhost:3005/api/admin/donors');
  },

  getNGOs() {
    return this.fetchWithToken('http://localhost:3005/api/admin/ngos');
  },

  getSuppliers() {
    return this.fetchWithToken('http://localhost:3005/api/admin/suppliers');
  },

  updateDonor(id, data) {
    return this.fetchWithToken(`http://localhost:3005/api/admin/donors/${id}`, 'PUT', data);
  },

  updateNGO(id, data) {
    return this.fetchWithToken(`http://localhost:3005/api/admin/ngos/${id}`, 'PUT', data);
  },

  updateSupplier(id, data) {
    return this.fetchWithToken(`http://localhost:3005/api/admin/suppliers/${id}`, 'PUT', data);
  },

  deleteDonor(id) {
    return this.fetchWithToken(`http://localhost:3005/api/admin/donors/${id}`, 'DELETE');
  },

  deleteNGO(id) {
    return this.fetchWithToken(`http://localhost:3005/api/admin/ngos/${id}`, 'DELETE');
  },

  deleteSupplier(id) {
    return this.fetchWithToken(`http://localhost:3005/api/admin/suppliers/${id}`, 'DELETE');
  }
};


/// Modal Component for Detailed View and Edit
const DetailModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <button 
            onClick={onClose} 
            className="float-right text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
          {children}
        </div>
      </div>
    );
  };
  
  // Form Component for Editing Users
  const EditUserForm = ({ user, onSubmit, onCancel, type }) => {
    const [formData, setFormData] = useState(() => {
      // Dynamic form data based on user type
      switch(type) {
        case 'donor':
        case 'ngo':
          return {
            FirstName: user.FirstName || user.name || '',
            LastName: user.LastName || '',
            Email: user.Email || user.email || '',
            PhoneNumber: user.PhoneNumber || user.phone || ''
          };
        case 'supplier':
          return {
            storeName: user.storeName || '',
            contactNumber: user.contactNumber || '',
            address: user.address || ''
          };
        default:
          return {};
      }
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(user._id, formData, type);
    };
  
    const renderFormFields = () => {
      switch(type) {
        case 'donor':
        case 'ngo':
          return (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2">First Name</label>
                  <input
                    type="text"
                    name="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2">Last Name</label>
                  <input
                    type="text"
                    name="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </>
          );
        case 'supplier':
          return (
            <>
              <div>
                <label className="block mb-2">Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </>
          );
        default:
          return null;
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Edit {type.toUpperCase()} Details</h2>
        {renderFormFields()}
        <div className="flex justify-end space-x-4">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    );
  };

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [donors, setDonors] = useState([]);
  //const [ngos, setNGOs] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editType, setEditType] = useState('');
  const [ngos, setNgos] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

const navigate = useNavigate(); // Hook to navigate

const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to the root (home) page
  }
};
// Fetch NGOs function
const fetchNGOs = async () => {
  setIsLoading(true);
  setError(null);
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:3005/api/admin/ngos', {
      headers: { token: token }
    });
    setNgos(response.data.ngos);
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    setError('Failed to fetch NGOs. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};

// Add this to useEffect to fetch NGOs when component mounts
useEffect(() => {
  fetchNGOs();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorsData = await apiService.getDonors();
        const ngosData = await apiService.getNGOs();
        const suppliersData = await apiService.getSuppliers();

        setDonors(donorsData.donors);
        //setNGOs(ngosData.ngos);
        setSuppliers(suppliersData.suppliers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Generic delete handler
  const handleDelete = async (id, type) => {
    try {
      const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
      if (!confirmDelete) return;

      switch(type) {
        case 'donor':
          await apiService.deleteDonor(id);
          setDonors(donors.filter(donor => donor._id !== id));
          break;
        case 'ngo':
          await apiService.deleteNGO(id);
          //setNGOs(ngos.filter(ngo => ngo._id !== id));
          break;
        case 'supplier':
          await apiService.deleteSupplier(id);
          setSuppliers(suppliers.filter(supplier => supplier._id !== id));
          break;
      }
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
      alert(`Failed to delete ${type}. Please try again.`);
    }
  };

  // Generic edit handler
  const handleEdit = async (id, updatedData, type) => {
    try {
      let result;
      switch(type) {
        case 'donor':
          result = await apiService.updateDonor(id, updatedData);
          setDonors(donors.map(donor => 
            donor._id === id ? { ...donor, ...updatedData } : donor
          ));
          break;
        case 'ngo':
          result = await apiService.updateNGO(id, updatedData);
         
          break;
        case 'supplier':
          result = await apiService.updateSupplier(id, updatedData);
          setSuppliers(suppliers.map(supplier => 
            supplier._id === id ? { ...supplier, ...updatedData } : supplier
          ));
          break;
      }
      
      // Close modals after successful update
      setIsEditModalOpen(false);
      setIsDetailModalOpen(false);
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
      alert(`Failed to update ${type}. Please try again.`);
    }
  };

  const dashboardStats = [
    { 
      name: 'Total Donors', 
      value: donors.length, 
      icon: <Users className="text-blue-500" />,
      color: '#3B82F6' 
    },
    { 
      name: 'Total NGOs', 
      value: ngos.length, 
      icon: <Home className="text-green-500" />,
      color: '#10B981' 
    },
    { 
      name: 'Total Suppliers', 
      value: suppliers.length, 
      icon: <ShoppingBag className="text-purple-500" />,
      color: '#8B5CF6' 
    }
  ];

  const renderPieChart = () => {
    const pieData = [
      { name: 'Donors', value: donors.length },
      { name: 'NGOs', value: ngos.length },
      { name: 'Suppliers', value: suppliers.length }
    ];

    const COLORS = ['#3B82F6', '#10B981', '#8B5CF6'];

    return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };
  const [needyIndividuals, setNeedyIndividuals] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndividual, setCurrentIndividual] = useState(null);
    const [needyformData, setNeedyformData] = useState({
      name: "",
      address: "",
      contactNumber: "",
    });
    

    
    const renderNeedyIndividualsList = () => {
      
    
      const token = localStorage.getItem('token');
    
   
    
      const fetchNeedyIndividuals = async () => {
        try {
          const response = await axios.get("http://localhost:3005/api/needyInd/needy", {
            headers: { token },
          });
          setNeedyIndividuals(response.data);
        } catch (error) {
          console.error("Error fetching needy individuals:", error.message);
        }
      };
    
      const handleSave = async (e) => {
        e.preventDefault();
        try {
          if (currentIndividual) {
            await axios.put(
              `http://localhost:3005/api/needyInd/needy/${currentIndividual._id}`,
              needyformData,
              { headers: { token } }
            );
          } else {
            await axios.post("http://localhost:3005/api/needyInd/needy", 
              needyformData,
              { headers: { token } }
            );
          }
          fetchNeedyIndividuals();
          handleCloseForm();
        } catch (error) {
          console.error("Error saving individual:", error.message);
        }
      };
    
      const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:3005/api/needyInd/needy/${id}`, {
            headers: { token },
          });
          fetchNeedyIndividuals();
        } catch (error) {
          console.error("Error deleting individual:", error.message);
        }
      };
    
      const handleOpenForm = (individual = null) => {
        setCurrentIndividual(individual);
        setNeedyformData(
          individual
            ? {
                name: individual.name,
                address: individual.address,
                contactNumber: individual.contactNumber,
              }
            : { name: "", address: "", contactNumber: "" }
        );
        setIsFormOpen(true);
      };
    
      const handleCloseForm = () => {
        setIsFormOpen(false);
        setCurrentIndividual(null);
        setNeedyformData({ name: "", address: "", contactNumber: "" });
      };
    
      return (
        <div className="bg-white shadow-md rounded-lg p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Needy Individuals</h2>
            <button
              onClick={() => handleOpenForm()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Needy Individual
            </button>
          </div>
    
          {/* Form Section */}
          {isFormOpen && (
            <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">
                {currentIndividual ? "Edit Needy Individual" : "Add Needy Individual"}
              </h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={needyformData.name}
                    onChange={(e) => setNeedyformData({ ...needyformData, name: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    value={needyformData.address}
                    onChange={(e) => setNeedyformData({ ...needyformData, address: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Number</label>
                  <input
                    type="text"
                    value={needyformData.contactNumber}
                    onChange={(e) => setNeedyformData({ ...needyformData, contactNumber: e.target.value })}
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          )}
    
          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Address</th>
                  <th className="border p-2 text-left">Contact Number</th>
                  <th className="border p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {needyIndividuals.map((individual) => (
                  <tr key={individual._id} className="border-b hover:bg-gray-50">
                    <td className="border p-2">{individual.name}</td>
                    <td className="border p-2">{individual.address}</td>
                    <td className="border p-2">{individual.contactNumber}</td>
                    <td className="border p-2">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleOpenForm(individual)}
                          className="text-blue-500 hover:bg-blue-100 p-1 rounded"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(individual._id)}
                          className="text-red-500 hover:bg-red-100 p-1 rounded"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

    useEffect(() => {
      renderNeedyIndividualsList();
    }, []);
    
   
    const [impactees, setImpactees] = useState([]);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
    const [selectedImpactee, setSelectedImpactee] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState({});

    const fetchImpactees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3005/api/admin/impactees", {
          headers: { token:token }
        });
        console.log(response.data.impactees);
        setImpactees(response.data.impactees);
      } catch (error) {
        console.error("Error fetching impactees:", error.message);
      }
    };


    {/*fetching Vouchers functionality */}
    const [vouchers, setvouchers] = useState([]);
    const [isModalvoucher, setIsModalvoucher] = useState(false);
    const [selectedvoucher, setSelectedvoucher] = useState(null);
    const [isDropdownvoucher, setIsDropdownvoucher] = useState({});

    const fetchVouchers = async() =>{
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:3005/api/donor/getVouchers", {
          headers: { token:token }
        });
        console.log(response.data.vouchers);
        setvouchers(response.data.vouchers);
      } catch (error) {
        console.error("Error fetching impactees:", error.message);
      }

    };

    useEffect(() => {
      fetchImpactees();
      fetchVouchers();
    }, []);

    {/*Status Update For voucher */}

    const handleStatusUpdateVoucher = async (id, newStatus) => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          
          `http://localhost:3005/api/donor/update-status/${id}`,
          { status: newStatus },
          { headers: { token: token } }
        );
        fetchVouchers();
        setIsDropdownvoucher({ ...isDropdownvoucher, [id]: false });
      } catch (error) {
        console.error("Error updating Vouchers status:", error.message);
      }
    };
    {/*End function */}
    const toggleDropdownVoucher = (id) => {
      setIsDropdownvoucher(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    };

    const VoucherManagement = () => {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Voucher Management</h1>
          </div>
    
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Amount</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Null ID</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Donor ID</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Status</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Tracking ID</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Created At</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <tr key={voucher._id} className="border-b hover:bg-gray-50">
                    <td className="border border-gray-200 p-3">Rs{voucher.amount}</td>
                    <td className="border border-gray-200 p-3">{voucher.shop}</td>
                    <td className="border border-gray-200 p-3">{voucher.donorId}</td>
                    <td className="border border-gray-200 p-3">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdownVoucher(voucher._id)}
                          className={`w-full px-4 py-2 text-left text-sm font-medium rounded-md 
                            ${voucher.status === 'Received' ? 'bg-green-100 text-green-800' :
                              voucher.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'} 
                            hover:bg-opacity-80 focus:outline-none`}
                        >
                          {voucher.status}
                        </button>
                        
                        {isDropdownvoucher[voucher._id] && (
                          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                            <div className="py-1">
                              <button
                                onClick={() => handleStatusUpdateVoucher(voucher._id, 'Pending')}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => handleStatusUpdateVoucher(voucher._id, 'Received')}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Received
                              </button>
                              <button
                                onClick={() => handleStatusUpdateVoucher(voucher._id, 'Used')}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Used
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-200 p-3">{voucher.trackingId}</td>
                    <td className="border border-gray-200 p-3">
                      {new Date(voucher.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-200 p-3">
                      <button
                        onClick={() => {
                          setSelectedvoucher(voucher);
                          setIsModalvoucher(true);
                        }}
                        className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {/* Modal */}
          {isModalvoucher && selectedvoucher && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-96 max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Voucher Details
                  </h3>
                  <button
                    onClick={() => setIsModalvoucher(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="font-medium">${selectedvoucher.amount}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`font-medium ${
                      selectedvoucher.status === 'Received' ? 'text-green-600' :
                      selectedvoucher.status === 'Pending' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`}>
                      {selectedvoucher.status}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Tracking ID</p>
                    <p className="font-medium">{selectedvoucher.trackingId}</p>
                  </div>
    
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Shop ID</p>
                    <p className="font-medium">{selectedvoucher.shop}</p>
                  </div>
    
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Donor ID</p>
                    <p className="font-medium">{selectedvoucher.donorId}</p>
                  </div>
                </div>
    
                <div className="mt-6">
                  <button
                    onClick={() => setIsModalvoucher(false)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };



    const handleStatusUpdate = async (id, newStatus) => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(
          `http://localhost:3005/api/admin/impactees/${id}/status`,
          { status: newStatus },
          { headers: { token: token } }
        );
        fetchImpactees();
        setIsDropdownOpen({ ...isDropdownOpen, [id]: false });
      } catch (error) {
        console.error("Error updating impactee status:", error.message);
      }
    };
  
    const toggleDropdown = (id) => {
      setIsDropdownOpen(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    };
    
    const ImpacteeManagement = () => {

      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Impactee Management</h1>
          </div>
    
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Name</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Donor ID</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Status</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Created At</th>
                  <th className="border border-gray-200 p-3 text-left font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {impactees.map((impactee) => (
                  <tr key={impactee._id} className="border-b hover:bg-gray-50">
                    <td className="border border-gray-200 p-3">{impactee.impacteeDetails.name}</td>
                    <td className="border border-gray-200 p-3">
                      {impactee.donorId ? impactee.donorId._id : 'No Donor'}
                    </td>
                    <td className="border border-gray-200 p-3">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(impactee._id)}
                          className={`w-full px-4 py-2 text-left text-sm font-medium rounded-md 
                            ${impactee.status === 'Approved' ? 'bg-green-100 text-green-800' :
                              impactee.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'} 
                            hover:bg-opacity-80 focus:outline-none`}
                        >
                          {impactee.status}
                        </button>
                        
                        {isDropdownOpen[impactee._id] && (
                          <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg">
                            <div className="py-1">
                              <button
                                onClick={() => handleStatusUpdate(impactee._id, 'Pending')}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Pending
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(impactee._id, 'Approved')}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Approved
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(impactee._id, 'Rejected')}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Rejected
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-200 p-3">
                      {new Date(impactee.createdAt).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-200 p-3">
                      <button
                        onClick={() => {
                          setSelectedImpactee(impactee);
                          setIsModalOpen1(true);
                        }}
                        className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    
          {/* Modal */}
          {isModalOpen1 && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-96 max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Impactee Details
                  </h3>
                  <button
                    onClick={() => setIsModalOpen1(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium">{selectedImpactee?.impacteeDetails.name}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`font-medium ${
                      selectedImpactee?.status === 'Approved' ? 'text-green-600' :
                      selectedImpactee?.status === 'Rejected' ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {selectedImpactee?.status}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-gray-600">Donor ID</p>
                    <p className="font-medium">{selectedImpactee?.donorId?._id || 'No Donor'}</p>
                  </div>
                </div>
    
                <div className="mt-6">
                  <button
                    onClick={() => setIsModalOpen1(false)}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };
    

  const renderUsersList = (users, title, type) => (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{`${user.FirstName} ${user.LastName}`}</td>
                <td className="p-2">{user.Email}</td>
                <td className="p-2">{user.PhoneNumber}</td>
                <td className="p-2 flex space-x-2">
                  
                  <button className="text-red-500 hover:bg-red-100 p-1 rounded">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNGODetails = (ngo) => (
    <div>
      <h2 className="text-2xl font-bold mb-4">{ngo.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <Info className="mr-2 text-blue-500" />
            <p><strong>Registration Number:</strong> {ngo.registrationNumber}</p>
          </div>
          <div className="flex items-center mb-2">
            <MapPin className="mr-2 text-green-500" />
            <p><strong>Address:</strong> {ngo.address}</p>
          </div>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 text-purple-500" />
            <p><strong>Phone:</strong> {ngo.phone}</p>
          </div>
          <div className="flex items-center mb-2">
            <Globe className="mr-2 text-red-500" />
            <p><strong>Website:</strong> {ngo.website}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Causes</h3>
          {Array.isArray(ngo.causes) && ngo.causes.length > 0 ? (
            ngo.causes.map((cause, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
                <p><strong>{cause.title}</strong></p>
                <p>{cause.description}</p>
                <p>Goal: ${cause.goal}</p>
                <p>Timeline: {new Date(cause.timeline).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p>No causes available</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.isArray(ngo.packages) && ngo.packages.length > 0 ? (
            ngo.packages.map((pkg, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg">
                <p><strong>{pkg.title}</strong></p>
                <p>{pkg.description}</p>
                <p>Price: ${pkg.price}</p>
              </div>
            ))
          ) : (
            <p>No packages available</p>
          )}
        </div>
      </div>
    </div>
  );
  

  const renderSupplierDetails = (supplier) => (
    <div>
      <h2 className="text-2xl font-bold mb-4">{supplier.storeName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center mb-2">
            <MapPin className="mr-2 text-green-500" />
            <p><strong>Address:</strong> {supplier.address}</p>
          </div>
          <div className="flex items-center mb-2">
            <Phone className="mr-2 text-purple-500" />
            <p><strong>Contact Number:</strong> {supplier.contactNumber}</p>
          </div>
          <div className="flex items-center mb-2">
            <Package className="mr-2 text-blue-500" />
            <p><strong>Store Visibility:</strong> {supplier.isStoreVisible ? 'Visible' : 'Hidden'}</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Bank Details</h3>
          <div className="bg-gray-100 p-3 rounded-lg">
            <p><strong>Bank Name:</strong> {supplier.bankDetails.bankName}</p>
            <p><strong>Account Number:</strong> {supplier.bankDetails.accountNumber}</p>
            <p><strong>Routing Number:</strong> {supplier.bankDetails.routingNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
// Add this to your existing state declarations




  //const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: '',
    registrationNumber: '',
    description: '',
    address: '',
    phone: '',
    website: '',
    causes: [],
    packages: [],
    impactees: []
  });
  

  // Delete NGO function
  const handleDeleteNGO = async (id) => {
    if (window.confirm('Are you sure you want to delete this NGO?')) {
      console.log('Deleting NGO with ID:', id);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:3005/api/admin/ngos/${id}`, {
          headers: { token: token }
        });
        console.log('Response from server:', response.data);
        fetchNGOs(); // Refresh NGO list after deletion
      } catch (error) {
        console.error('Error deleting NGO:', error);
        if (error.response) {
          // Server-side error
          alert(`Failed to delete NGO: ${error.response.data.message}`);
        } else {
          // Network or client-side error
          alert('Failed to delete NGO. Please try again.');
        }
      }
    }
  };
  

  // Update NGO function
  const handleUpdateNGO = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3005/api/admin/ngos/${id}`,
        editFormData,
        {
          headers: { token: token }
        }
      );
      setIsEditModalOpen(false);
      fetchNGOs(); // Refresh NGO list after update
    } catch (error) {
      console.error('Error updating NGO:', error);
      alert('Failed to update NGO. Please try again.');
    }
  };

  // Handle input changes for edit form
  const handleEditInputChange = (e, field) => {
    setEditFormData({
      ...editFormData,
      [field]: e.target.value
    });
  };

  // Handle array input changes (causes, packages, impactees)
  const handleArrayInputChange = (index, field, subfield, value) => {
    const newArray = [...editFormData[field]];
    newArray[index] = {
      ...newArray[index],
      [subfield]: value
    };
    setEditFormData({
      ...editFormData,
      [field]: newArray
    });
  };

  // Open edit modal with NGO data
  const openEditModal = (ngo) => {
    setEditFormData(ngo);
    setIsEditModalOpen(true);
  };

  const renderNGOsList = () => (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">NGOs List</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Registration Number</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ngos.map((ngo) => (
              <tr key={ngo._id} className="border-b">
                <td className="p-2">{ngo.name}</td>
                <td className="p-2">{ngo.registrationNumber}</td>
                <td className="p-2">{ngo.phone}</td>
                <td className="p-2 flex space-x-2">
                  <button 
                    onClick={() => {
                      setSelectedNGO(ngo);
                      setIsDetailModalOpen(true);
                    }}
                    className="text-blue-500 hover:bg-blue-100 p-1 rounded"
                  >
                    <Info size={16} />
                  </button>
                  {/* <button 
                    onClick={() => openEditModal(ngo)}
                    className="text-blue-500 hover:bg-blue-100 p-1 rounded"
                  >
                    <Edit size={16} />
                  </button> */}
                  <button 
                    onClick={() => handleDeleteNGO(ngo._id)}
                    className="text-red-500 hover:bg-red-100 p-1 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {/* Edit Modal */}
{/* {isEditModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Edit NGO</h3>
        <button
          onClick={() => setIsEditModalOpen(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={editFormData.name}
              onChange={(e) => handleEditInputChange(e, 'name')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
            <input
              type="text"
              value={editFormData.registrationNumber}
              onChange={(e) => handleEditInputChange(e, 'registrationNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              value={editFormData.phone}
              onChange={(e) => handleEditInputChange(e, 'phone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Website</label>
            <input
              type="text"
              value={editFormData.website}
              onChange={(e) => handleEditInputChange(e, 'website')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            value={editFormData.address}
            onChange={(e) => handleEditInputChange(e, 'address')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={editFormData.description}
            onChange={(e) => handleEditInputChange(e, 'description')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows="3"
          />
        </div>

       
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Causes</h4>
          {editFormData.causes.map((cause, index) => (
            <div key={index} className="border rounded-md p-4 mb-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={cause.title}
                    onChange={(e) => handleArrayInputChange(index, 'causes', 'title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Goal</label>
                  <input
                    type="number"
                    value={cause.goal}
                    onChange={(e) => handleArrayInputChange(index, 'causes', 'goal', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={cause.description}
                  onChange={(e) => handleArrayInputChange(index, 'causes', 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="2"
                />
              </div>
            </div>
          ))}
        </div>

      
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Packages</h4>
          {editFormData.packages.map((pkg, index) => (
            <div key={index} className="border rounded-md p-4 mb-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={pkg.title}
                    onChange={(e) => handleArrayInputChange(index, 'packages', 'title', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => handleArrayInputChange(index, 'packages', 'price', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={pkg.description}
                  onChange={(e) => handleArrayInputChange(index, 'packages', 'description', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows="2"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => handleUpdateNGO(editFormData._id)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
)} */}

    </div>
  );



  const renderSuppliersList = () => (
    <div className="bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">Suppliers List</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Store Name</th>
              <th className="p-2">Contact Number</th>
              <th className="p-2">Address</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id} className="border-b">
                <td className="p-2">{supplier.storeName}</td>
                <td className="p-2">{supplier.contactNumber}</td>
                <td className="p-2">{supplier.address}</td>
                <td className="p-2 flex space-x-2">
                  <button 
                    onClick={() => {
                      setSelectedSupplier(supplier);
                      setIsDetailModalOpen(true);
                    }}
                    className="text-blue-500 hover:bg-blue-100 p-1 rounded"
                  >
                    <Info size={16} />
                  </button>
                  
                  <button 
  className="text-red-500 hover:bg-red-100 p-1 rounded"
  onClick={() => handleDelete(supplier._id, 'supplier')}
>
  <Trash2 size={16} />
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderDashboardContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dashboardStats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-gray-500 text-sm">{stat.name}</h3>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  {stat.icon}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-bold mb-4">User Distribution</h2>
                {renderPieChart()}
              </div>
            </div>
          </div>
        );
      case 'ngos':
        return renderNGOsList();
      case 'suppliers':
        return renderSuppliersList();
        case 'needy':
          return renderNeedyIndividualsList();
          case 'Impactee':
            return ImpacteeManagement();
            case 'voucher':
              return VoucherManagement();
        case 'donors':
            return renderUsersList(donors, 'Donors List', 'donor');
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 text-center border-b">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          {[
            { name: 'Dashboard', icon: <BarChart2 />, tab: 'dashboard' },
            { name: 'Donors', icon: <Users />, tab: 'donors' },
            { name: 'NGOs', icon: <Home />, tab: 'ngos' },
            { name: 'Suppliers', icon: <ShoppingBag />, tab: 'suppliers' },
            { name: 'Needy Individuals', icon: <ShoppingBag />, tab: 'needy' },
            { name: 'Impactee', icon: <ShoppingBag />, tab: 'Impactee' },
            { name: 'Voucher', icon: <ShoppingBag />, tab: 'voucher' }
          ].map((item) => (
            <button
              key={item.tab}
              onClick={() => setActiveTab(item.tab)}
              className={`w-full flex items-center space-x-2 p-2 rounded mb-2 ${
                activeTab === item.tab 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
          
          {/* LogOut Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 p-2 rounded mt-auto hover:bg-gray-100 text-red-500"
          >
            <LogOutIcon className="mr-2" size={16} />
            <span>LogOut</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {renderDashboardContent()}
        {/* Detail Modal for NGO and Supplier Details */}
        <DetailModal 
          isOpen={isDetailModalOpen} 
          onClose={() => setIsDetailModalOpen(false)}
        >
          {selectedNGO && renderNGODetails(selectedNGO)}
          {selectedSupplier && renderSupplierDetails(selectedSupplier)}
        </DetailModal>

        {/* Edit Modal for Users, NGOs, and Suppliers */}
        <DetailModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
        >
          {selectedUser && (
            <EditUserForm 
              user={selectedUser}
              type={editType}
              onSubmit={handleEdit}
              onCancel={() => setIsEditModalOpen(false)}
            />
          )}
        </DetailModal>
      </div>
    </div>
  );
};

export default AdminDashboard;