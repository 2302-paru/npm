import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";  // ✅ import Link
import Navbar from "../components/Navbar";

const lessonsData = [
  { id: 1, type: "quiz", title: "HR Quiz", description: "Test your HR knowledge." },
  { id: 2, type: "quiz", title: "Safety Quiz", description: "Test your Safety knowledge." },
  { id: 3, type: "quiz", title: "Business Quiz", description: "Test your Business knowledge." },
  { id: 4, type: "quiz", title: "Technical Quiz", description: "Test your Technical knowledge." },
];

const Lessons = () => {
  const [selectedTab] = useState("quiz"); // since you only want quizzes now

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <h1 className="text-4xl font-bold text-center mt-8 mb-4">Lessons</h1>
      <p className="text-center text-gray-400 mb-8">
        Choose a category 
      </p>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 px-4">
        {lessonsData
          .filter((item) => item.type === selectedTab)
          .map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 border border-white rounded-xl shadow-lg p-6 w-72 sm:w-80 transition"
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>

              {/* ✅ Link to quiz */}
              <Link
                to={`/quiz?topic=${item.title}`} // pass topic in query
                className="mt-4 inline-block bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Start Quiz
              </Link>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Lessons;
