import React from 'react';

const WaveBackground = ({ position }) => (
  <svg className={`absolute ${position}-0 left-0 w-full`} height="100" viewBox="0 0 1440 100" preserveAspectRatio="none">
    <path d="M0,0 C120,20 220,0 300,20 C380,40 420,20 480,20 C540,20 600,40 660,40 C720,40 780,20 840,20 C900,20 960,40 1020,40 C1080,40 1140,20 1200,20 C1260,20 1320,40 1380,40 C1440,40 1440,20 1440,20 L1440,100 L0,100 Z" 
          fill="#000" />
  </svg>
);

const ContentSection = ({ title, description, imageSrc, imageAlt, reverse }) => (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center my-16`}>
      <div className="w-full md:w-1/2 px-4">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="w-full md:w-1/2 px-4 mt-8 md:mt-0 flex justify-center">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="rounded-lg shadow-lg"
          style={{ width: "150px", height: "150px" }} // Set desired width and height
        />
      </div>
    </div>
  );
  

const GamifiedExperience = () => {
  const content = [
    {
      title: "CLASSROOM MANAGEMENT",
      description: "Equipped with student solutions, automatic grading and curriculum management, Structify's Classroom Dashboard allows you to effortlessly manage your students. Fully-detailed coding lessons will help you more easily conduct your classes through engaging activities as well as monitor student progress.",
      imageSrc: "/classroom.svg",
      imageAlt: "Classroom management dashboard"
    },
    {
      title: "PERSONALIZED LEARNING PATHS",
      description: "Our adaptive learning system tailors the experience to each student's pace and style. As they progress, Structify adjusts the difficulty and provides targeted recommendations to optimize their learning journey.",
      imageSrc: "/pencil.svg",
      imageAlt: "Personalized learning dashboard"
    },
    {
      title: "INTERACTIVE CODING CHALLENGES",
      description: "Structify offers hands-on coding challenges that make learning Data Structures and Algorithms fun and engaging. Students can practice their skills in a gamified environment, receiving instant feedback and guidance.",
      imageSrc: "/code.svg",
      imageAlt: "Interactive coding challenge interface"
    }
  ];

  return (
    <div className="relative overflow-hidden">
      <WaveBackground position="top" />
      <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">ALL YOU NEED IN ONE PLACE</h2>
        {content.map((item, index) => (
          <ContentSection key={index} {...item} reverse={index % 2 !== 0} />
        ))}
      </div>
      <WaveBackground position="bottom" />
    </div>
  );
};

export default GamifiedExperience;