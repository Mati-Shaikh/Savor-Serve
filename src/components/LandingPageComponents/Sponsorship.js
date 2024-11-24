import React from 'react';

const SponsorshipPackages = () => {
  const packages = [
    {
      patients: 5,
      monthly: "275,000",
      annually: "3,300,000",
      color: "bg-blue-600",
      lineColor: "border-blue-600",
      side: "left"
    },
    {
      patients: 10,
      monthly: "550,000",
      annually: "6,600,000",
      color: "bg-blue-400",
      lineColor: "border-blue-400",
      side: "right"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 mb-8 leading-tight">
          Support Thalassemia Warriors Through Your Organization's CSR
        </h1>
        <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-4xl mx-auto leading-relaxed px-4">
          Your organization has the power to save lives by supporting thalassemia treatment packages. 
          Through this impactful contribution, you can provide life-saving treatments and hope to those 
          who need it most. Let your CSR initiatives create a brighter future for thalassemia warriors today!
        </p>
      </div>

      {/* Packages Diagram */}
      <div className="relative flex justify-center items-center mt-20">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8 md:gap-4">
          {/* Left Package */}
          <div className="w-full md:w-1/3 flex justify-end items-center">
            <div className="relative">
              <div className={`flex items-center ${packages[0].color} text-white rounded-full py-3 px-6 w-full md:w-[280px]`}>
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg">SPONSOR {packages[0].patients} PATIENTS</div>
                  <div className="text-sm">
                    MONTHLY | ANNUALLY
                    <br />
                    {packages[0].monthly} | {packages[0].annually}
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute left-full top-1/2 w-12 border-2 border-blue-600 -translate-y-1/2" />
            </div>
          </div>

          {/* Central Circle */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-dashed border-blue-300 flex items-center justify-center">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-blue-900 text-white flex items-center justify-center p-4">
                  <div className="text-center">
                    <p className="font-bold mb-2">SPONSOR</p>
                    <p className="text-sm">TREATMENT PACKAGES</p>
                    <p className="text-xs mt-2">Provide life-saving care for thalassemia patients.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Package */}
          <div className="w-full md:w-1/3 flex justify-start items-center">
            <div className="relative">
              <div className="hidden md:block absolute right-full top-1/2 w-12 border-2 border-blue-400 -translate-y-1/2" />
              <div className={`flex items-center ${packages[1].color} text-white rounded-full py-3 px-6 w-full md:w-[280px]`}>
                <div className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-lg">SPONSOR {packages[1].patients} PATIENTS</div>
                  <div className="text-sm">
                    MONTHLY | ANNUALLY
                    <br />
                    {packages[1].monthly} | {packages[1].annually}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipPackages;
