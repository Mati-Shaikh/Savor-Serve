import React from "react";
import { FaPhone, FaMapMarkerAlt, FaRegCalendarAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const ShopDetailsCard = ({ shopDetails }) => {
  if (!shopDetails) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading shop details...</p>
      </div>
    );
  }

  const {
    storeName,
    contactNumber,
    address,
    bankDetails,
    isStoreVisible,
    donations,
    createdAt,
    updatedAt,
    userId,
  } = shopDetails;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
      {/* Shop Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-blue-600">{storeName || "Unnamed Shop"}</h2>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            isStoreVisible ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {isStoreVisible ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
        </div>
      </div>

      {/* Contact and Address */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center">
          <FaPhone className="text-blue-500 mr-2" />
          <p className="text-gray-700">
            <strong>Contact:</strong> {contactNumber || "N/A"}
          </p>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-red-500 mr-2" />
          <p className="text-gray-700">
            <strong>Address:</strong> {address || "N/A"}
          </p>
        </div>
        <div className="flex items-center">
          <FaRegCalendarAlt className="text-green-500 mr-2" />
          <p className="text-gray-700">
            <strong>User ID:</strong> {userId || "N/A"}
          </p>
        </div>
      </div>

      {/* Bank Details */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">Bank Details</h3>
        <p className="text-gray-600">
          <strong>Bank:</strong> {bankDetails?.bankName || "Not provided"}
        </p>
        <p className="text-gray-600">
          <strong>Account:</strong> {bankDetails?.accountNumber || "Not provided"}
        </p>
      </div>

      {/* Donations */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-800">Donations</h3>
        {donations?.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {donations.map((donation, index) => (
              <li
                key={donation._id || index}
                className="bg-gray-50 p-3 rounded-lg shadow-sm border"
              >
                <p className="text-sm text-gray-700">
                  <strong>Donor ID:</strong> {donation.donorId}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Amount:</strong> Rs{donation.amount}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Date:</strong> {new Date(donation.date).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 mt-3">No donations available.</p>
        )}
      </div>

      {/* Metadata */}
      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-600">
          <strong>Created At:</strong> {new Date(createdAt).toLocaleString() || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Updated At:</strong> {new Date(updatedAt).toLocaleString() || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ShopDetailsCard;
