import React, { useState } from 'react';
import { 
  Store, 
  CreditCard, 
  History, 
  Ticket, 
  User, 
  Plus,
  Upload,
  Search,
  CheckCircle,
  Clock
} from 'lucide-react';

const GrocerySupplierDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Sample transaction data
  const transactions = [
    { 
      id: 'TXN001', 
      voucherId: 'V123456',
      amount: 50.00,
      date: '2024-11-14',
      status: 'completed',
      beneficiary: 'John Doe'
    },
    { 
      id: 'TXN002', 
      voucherId: 'V123457',
      amount: 35.00,
      date: '2024-11-13',
      status: 'pending',
      beneficiary: 'Jane Smith'
    }
  ];

  const tabs = [
    { id: 'profile', icon: <User className="h-4 w-4" />, label: 'Profile' },
    { id: 'vouchers', icon: <Ticket className="h-4 w-4" />, label: 'Voucher Redemption' },
    { id: 'shop', icon: <Store className="h-4 w-4" />, label: 'Shop Management' },
    { id: 'transactions', icon: <History className="h-4 w-4" />, label: 'Transactions' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Grocery Supplier Dashboard</h1>
        <p className="text-gray-600">Manage your store, vouchers, and transactions</p>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Vouchers Redeemed</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <Ticket className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Today's Transactions</p>
              <p className="text-2xl font-bold">$342.50</p>
            </div>
            <CreditCard className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Redemptions</p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Beneficiaries</p>
              <p className="text-2xl font-bold">89</p>
            </div>
            <User className="h-8 w-8 text-purple-500" />
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
              <h2 className="text-xl font-semibold">Supplier Profile</h2>
              
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" className="mt-1 w-full rounded-md border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" className="mt-1 w-full rounded-md border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="tel" className="mt-1 w-full rounded-md border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input type="text" className="mt-1 w-full rounded-md border p-2" />
                  </div>
                </div>
              </div>

              {/* Bank Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Bank Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                    <input type="text" className="mt-1 w-full rounded-md border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Number</label>
                    <input type="text" className="mt-1 w-full rounded-md border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">SWIFT Code</label>
                    <input type="text" className="mt-1 w-full rounded-md border p-2" />
                  </div>
                </div>
              </div>

              <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          )}

          {/* Voucher Redemption Tab */}
          {activeTab === 'vouchers' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Voucher Redemption</h2>
              
              {/* Voucher Input */}
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <input 
                    type="text" 
                    placeholder="Enter Voucher ID"
                    className="flex-1 rounded-md border p-2"
                  />
                  <button className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700">
                    Redeem
                  </button>
                </div>
              </div>

              {/* Recent Redemptions */}
              <div className="mt-6">
                <h3 className="mb-4 text-lg font-medium">Recent Redemptions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left">Voucher ID</th>
                        <th className="px-4 py-2 text-left">Beneficiary</th>
                        <th className="px-4 py-2 text-left">Amount</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {transactions.map((txn) => (
                        <tr key={txn.id}>
                          <td className="px-4 py-2">{txn.voucherId}</td>
                          <td className="px-4 py-2">{txn.beneficiary}</td>
                          <td className="px-4 py-2">${txn.amount.toFixed(2)}</td>
                          <td className="px-4 py-2">
                            <span className={`rounded-full px-2 py-1 text-sm ${
                              txn.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {txn.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">{txn.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Shop Management Tab */}
          {activeTab === 'shop' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Shop Management</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Store Name</label>
                  <input type="text" className="mt-1 w-full rounded-md border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Store Address</label>
                  <textarea className="mt-1 w-full rounded-md border p-2" rows="3" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                  <input type="tel" className="mt-1 w-full rounded-md border p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Operating Hours</label>
                  <input type="text" className="mt-1 w-full rounded-md border p-2" placeholder="e.g., Mon-Sat: 9AM-8PM" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="visibility" className="rounded border-gray-300" />
                  <label htmlFor="visibility" className="text-sm text-gray-700">Make store visible to voucher recipients</label>
                </div>

                <button className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                  Update Store Information
                </button>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Transaction History</h2>
              
              {/* Search and Filter */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Search transactions..."
                    className="w-full rounded-md border p-2"
                  />
                </div>
                <select className="rounded-md border p-2">
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 3 Months</option>
                </select>
              </div>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left">Transaction ID</th>
                      <th className="px-4 py-2 text-left">Voucher ID</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {transactions.map((txn) => (
                      <tr key={txn.id}>
                        <td className="px-4 py-2">{txn.id}</td>
                        <td className="px-4 py-2">{txn.voucherId}</td>
                        <td className="px-4 py-2">${txn.amount.toFixed(2)}</td>
                        <td className="px-4 py-2">{txn.date}</td>
                        <td className="px-4 py-2">
                          <span className={`rounded-full px-2 py-1 text-sm ${
                            txn.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            View Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
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

export default GrocerySupplierDashboard;