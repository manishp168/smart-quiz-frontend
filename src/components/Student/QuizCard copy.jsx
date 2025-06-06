import React from "react";
import {
  MdOutlineQuiz,
  MdQuestionAnswer,
  MdAccessTime,
  MdPlayArrow,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ totalQuestions, title, timeLimit, date, id }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-gray-900 rounded-xl p-6 shadow-lg min-w-[24rem] max-w-md w-full border border-gray-300 flex flex-col gap-5 transition-transform duration-300 hover:scale-[1.02]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-3">
          <MdOutlineQuiz className="text-indigo-500 text-3xl" /> {title}
        </h3>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 text-sm rounded-lg font-medium">
          {new Date(date).toLocaleDateString().replaceAll("/", "-")}
        </span>
      </div>
      <div className="flex justify-between bg-gray-100 p-4 rounded-lg mt-4 shadow-inner">
        <p className="flex flex-col items-center text-gray-800">
          <MdQuestionAnswer className="text-blue-500 text-2xl" />
          <span className="font-medium mt-1">{totalQuestions} Questions</span>
        </p>
        <p className="flex flex-col items-center text-gray-800">
          <MdAccessTime className="text-red-500 text-2xl" />
          <span className="font-medium mt-1">
            {timeLimit.includes("m")
              ? `${parseInt(timeLimit)} Minute`
              : timeLimit.includes("s")
              ? `${parseInt(timeLimit)} Second`
              : `${parseInt(timeLimit)} Minute`}
          </span>
        </p>
      </div>
      <button
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-200 shadow-md"
        onClick={() => navigate(`/quiz/${id}`)}
      >
        <MdPlayArrow className="text-xl" /> Start Quiz
      </button>
    </div>
  );
};

export default QuizCard;
