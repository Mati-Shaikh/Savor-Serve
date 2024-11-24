import React from 'react';

const AboutUs = () => {
  // Sample data for Management Team
  const managementTeam = [
    {
      name: "John Doe",
      role: "CEO & Founder",
      image: "https://cdn.pixabay.com/photo/2024/05/19/19/30/ai-generated-8773212_1280.png", // Replace with actual image paths
      description: "Leading with vision and commitment to making an impact."
    },
    {
      name: "Jane Smith",
      role: "Operations Manager",
      image: "https://cdn.pixabay.com/photo/2024/05/19/19/30/ai-generated-8773212_1280.png",
      description: "Ensuring smooth operations and effective strategies."
    },
    {
      name: "Michael Johnson",
      role: "Community Coordinator",
      image: "https://cdn.pixabay.com/photo/2024/05/19/19/30/ai-generated-8773212_1280.png",
      description: "Connecting with communities to drive meaningful change."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          At Savor and Serve, we are dedicated to creating positive change through our unique platform. Learn more about our goals, vision, and mission.
        </p>
      </div>

      {/* Goals, Vision, Mission Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {['Goals', 'Vision', 'Mission'].map((section, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <img
              src={`https://cdn.pixabay.com/photo/2024/05/19/19/30/ai-generated-8773212_1280.png`} // Replace with actual image paths
              alt={section}
              className="w-48 h-48 rounded-lg object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">{section}</h3>
            <p className="text-gray-600">
              {section === 'Goals' ? 'Our aim is to support communities in need through targeted initiatives and outreach programs.'
                : section === 'Vision' ? 'A world where everyone has the resources they need to thrive and make a positive impact.'
                : 'Dedicated to empowering individuals and organizations to make a difference in their communities.'}
            </p>
          </div>
        ))}
      </div>

      {/* Volunteer Invitation Section */}
      <div className="max-w-3xl mx-auto text-center bg-white rounded-lg shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Would you like to become a Volunteer?</h2>
        <p className="text-gray-600 mb-4">
          My Impact Meter needs all the volunteers we can get. If you would like to become a volunteer, please email us at <a href="mailto:info@myimpactmeter.com" className="text-blue-600">info@myimpactmeter.com</a> with the title: “Volunteer” and we will send you the whole volunteer pack.
        </p>
      </div>

      {/* Management Team Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Management Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {managementTeam.map((member, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-blue-600 font-medium">{member.role}</p>
              <p className="text-gray-600 text-center mt-2">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
