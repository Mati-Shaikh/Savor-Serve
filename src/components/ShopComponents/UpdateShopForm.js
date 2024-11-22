import React, { useState } from 'react';
import { updateShopDetails } from '../../Services/api';

const UpdateShopForm = ({ currentDetails, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    storeName: currentDetails.storeName,
    contactNumber: currentDetails.contactNumber,
    address: currentDetails.address,
    isStoreVisible: currentDetails.isStoreVisible
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming the API returns the updated shop details
      await updateShopDetails(formData);
      onUpdateSuccess(); // This will trigger dashboard re-render
    } catch (error) {
      alert('Update failed: ' + error.message);
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Update Shop Details</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={formData.storeName}
          onChange={(e) => setFormData({...formData, storeName: e.target.value})}
          className="w-full p-2 border rounded"
          placeholder="Store Name"
        />
        {/* Add similar inputs for other fields */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isStoreVisible}
            onChange={(e) => setFormData({...formData, isStoreVisible: e.target.checked})}
            className="mr-2"
          />
          <label>Store Visibility</label>
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Shop
        </button>
      </div>
    </form>
  );
};

export default UpdateShopForm;