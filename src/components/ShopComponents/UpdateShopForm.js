import React, { useState } from "react";
import { updateShopDetails } from "../../Services/api";

const UpdateShopForm = ({ currentDetails, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    storeName: currentDetails.storeName || "",
    contactNumber: currentDetails.contactNumber || "",
    address: currentDetails.address || "",
    isStoreVisible: currentDetails.isStoreVisible || false,
    bankDetails: {
      bankName: currentDetails.bankDetails?.bankName || "",
      accountNumber: currentDetails.bankDetails?.accountNumber || "",
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming the API returns the updated shop details
      await updateShopDetails(formData);
      onUpdateSuccess(); // Trigger dashboard re-render or success notification
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Update Shop Details</h2>
      <div className="space-y-4">
        {/* Store Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Store Name</label>
          <input
            type="text"
            value={formData.storeName}
            onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Store Name"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact Number</label>
          <input
            type="text"
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Contact Number"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-2 border rounded"
            placeholder="Address"
          />
        </div>

        {/* Bank Details */}
        <div className="border-t pt-4">
          <h3 className="font-semibold text-gray-700">Bank Details</h3>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              value={formData.bankDetails.bankName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bankDetails: { ...formData.bankDetails, bankName: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
              placeholder="Bank Name"
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">Account Number</label>
            <input
              type="text"
              value={formData.bankDetails.accountNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bankDetails: { ...formData.bankDetails, accountNumber: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
              placeholder="Account Number"
            />
          </div>
        </div>

        {/* Store Visibility */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            checked={formData.isStoreVisible}
            onChange={(e) => setFormData({ ...formData, isStoreVisible: e.target.checked })}
            className="mr-2"
          />
          <label className="text-sm font-medium text-gray-700">Store Visibility</label>
        </div>

        {/* Submit Button */}
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
