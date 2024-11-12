import React from "react";
import { GamepadIcon, BarChart, Award, Brain } from "lucide-react";

const FeatureItem = ({ Icon, title, description }) => (
  <div className="flex items-start mb-8">
    <div className="flex-shrink-0 mr-4">
      <Icon className="w-8 h-8 text-blue-500" />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Features = () => {
  const features = [
    {
      Icon: GamepadIcon,
      title: "Gamified Learning",
      description:
        "Master Data structures concepts through engaging games and interactive challenges.",
    },
    {
      Icon: Brain,
      title: "Adaptive Learning",
      description:
        "Receive personalized guidance and adaptive learning experiences.",
    },

    {
      Icon: Award,
      title: "Assessments & Quizzes",
      description:
        "Reinforce your learning with regular assessments and fun quizzes.",
    },
    {
      Icon: BarChart,
      title: "Performance Analytics",
      description:
        "Track your progress with detailed analytics and personalized insights.",
    },
  ];

  return (
    <div className="relative bg-blue-500 py-20 overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-8 bg-white"
        style={{
          clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 66% 0%, 33% 100%, 0 0%)",
        }}
      ></div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-center text-4xl font-bold mb-12 text-white">
          Experience the Power of Structify
        </h2>
        <p className="text-xl text-white text-center max-w-3xl mx-auto mb-16">
          Structify is an Intelligent Tutoring System where you learn Data
          Structures through a gamified experience. Dive into a world of
          interactive learning, assessments, and analytics.
        </p>
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 h-8 bg-white"
        style={{
          clipPath:
            "polygon(0 100%, 100% 100%, 100% 0, 66% 100%, 33% 0, 0 100%)",
          marginBottom: "-1px", // Added to avoid blue line below
        }}
      ></div>
    </div>
  );
};

export default Features;
