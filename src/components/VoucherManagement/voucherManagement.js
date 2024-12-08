import React, { useState, useEffect } from "react";
import axios from "axios";

const VoucherManagement = () => {
  const [impactees, setImpactees] = useState([]);
  const [needyIndividuals, setNeedyIndividuals] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [activeTab, setActiveTab] = useState("vouchers");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [redeemModal, setRedeemModal] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [redeemMessage, setRedeemMessage] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const impacteesRes = await axios.get("http://localhost:3005/api/admin/impactees");
        const needyRes = await axios.get("http://localhost:3005/api/needyInd/needy");
        const vouchersRes = await axios.get("http://localhost:3005/api/donor/getVouchers");

        setImpactees(impacteesRes.data.impactees);
        setNeedyIndividuals(needyRes.data);
        setVouchers(vouchersRes.data.vouchers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRedeemVoucher = async () => {
    try {
      const response = await axios.put("http://localhost:3005/api/donor/redeem", {
        trackingId,
      });

      if (response.data) {
        setRedeemMessage("Voucher successfully redeemed!");

        // Update the status of the redeemed voucher in the state
        setVouchers((prevVouchers) =>
          prevVouchers.map((voucher) =>
            voucher.trackingId === trackingId ? { ...voucher, status: "Redeemed" } : voucher
          )
        );

        // Show success popup with tick
        setSuccessPopup(true);
      }
    } catch (error) {
      setRedeemMessage("Error redeeming voucher. Please try again.");
      console.error("Error redeeming voucher:", error);
    } finally {
      setTimeout(() => {
        setRedeemModal(false);
        setRedeemMessage("");
        setTrackingId("");
      }, 1000); // Close modal after 1 second
    }
  };

  const handleCloseSuccessPopup = () => {
    setSuccessPopup(false);
  };

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Voucher Management</h2>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div
          className="bg-white p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg"
          onClick={() => handleOpenModal(impactees)}
        >
          <p className="text-sm text-gray-500">Total Impactees</p>
          <p className="text-2xl font-bold">{impactees.length}</p>
        </div>
        <div
          className="bg-white p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg"
          onClick={() => handleOpenModal(needyIndividuals)}
        >
          <p className="text-sm text-gray-500">Total Needy Individuals</p>
          <p className="text-2xl font-bold">{needyIndividuals.length}</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">
              {modalContent === impactees ? "Impactees" : "Needy Individuals"}
            </h3>
            <div className="max-h-64 overflow-y-auto">
              {modalContent.map((item) => (
                <div key={item._id} className="border-b py-2">
                  <p>
                    <strong>Name:</strong> {item.impacteeDetails?.name || item.name}
                  </p>
                  {item.address && <p><strong>Address:</strong> {item.address}</p>}
                  {item.contactNumber && <p><strong>Contact:</strong> {item.contactNumber}</p>}
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Vouchers Section */}
      <h3 className="text-xl font-semibold mb-4">All Vouchers</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vouchers.map((voucher) => (
          <div
            key={voucher._id}
            className="relative bg-red-100 p-4 shadow-md rounded-lg flex flex-col justify-between items-center text-center border-l-4 border-red-500"
          >
            <div className="text-white bg-red-600 rounded-full px-2 py-1 text-sm absolute top-2 right-2">
              {voucher.status}
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Gift Voucher</h3>
              <p>
                <strong>Type:</strong> {voucher.type}
              </p>
              <p>
                <strong>Amount:</strong> Rs{voucher.amount}
              </p>
              <p>
                <strong>Tracking ID:</strong> {voucher.trackingId}
              </p>
            </div>
            {voucher.status !== "Redeemed" && (
              <button
                onClick={() => {
                  setTrackingId(voucher.trackingId);
                  setRedeemModal(true);
                }}
                className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 mt-4"
              >
                Assign
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Redeem Modal */}
      {redeemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Assign Voucher</h3>
            <p>Enter Tracking ID:</p>
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="w-full border p-2 rounded mt-2"
            />
            {redeemMessage && <p className="text-green-600 mt-2">{redeemMessage}</p>}
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setRedeemModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRedeemVoucher}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {successPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
            <div className="text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m0 6a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold">Success!</h3>
            <p className="mt-2">Impactee or Needy is valid, and the voucher has been assigned.</p>
            <button
              onClick={handleCloseSuccessPopup}
              className="bg-indigo-600 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoucherManagement;
