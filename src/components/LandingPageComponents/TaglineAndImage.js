import React from "react";
import { motion } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "../../animation.json";

const TaglineAndImage = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // Use the imported .json file here
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <main className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <motion.h2
          className="text-5xl font-bold mb-4"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          Learn <span className="text-blue-500">Data Structures</span>
        </motion.h2>
        <motion.p
          className="text-xl mb-6"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 0.2 }}
        >
          Intelligent Tutoring System for Learning Data Structures in a
          personalized learning environment through gamification.
        </motion.p>
        <motion.button
          className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600"
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get started
        </motion.button>
      </div>

      <div className="md:w-1/2 ml-8">
        <div className="">
          <Lottie options={defaultOptions} height={550} width={550} />
        </div>
      </div>
    </main>
  );
};

export default TaglineAndImage;
