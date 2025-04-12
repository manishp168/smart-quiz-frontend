import React from "react";
import {
  MdOutlineQuiz,
  MdStars,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const QuizHistoryCard = ({
  data,
  title,
  date,
  score,
  timeTaken,
  timeLimit,
  totalQuestion
}) => {
  const convertTime = (time) => {
    let minutes = Math.floor(time / 60).toString().padStart(2, "0");
    let seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const navigate = useNavigate();
  
  return (
    <div
      className={`bg-white text-gray-900 rounded-xl p-6 shadow-lg min-w-auto max-w-md w-full border border-gray-300 flex flex-col gap-5 transition-transform duration-300 hover:scale-[1.02] h-full mx-auto`}
    >
      <div className="flex justify-between ">
        <h3 className="text-normal font-bold flex gap-2">
          <MdOutlineQuiz className="text-indigo-500 text-2xl" /> {title}
        </h3>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 ml-2 h-fit text-sm rounded-lg font-medium whitespace-nowrap">
          {`${new Date(date).toLocaleString().replaceAll("/", "-")}`}
        </span>
      </div>

      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mt-4 shadow-inner">
        <div className="flex flex-col items-center text-gray-800">
          <span className="font-semibold mt-1 text-xl">
            {convertTime(timeLimit)}
          </span>
          <p className="text-red-700 font-medium text-sm">Total Time</p>
        </div>
        <div className="flex flex-col items-center text-gray-800">
          <span className="font-semibold mt-1 text-xl">{convertTime(timeTaken)}</span>
          <p className="text-red-700 font-medium text-sm">Time Taken</p>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg  shadow-inner">
        <div className="flex flex-col items-center text-gray-800">
          <MdStars className="text-blue-500 text-2xl" />
          <span>Score</span>
        </div>
        <div className="h-16 w-16 bg-gray-200 border shadow-sm rounded-lg flex items-center justify-center gap-1 text-black flex-col px-2 font-semibold ">
          <p>{score}</p>
          <span className="border border-black w-full"></span>
          <p>{totalQuestion}</p>
        </div>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-md font-semibold transition-all duration-200" onClick={() => navigate(`/result`, {state: data})}>
        View Details
      </button>
    </div>
  );
};

export default QuizHistoryCard;
