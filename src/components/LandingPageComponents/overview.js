import React from 'react';
import { Heart, Gift, CreditCard, Users, LineChart } from 'lucide-react';

const Overview = () => {
  const features = [
    {
      title: "Support Trusted NGOs",
      description: "Discover reputable NGOs in one place and donate directly to their campaigns, packs, and causes.",
      icon: Heart,
      color: "text-blue-600"
    },
    {
      title: "Send Digital Vouchers",
      description: "Gift rations or education to deserving people by adding their CNIC. Make direct impact with digital giving.",
      icon: Gift,
      color: "text-pink-600"
    },
    {
      title: "Flexible Payment Options",
      description: "Make donations conveniently from anywhere in the world using a variety of payment methods, including credit cards.",
      icon: CreditCard,
      color: "text-purple-600"
    },
    {
      title: "Connect with Fellow Donors",
      description: "Build a community, share impactful beneficiary stories, and inspire change together.",
      icon: Users,
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-pink-600 mb-6">What is Savor and Serve?</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            An easy-to-use digital donation platform where you can connect with trusted NGOs, directly help people in need, and make a difference from anywhere in the world.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Tracking Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <LineChart className="text-blue-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-800">Track Your Impact</h2>
          </div>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            Monitor your contributions, see the direct impact of your donations, and stay connected with the causes you care about. Our transparent tracking system ensures you can see how your generosity makes a difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;