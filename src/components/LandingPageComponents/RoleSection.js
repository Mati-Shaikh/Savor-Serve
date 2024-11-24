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
          <h1 className="text-5xl font-bold text-blue-600 mb-6">Choose your Role</h1>
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
                  <div className="p-3 rounded-lg bg-blue-50">
                    <role.icon size={32} className="text-blue-600" />
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
                      <Heart size={16} className="text-blue-600" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Download Links */}
              
             
                {/* Action Button */}
                <a href='signUp' className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Select Role
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;