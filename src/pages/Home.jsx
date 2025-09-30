import React from 'react';
import Navbar from '../components/Navbar';
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ParticleBackground from '../components/ParticleBackground';
import FuzzyText from '../components/FuzzyText';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen bg-black text-white flex flex-col relative overflow-hidden">
            
            <ParticleBackground />
            <Navbar />
            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 gap-6 relative z-10">
                <FuzzyText
                    fontSize="clamp(2rem, 6vw, 5rem)" 
                    fontWeight={900}
                    color="#ffffff"
                    baseIntensity={0.1}
                    hoverIntensity={0.4}
                >
                    Welcome, Mentee!
                </FuzzyText>

                <motion.button
                    onClick={() => navigate("/lessons")}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="px-6 sm:px-8 py-3 sm:py-4 text-lg sm:text-xl rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition"
                >
                    Start Learning
                </motion.button>
            </main>
        </div>
    );
};

export default Home;
