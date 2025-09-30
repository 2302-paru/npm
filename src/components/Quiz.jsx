import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import Navbar from "../components/Navbar";
import { data } from "./data";

const Quiz = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("topic");

  const questions = data[topic] || [];

  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  if (!topic || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-xl">
        Invalid or missing topic. Please go back and select a quiz.
      </div>
    );
  }

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      alert("🎉 Quiz Completed!");
      setIndex(0);
      setSelectedOption(null);
      setIsCorrect(null);
    }
  };

  const checkAnswer = (option) => {
    setSelectedOption(option);
    if (option === questions[index].answer) {
      setIsCorrect(true);
      confetti();
    } else {
      setIsCorrect(false);
    }
  };

  const question = questions[index];

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-6">
      <Navbar />
      <div className="w-full max-w-lg bg-white text-gray-800 flex flex-col gap-5 rounded-lg p-8 shadow-lg mt-8">
        <h1 className="text-3xl font-bold text-center">{topic} Quiz</h1>
        <hr className="border-0 h-[2px] bg-gray-400" />

        <h2 className="text-xl font-medium">
          {index + 1}. {question.question}
        </h2>

        <ul className="flex flex-col gap-3">
          {question.options.map((opt, i) => (
            <li
              key={i}
              onClick={() => checkAnswer(opt)}
              className={`p-3 border rounded-md cursor-pointer transition-colors
                ${
                  selectedOption === opt
                    ? isCorrect
                      ? "bg-green-300"
                      : "bg-red-300"
                    : "hover:bg-gray-100"
                }
              `}
            >
              {opt}
            </li>
          ))}
        </ul>

        <button
          onClick={handleNext}
          className="w-40 mx-auto py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Next
        </button>

        <div className="mx-auto text-sm text-gray-600">
          {index + 1} of {questions.length} questions
        </div>
      </div>
    </div>
  );
};

export default Quiz;
