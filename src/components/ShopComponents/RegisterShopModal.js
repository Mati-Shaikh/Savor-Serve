import React, { useState } from 'react';
import { registerShop } from '../../Services/api';

const RegisterShopModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    storeName: '',
    contactNumber: '',
    address: '',
    bankDetails: {
      accountNumber: '',
      bankName: '',
      routingNumber: ''
    }
  });

  const [error, setError] = useState(null); // Track error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset previous error
    try {
      console.log('Form Data Submitted:', formData);
      const result = await registerShop(formData);
      console.log('Registration Success:', result);
      onSuccess(result.supplier);
      onClose();
    } catch (error) {
      console.error('Error:', error.message); // Log the error
      setError(error.message); // Set the error message to display it
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Register Your Shop</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Store Name"
            value={formData.storeName}
            onChange={(e) => setFormData({...formData, storeName: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
          {/* Bank Details */}
          <input
            type="text"
            placeholder="Account Number"
            value={formData.bankDetails.accountNumber}
            onChange={(e) => setFormData({
              ...formData, 
              bankDetails: { ...formData.bankDetails, accountNumber: e.target.value }
            })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Bank Name"
            value={formData.bankDetails.bankName}
            onChange={(e) => setFormData({
              ...formData, 
              bankDetails: { ...formData.bankDetails, bankName: e.target.value }
            })}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Routing Number"
            value={formData.bankDetails.routingNumber}
            onChange={(e) => setFormData({
              ...formData, 
              bankDetails: { ...formData.bankDetails, routingNumber: e.target.value }
            })}
            className="w-full p-2 border rounded"
            required
          />
          <div className="flex justify-between">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterShopModal;
