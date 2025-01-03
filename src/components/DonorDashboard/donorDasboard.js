import React, { useState, useEffect } from 'react';
import axios from "axios";
//import { Wallet } from "react-feather"; 
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
import { toast } from 'react-toastify'; // If you want to display success/error notifications


const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [donationHistory, setDonationHistory] = useState([]);
  const [walletBalance, setWalletBalance] = useState(null); // State for wallet balance
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [customAmount, setCustomAmount] = useState(""); // Custom amount input state
  const [transactions, setTransactions] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const [count, setcount] = useState(0);
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [impacteeForm, setImpacteeForm] = useState({
    name: "",
    age: "",
    needs: ""
  });


  const token = localStorage.getItem("token");
  

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login.");
      }
        const response = await fetch('http://localhost:3005/api/donor/donations', {
          headers: {
            token: token,
          },
        });
        const data = await response.json();
        setDonationHistory(data);
      } catch (error) {
        console.error('Error fetching donation history:', error);
      }
    };

    fetchDonations();
  }, [token]);



  const fetchWalletData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login.");
      }

      const response = await axios.get("http://localhost:3005/api/donor/wallet", {
        headers: {
          token: token,  // Sending token in header
        },
      });

      // Extracting the wallet balance from the response
      const balance = response.data.balance;

      setWalletBalance(balance);
      setLoading(false);  // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching wallet data", error);
      setError("Failed to fetch wallet data.");
      setLoading(false);  // Set loading to false in case of an error
    }
  };

   // Add funds to wallet
   const handleAddFunds = async (amount) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found, please login.");
      }

      const response = await axios.post(
        "http://localhost:3005/api/donor/wallet/add",
        { amount },
        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.message === "Amount added successfully") {
        // Update wallet balance and transaction history
        const updatedWallet = response.data.wallet;
        setWalletBalance(updatedWallet.balance);
        setTransactions(updatedWallet.transactions);
        setCustomAmount(amount);
    setShowModal(true);
      }
    } catch (error) {
      console.error("Error adding funds", error);
      setError("Failed to add funds.");
    }
  };
  // Handle custom amount input
  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
  };


  const handleCustomAmountSubmit = () => {
    const amount = parseFloat(customAmount); // Ensure the custom amount is a valid number
    if (!isNaN(amount) && amount > 0) {
      handleAddFunds(amount); // Reuse handleAddFunds function
    } else {
      alert("Please enter a valid amount greater than 0.");
    }
  };
  
  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsConfirmed(true);

      setTimeout(() => {
        setShowModal(false);
        setIsConfirmed(false);
      }, 2000);
    }, 2000);
  };

  // Fetch wallet data when the component mounts
  useEffect(() => {
    fetchWalletData();
  }, []);
  useEffect(() => {
    fetchPendingRequests();
  }, []); // Run once on component mount


  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get("http://localhost:3005/api/admin/impactees", {
        headers: { token },
      });
  
      // Validate response structure
      if (!response.data || !response.data.impactees) {
        console.error("Unexpected response format:", response.data);
        return;
      }
  
      // Decode the token to extract donorId
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
      const donorId = decodedToken._id; // Assuming the token contains `_id` as the donor's ID
  
      // Filter impactees whose donorId matches the decoded token's id
      const matchingImpactees = response.data.impactees.filter(
        (impactee) => impactee.donorId && impactee.donorId._id === donorId
      );
  
      // Update state or UI with the matching impactees
      setPendingRequests(matchingImpactees); // Assuming setPendingRequests updates the UI state
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("API endpoint not found. Check the URL and server configuration.");
      } else {
        console.error("Error fetching pending requests:", error);
      }
    }
  };
  
  

  // Function to handle submitting a new impactee request
  const submitImpacteeRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/donor/impactee-request",
        impacteeForm,
        {
          headers: { token:token },
        }
      );
      toast.success(response.data.message); // Show success message
      fetchPendingRequests(); // Refresh the list of pending requests
      setShowAddBeneficiary(false); // Close the form
    } catch (error) {
      toast.error("Error submitting request.");
      console.error("Error submitting impactee request", error);
    }
  };

  // Handle input change for the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImpacteeForm((prev) => ({ ...prev, [name]: value }));
  };

 

  const fetchPendingRequestsCount = async () => {
    try {
      const token = localStorage.getItem('token'); // or use context for the token
      const response = await axios.get('http://localhost:3005/api/donor/impactees', {
        headers: { token:token },
      });

      // Assuming response.data is an array of requests
      const pendingRequests = response.data.filter(request => request.status === 'Pending');
      setPendingRequestsCount(pendingRequests.length);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };


  const fetchHelpedPeople = async () => {
    try {
      const token = localStorage.getItem('token'); // or use context for the token
      const response = await axios.get('http://localhost:3005/api/donor/donations', {
        headers: { token:token },
      });

      // Assuming response.data is an array of requests
      //const count = response.data.filter(request => request.status === 'Pending');
      setcount(response.data.length);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  };



  useEffect(() => {
    fetchHelpedPeople();
    fetchPendingRequestsCount();
  }, []); // Empty dependency array ensures it runs only once on mount



  const tabs = [
    { id: 'wallet', icon: <Wallet className="h-4 w-4" />, label: 'Wallet' },
    { id: 'requests', icon: <Users className="h-4 w-4" />, label: 'Requests' },
    { id: 'history', icon: <History className="h-4 w-4" />, label: 'History' }
  ];

  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <p>Loading...</p>
      </div>
    );
  }

  
   

  if (error) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header with Logout */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600">Manage your donations and impact</p>
        </div>
        
      </div>

      {/* Impact Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Donations</p>
              <p className="text-2xl font-bold">{userData?.impactStats?.totalDonations || 0}</p>
            </div>
            <Heart className="h-8 w-8 text-red-500" />
          </div>
        </div> */}

        <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Wallet Balance</p>
          <p className="text-2xl font-bold">Rs{walletBalance}</p>
        </div>
        <Wallet className="h-8 w-8 text-green-500" />
      </div>
    </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">People Helped</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Active Requests</p>
          <p className="text-2xl font-bold">{pendingRequestsCount}</p>
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
                className={`flex items-center space-x-2 border-b-2 px-4 py-2 Rs{
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
         

          {/* Wallet Tab */}
          {activeTab === "wallet" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Wallet Management</h2>

          <div className="rounded-lg bg-blue-50 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="text-3xl font-bold text-blue-600">Rs{walletBalance}</p>
              </div>
              <Wallet className="h-12 w-12 text-blue-500" />
            </div>

            <div className="space-y-4">
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAddFunds(100)}
                  className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Add Rs100
                </button>
                <button
                  onClick={() => handleAddFunds(500)}
                  className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Add Rs500
                </button>
                <button
                  onClick={() => handleAddFunds(1000)}
                  className="flex-1 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                  Add Rs1000
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="flex-1 rounded-md border p-2"
                />
                <button
                  onClick={handleCustomAmountSubmit}
                  className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                >
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
                  {transactions.map((transaction) => (
                    <tr key={transaction._id}>
                      <td className="px-4 py-2">{new Date(transaction.date).toLocaleString()}</td>
                      <td className="px-4 py-2">{transaction.type}</td>
                      <td className="px-4 py-2">Rs{transaction.amount}</td>
                      <td className="px-4 py-2">{transaction.type === "credit" ? "Added" : "Donated"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            {!isLoading && !isConfirmed && (
              <>
                <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => handlePaymentMethodSelect("JazzCash")}
                    className="w-full rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
                  >
                    JazzCash
                  </button>
                  <button
                    onClick={() => handlePaymentMethodSelect("EasyPaisa")}
                    className="w-full rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    EasyPaisa
                  </button>
                  <button
                    onClick={() => handlePaymentMethodSelect("Bank")}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    Bank Account
                  </button>
                </div>
              </>
            )}

            {isLoading && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                <p>Processing...</p>
              </div>
            )}

            {isConfirmed && (
              <div className="text-center">
                <p className="text-3xl">✅</p>
                <p className="mt-4 text-lg font-medium">Amount Successfully Added!</p>
              </div>
            )}
          </div>
        </div>
      )}

{activeTab === 'requests' && (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Beneficiary Requests</h2>
      <button
        onClick={() => setShowAddBeneficiary(!showAddBeneficiary)}
        className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        <Plus className="h-4 w-4" />
        <span>Add New Beneficiary</span>
      </button>
    </div>

    {showAddBeneficiary && (
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Add New Impactee</h3>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={impacteeForm.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="cnic"
            value={impacteeForm.cnic}
            onChange={handleInputChange}
            placeholder="CNIC (e.g., 12345-6789012-3)"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <textarea
            name="address"
            value={impacteeForm.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            onClick={submitImpacteeRequest}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Submit Request
          </button>
        </div>
      </div>
    )}

    {/* Pending Requests */}
    <div>
      <h3 className="mb-4 text-lg font-medium">Pending Requests</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Beneficiary</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pendingRequests.length > 0 ? (
              pendingRequests.map((request) => (
                <tr key={request._id}>
                  <td className="px-4 py-2">{request._id}</td>
                  <td className="px-4 py-2">{request.impacteeDetails.name}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-sm ${
                        request.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : request.status === "Approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(request.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">
                  No beneficiary requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}


          {/* History Tab */}
          {activeTab === 'history' && (
  <div>
    <h3 className="mb-4 text-lg font-medium">Recent Donations</h3>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Beneficiary</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Impact Category</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {Array.isArray(donationHistory) && donationHistory.length > 0 ? (
            donationHistory.map((donation) => (
              <tr key={donation._id}>
                <td className="px-4 py-2">{donation._id}</td>
                <td className="px-4 py-2">{donation.impacteeId || "N/A"}</td>
                <td className="px-4 py-2">Rs{donation.amount}</td>
                <td className="px-4 py-2">{new Date(donation.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{donation.impacteeId ? "Impact" : "No Impact"}</td>
               
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">View Details</button>
                    <button className="text-green-600 hover:text-green-800">Download Receipt</button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">No donations available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;