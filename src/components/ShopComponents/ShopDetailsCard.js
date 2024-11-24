import React from 'react';

const ShopDetailsCard = ({ shopDetails }) => {
  if (!shopDetails) {
    return <p>Loading shop details...</p>; // Handle undefined `shopDetails`
  }

  const { storeName, contactNumber, address, bankDetails, isStoreVisible } = shopDetails;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{storeName || 'Unnamed Shop'}</h2>
      <div className="space-y-2">
        <p><strong>Contact:</strong> {contactNumber || 'N/A'}</p>
        <p><strong>Address:</strong> {address || 'N/A'}</p>
        <div className="border-t pt-2">
          <h3 className="font-semibold">Bank Details</h3>
          <p>Bank: {bankDetails?.bankName || 'Not provided'}</p>
          <p>Account: {bankDetails?.accountNumber || 'Not provided'}</p>
        </div>
        <div className="mt-4">
          <span 
            className={`px-3 py-1 rounded ${
              isStoreVisible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {isStoreVisible ? 'Store Visible' : 'Store Hidden'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailsCard;