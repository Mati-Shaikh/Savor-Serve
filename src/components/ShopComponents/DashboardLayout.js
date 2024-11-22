import React, { useState, useEffect } from 'react';
import { fetchShopDetails } from '../../Services/api';
import RegisterShopModal from './RegisterShopModal';
import ShopDetailsCard from './ShopDetailsCard';
import UpdateShopForm from './UpdateShopForm';

const Dashboard = () => {
  const [shopDetails, setShopDetails] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const loadShopDetails = async () => {
    try {
      setIsLoading(true);
      const details = await fetchShopDetails();
      setShopDetails(details);
      setIsLoading(false);
    } catch (error) {
      setShowRegisterModal(true);
      setIsLoading(false);
    }
  };

  // Load shop details when component mounts or update trigger changes
  useEffect(() => {
    loadShopDetails();
  }, [updateTrigger]);

  // Handle success after registering a shop
  const handleRegisterSuccess = (registeredShop) => {
    setShopDetails(registeredShop);
    setShowRegisterModal(false);
    setUpdateTrigger(prev => prev + 1);
  };

  // Handle success after updating shop details
  const handleUpdateSuccess = () => {
    // Increment update trigger to force re-fetch of shop details
    setUpdateTrigger(prev => prev + 1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Grocery Supplier Dashboard</h1>

        {showRegisterModal && (
          <RegisterShopModal
            onClose={() => setShowRegisterModal(false)}
            onSuccess={handleRegisterSuccess}
          />
        )}

        {shopDetails ? (
          <div className="grid md:grid-cols-2 gap-6">
            <ShopDetailsCard shopDetails={shopDetails} />
            <UpdateShopForm
              currentDetails={shopDetails}
              onUpdateSuccess={handleUpdateSuccess}
            />
          </div>
        ) : (
          <p>No shop details available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;