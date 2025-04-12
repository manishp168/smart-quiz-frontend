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
  MdPerson,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const StudentQuizDetail = ({
  data
}) => {
  const navigate = useNavigate();
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  };
   
  return (
    <div
      className={`bg-white text-gray-900 rounded-xl p-6 shadow-lg min-w-auto max-w-md w-full border border-gray-300 flex flex-col gap-5 transition-transform duration-300 hover:scale-[1.02] h-full mx-auto`}
    >
      <div className="flex justify-between ">
        <div className="text-normal font-bold flex gap-2">
          <MdPerson className="text-indigo-500 text-2xl" />{" "}
          <span className="line-clamp-1 overflow-hidden">{data.studentId.name}</span>
        </div>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 ml-2 h-fit text-sm rounded-lg font-medium whitespace-nowrap">
          {new Date(data.createdAt).toLocaleDateString().replaceAll("/", "-")}
        </span>
      </div>

     
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg  shadow-inner">
        <div className="flex flex-col items-center text-gray-800">
          <MdStars className="text-blue-500 text-3xl" />
          <span>User Score</span>
        </div>
        <div className="h-16 w-16 bg-gray-200 border shadow-sm rounded-lg flex items-center justify-center gap-1 text-black flex-col px-2 font-semibold ">
          <p>{data.totalCorrect}</p>
          <span className="border border-black w-full"></span>
          <p>{data.questions.length}</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg  shadow-inner">
        <div className="flex flex-col items-center  text-gray-800">
          <MdAccessTime className="text-blue-500 text-3xl" />
          <span>Time Taken</span>
        </div>
        <div className=" py-2 px-3 bg-gray-200 border shadow-sm rounded-lg flex items-center justify-center gap-1 text-black flex-col font-semibold ">
            
          <p>{formatTime(data.timeTaken)}</p>
        </div>
        
      </div>
      
    </div>
  );
};

export default StudentQuizDetail;
