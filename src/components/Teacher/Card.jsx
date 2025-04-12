import axios from "axios";
import httpStatus from "http-status";
import { toast } from "react-toastify";
import React from "react";
import {
  MdOutlineQuiz,
  MdAccessTime,
  MdStars,
  MdQuestionAnswer,
  MdGroup,
  MdEdit,
  MdDelete,
  MdInfo,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Card = ({
  id,
  title,
  date,
  totalParticipated,
  avarageScore,
  totalQuestion,
  timeLimit,
  index,
  setQuizIndex,
  setIsOpen,
  deleteQuiz
}) => {
  const navigate = useNavigate();

  const editBtnHandler = (index) => {
    setQuizIndex(index);
    setIsOpen(true);
  };

  console.log(totalParticipated)
  return (
    <div
      className={`bg-white text-gray-900 rounded-xl p-6 shadow-lg min-w-auto max-w-md w-full border border-gray-300 flex flex-col gap-5 transition-transform duration-300 hover:scale-[1.02] h-full mx-auto`}
    >
      <div className="flex justify-between ">
        <div className="text-normal font-bold flex gap-2">
          <MdOutlineQuiz className="text-indigo-500 text-2xl" />{" "}
          <span className="line-clamp-1 overflow-hidden">{title}</span>
        </div>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 ml-2 h-fit text-sm rounded-lg font-medium whitespace-nowrap">
          {new Date(date).toLocaleDateString().replaceAll("/", "-")}
        </span>
      </div>

      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg  shadow-inner">
        <div className="flex flex-col items-center text-gray-800">
          <MdGroup className="text-blue-500 text-3xl" />
          <span>Participates</span>
        </div>
        <div className=" flex flex-col items-center text-gray-800 ">
          <p className="font-semibold">{totalParticipated}</p>
          <span>Total</span>
        </div>
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg  shadow-inner">
        <div className="flex flex-col items-center text-gray-800">
          <MdStars className="text-blue-500 text-3xl" />
          <span>Avarage Score</span>
        </div>
        <div className="h-16 w-16 bg-gray-200 border shadow-sm rounded-lg flex items-center justify-center gap-1 text-black flex-col px-2 font-semibold ">
          <p>{`${avarageScore < 10 ? `0${avarageScore}` : avarageScore}`}</p>
          <span className="border border-black w-full"></span>
          <p>{`${totalQuestion < 10 ? `0${totalQuestion}` : totalQuestion}`}</p>
        </div>
      </div>

      <div className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-inner">
        <p className="flex flex-col items-center text-gray-800">
          <MdQuestionAnswer className="text-blue-500 text-2xl" />
          <span className="font-medium mt-1">{totalQuestion} Questions</span>
        </p>
        <p className="flex flex-col items-center text-gray-800">
          <MdAccessTime className="text-red-500 text-2xl" />
          <span className="font-medium mt-1">{timeLimit} Minute</span>
        </p>
      </div>
      <div className="flex justify-between gap-16">
        <button
          className="mt-4 w-full  bg-green-500 hover:bg-green-600 text-white  py-2 rounded-md flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-200 "
          onClick={() => editBtnHandler(index)}
        >
          <MdEdit className="text-xl" /> Edit
        </button>
        <button
          className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white  py-2 rounded-md flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-200 "
          onClick={() => deleteQuiz(id)}
        >
          <MdDelete className="text-xl" /> Delete
        </button>
      </div>
      <button
        className=" w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 text-lg font-semibold transition-all duration-200 shadow-md"
        onClick={() => navigate(`/teacher/quiz-details/${id}`)}
      >
        <MdInfo className="text-xl" /> View Details
      </button>
    </div>
  );
};

export default Card;
