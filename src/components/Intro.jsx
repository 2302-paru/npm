// src/components/Intro.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FuzzyText from "./FuzzyText";
import ParticleBackground from "./ParticleBackground";

const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen relative flex items-center justify-center bg-black overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16">
        {/* Fuzzy Text Title */}
        <FuzzyText
          fontSize="clamp(3rem, 10vw, 6rem)"
          fontWeight={900}
          color="#ffffff"
          baseIntensity={0.1}
          hoverIntensity={0.4}
        >
          Explore
        </FuzzyText>

        {/* Buttons Container */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Login Button */}
          <motion.button
            onClick={() => navigate("/login")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full sm:w-auto px-6 py-3 text-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition"
          >
            Login
          </motion.button>

          {/* Signup Button */}
          <motion.button
            onClick={() => navigate("/signup")}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="w-full sm:w-auto px-6 py-3 text-lg rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition"
          >
            Signup
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
