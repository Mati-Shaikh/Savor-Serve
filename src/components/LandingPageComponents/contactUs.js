import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import Navbar from './Header'

const ContactUs = () => {
  return (
    
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-4">Connect With Us Today!</h2>
      <p className="text-gray-600 text-center mb-8">
        Contact us! We appreciate your input and are available to address any inquiries. Our team will get back to you within 24 hours.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-start">
          <FaEnvelope className="text-red-500 h-8 w-8 mb-4" />
          <h3 className="text-lg font-medium mb-2">Online Support</h3>
          <p className="text-gray-600">support@myimpactmeter.com</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-start">
          <FaEnvelope className="text-red-500 h-8 w-8 mb-4" />
          <h3 className="text-lg font-medium mb-2">Direct Mail</h3>
          <p className="text-gray-600">info@myimpactmeter.com</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-start">
          <FaMapMarkerAlt className="text-red-500 h-8 w-8 mb-4" />
          <h3 className="text-lg font-medium mb-2">Our Office</h3>
          <p className="text-gray-600">
            4th Floor, CP 63, Defence Raya Golf Resort, Sector M, DHA Phase 6, Lahore, Pakistan
            <br />
            OR
            <br />
            18 Winding Creek Way, San Ramon, CA 94584, U.S
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-start">
          <FaPhoneAlt className="text-red-500 h-8 w-8 mb-4" />
          <h3 className="text-lg font-medium mb-2">Contact #</h3>
          <p className="text-gray-600">
            +92322 6460266
            <br />
            OR
            <br />
            +1 (312) 885-2730
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
