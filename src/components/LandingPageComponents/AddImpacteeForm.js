import React, { useState } from 'react';

const AddImpacteeForm = ({ onAddImpactee }) => { // Accepting onAddImpactee from parent
  const [impactee, setImpactee] = useState({
    name: '',
    phone: '',
    cnic: ''
  });

  // CNIC Validation Function
  const isValidCNIC = (cnic) => {
    const cnicPattern = /^\d{5}-\d{7}-\d{1}$/; // CNIC format: XXXXX-XXXXXXX-X
    return cnicPattern.test(cnic);
  };

  const handleAddImpactee = async () => {
    try {
      // CNIC validation
      if (!isValidCNIC(impactee.cnic)) {
        alert("Invalid CNIC format. Please use XXXXX-XXXXXXX-X.");
        return;
      }

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token is missing. Please log in again.");
        return;
      }

      const response = await fetch(`http://localhost:3005/api/ngo/addimpactee`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(impactee)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      alert(data.message);

      // Reset form fields after success
      setImpactee({ name: '', phone: '', cnic: '' });

      // Call the parent callback to fetch impactee data again
      onAddImpactee(); // Trigger re-fetching of impactee data in parent

    } catch (error) {
      console.error('Add Impactee Error:', error);
      alert('Adding impactee failed');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-6 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Add New Impactee</h2>
      <form className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={impactee.name}
            onChange={(e) => setImpactee({ ...impactee, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Impactee Name"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            value={impactee.phone}
            onChange={(e) => setImpactee({ ...impactee, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone Number"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">CNIC</label>
          <input
            type="text"
            value={impactee.cnic}
            onChange={(e) => setImpactee({ ...impactee, cnic: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="CNIC (XXXXX-XXXXXXX-X)"
          />
        </div>
        <button
          type="button"
          onClick={handleAddImpactee}
          className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
        >
          Add Impactee
        </button>
      </form>
    </div>
  );
};

export default AddImpacteeForm;
