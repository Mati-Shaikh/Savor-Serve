import React, { useState } from 'react';

const AddPackageForm = () => {
  const [newPackage, setNewPackage] = useState({
    title: '',
    description: '',
    price: ''
  });

  const handleAddPackage = async (causeId) => {
    try {
      const token = localStorage.getItem("token");
      const ngoId = localStorage.getItem("ngoId");

      if (!token) {
        alert("Token is missing. Please log in again.");
        return;
      }

      const requestBody = {
        title: newPackage.title,
        description: newPackage.description,
        price: parseFloat(newPackage.price)
      };

      const response = await fetch(`http://localhost:3005/api/ngo/${ngoId}/causes/${causeId}/packages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      alert(data.message);
      setNewPackage({ title: '', description: '', price: '' });
      
    } catch (error) {
      console.error('Add Package Error:', error);
      alert('Adding package failed');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add New Package</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={newPackage.title}
            onChange={(e) => setNewPackage({...newPackage, title: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Package Title"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={newPackage.description}
            onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Package Description"
            rows="4"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={newPackage.price}
            onChange={(e) => setNewPackage({...newPackage, price: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Package Price"
          />
        </div>
        <button
          type="button"
          onClick={() => handleAddPackage('CAUSE_ID_HERE')}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackageForm;