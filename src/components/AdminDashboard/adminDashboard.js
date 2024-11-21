import React, { useState, useEffect } from 'react';
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
  Globe 
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
  const [ngos, setNGOs] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editType, setEditType] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donorsData = await apiService.getDonors();
        const ngosData = await apiService.getNGOs();
        const suppliersData = await apiService.getSuppliers();

        setDonors(donorsData.donors);
        setNGOs(ngosData.ngos);
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
          setNGOs(ngos.filter(ngo => ngo._id !== id));
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
          setNGOs(ngos.map(ngo => 
            ngo._id === id ? { ...ngo, ...updatedData } : ngo
          ));
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
                  <button className="text-blue-500 hover:bg-blue-100 p-1 rounded">
                    <Edit size={16} />
                  </button>
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
          {ngo.causes.map((cause, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
              <p><strong>{cause.title}</strong></p>
              <p>{cause.description}</p>
              <p>Goal: ${cause.goal}</p>
              <p>Timeline: {new Date(cause.timeline).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2">Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ngo.packages.map((pkg, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg">
              <p><strong>{pkg.title}</strong></p>
              <p>{pkg.description}</p>
              <p>Price: ${pkg.price}</p>
            </div>
          ))}
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
                  <button className="text-blue-500 hover:bg-blue-100 p-1 rounded">
                    <Edit size={16} />
                  </button>
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
                  <button className="text-blue-500 hover:bg-blue-100 p-1 rounded">
                    <Edit size={16} />
                  </button>
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
            { name: 'Suppliers', icon: <ShoppingBag />, tab: 'suppliers' }
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