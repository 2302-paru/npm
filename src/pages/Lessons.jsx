import React, { useState } from 'react';
import { motion } from 'framer-motion';

const lessonsData = [
  { id: 1, type: 'info', title: 'JavaScript Basics', description: 'Learn JS variables, loops, and functions in 5 minutes.' },
  { id: 2, type: 'info', title: 'React Hooks', description: 'Quick overview of useState, useEffect, and more.' },
  { id: 3, type: 'quiz', title: 'JS Quiz', description: 'Test your JavaScript knowledge with 5 questions.' },
  { id: 4, type: 'quiz', title: 'React Quiz', description: 'Test your React knowledge with 5 questions.' },
];

const Lessons = () => {
  const [selectedTab, setSelectedTab] = useState('info'); // 'info' or 'quiz'

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header / Toggle */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setSelectedTab('info')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            selectedTab === 'info'
              ? 'bg-white text-black'
              : 'border-2 border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          Snippets
        </button>
        <button
          onClick={() => setSelectedTab('quiz')}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            selectedTab === 'quiz'
              ? 'bg-white text-black'
              : 'border-2 border-white text-white hover:bg-white hover:text-black'
          }`}
        >
          Quizzes
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 px-4">
        {lessonsData
          .filter((item) => item.type === selectedTab)
          .map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900 border border-white rounded-xl shadow-lg p-6 w-72 sm:w-80 cursor-pointer transition"
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default Lessons;
