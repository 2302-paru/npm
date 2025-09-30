import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import confetti from "canvas-confetti";

const Quiz = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const topic = queryParams.get("topic") || "General"; // e.g. "HR Quiz"

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  // ✅ Fetch quiz questions from Gemini
  useEffect(() => {
    async function fetchQuiz() {
      try {
        const response = await fetch("http://localhost:5000/api/quiz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic }),
        });
        const data = await response.json();
        setQuestions(data.questions);
      } catch (err) {
        console.error("Error fetching quiz:", err);
      }
    }

    fetchQuiz();
  }, [topic]);

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
    if (option === questions[index].answer) {
      setIsCorrect(true);
      setSelectedOption(option);
      confetti(); // 🎉 show confetti
    } else {
      setIsCorrect(false);
      setSelectedOption(option);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black text-white">
        <p className="text-xl">Loading {topic}...</p>
      </div>
    );
  }

  const question = questions[index];

  return (
    <div className="w-[640px] mx-auto mt-24 bg-white text-gray-800 flex flex-col gap-5 rounded-lg p-10 shadow-lg">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-black">{topic}</h1>
      <hr className="border-0 h-[2px] bg-gray-400" />

      <h2 className="text-xl font-medium">
        {index + 1}. {question.question}
      </h2>

      <ul>
        {question.options.map((opt, i) => (
          <li
            key={i}
            onClick={() => checkAnswer(opt)}
            className={`p-3 border border-gray-400 rounded-md mb-3 cursor-pointer transition-colors ${
              selectedOption === opt
                ? isCorrect
                  ? "bg-green-300"
                  : "bg-red-300"
                : "hover:bg-gray-100"
            }`}
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
  );
};

export default Quiz;
