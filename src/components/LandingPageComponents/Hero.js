import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[500px] lg:h-[700px] hero-section">
      {/* Background Image */}
      <img
        src="/donation.jpg" // Replace with your image path
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">Savor & Serve</h1>
        <p className="text-xl lg:text-2xl font-semibold max-w-3xl">
          "Your small contribution can make a big difference. Join us to serve, uplift, and transform communities together!"
        </p>
        <button className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition duration-300">
          Donate Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
