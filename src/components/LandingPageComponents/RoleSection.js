import React from 'react';
import { 
  Users, 
  Store, 
  Heart, 
  UserCircle, 
  Ticket, 
  Building2 
} from 'lucide-react';

const RoleSelector = () => {
  const roles = [
    {
      title: "Impactor (Donor)",
      icon: UserCircle,
      description: "Make a difference by contributing to causes you care about. Track your donations, choose beneficiaries, and see your direct impact through our transparent system.",
      features: [
        "Track all your donations in real-time",
        "Choose specific causes or individuals to support",
        "Get detailed impact reports",
        "Connect with NGOs and beneficiaries"
      ],
      downloadLinks: true
    },
    {
      title: "NGO",
      icon: Building2,
      description: "Join our platform to streamline your charitable operations. Manage campaigns, track donations, and connect with donors efficiently.",
      features: [
        "Launch and manage campaigns",
        "Track donations and generate reports",
        "Suggest and verify beneficiaries",
        "Coordinate with shops and donors"
      ],
      downloadLinks: true
    },
    {
      title: "Shop Owner",
      icon: Store,
      description: "Partner with us to serve your community. Manage digital vouchers and help distribute aid effectively to those in need.",
      features: [
        "Accept digital vouchers",
        "Track transactions and payments",
        "Manage inventory for donations",
        "Real-time notification system"
      ],
      downloadLinks: true
    },
    {
      title: "Administrator",
      icon: Users,
      description: "Oversee and manage the entire platform. Monitor donations, verify participants, and ensure smooth operations.",
      features: [
        "Complete system oversight",
        "Manage users and permissions",
        "Generate comprehensive reports",
        "Handle verification processes"
      ],
      downloadLinks: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-pink-600 mb-6">Choose your Role</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your role in making a difference. Each role plays a vital part in our mission to create positive impact.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 rounded-lg bg-pink-50">
                    <role.icon size={32} className="text-pink-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">{role.title}</h2>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">
                  {role.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {role.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Heart size={16} className="text-pink-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Download Links */}
                {role.downloadLinks && (
                  <div className="space-y-3">
                    <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                      </svg>
                      <span>Download from App Store</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.9 5c.1 0 .2.1.2.2v13.5c0 .2-.1.3-.2.3H6.1c-.1 0-.2-.1-.2-.2V5.2c0-.1.1-.2.2-.2h11.8zm-11.8-2C4.9 3 4 3.9 4 5v14c0 1.1.9 2 2.1 2h11.8c1.2 0 2.1-.9 2.1-2V5c0-1.1-.9-2-2.1-2H6.1z"/>
                        <path d="M12 16.5c.8 0 1.5-.7 1.5-1.5s-.7-1.5-1.5-1.5-1.5.7-1.5 1.5.7 1.5 1.5 1.5zm0 2c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
                      </svg>
                      <span>Download from Play Store</span>
                    </a>
                  </div>
                )}

                {/* Action Button */}
                <button className="mt-6 w-full bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition-colors duration-300">
                  Select Role
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;