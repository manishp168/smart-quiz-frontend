import React, { useState } from "react";
import { MdCheckCircle, MdClose } from "react-icons/md";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useAuthContext } from "../../context/AuthContext";

const Result = ({ res }) => {
  const location = useLocation();

  let data = res || location.state || [];
  console.log(data);
  const percentage = (data.totalCorrect / data.questions.length) * 100;
  const [showQuestion, setShowQuestion] = useState(true);

  const { userData } = useAuthContext();

  const convertTimeToString = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    let result = "";

    if (minutes > 0) {
      result += `${minutes}m`;
    }

    if (seconds > 0 || minutes === 0) {
      result += ` ${seconds} seconds`;
    }

    return result.trim();
  };

  const abcd = ["A", "B", "C", "D"];
  return data ? (
    <div className="min-h-screen min-w-screen  md:h-full m-auto max-w-full min-w-[24rem] md:min-w-[32rem] md:max-w-lg bg-white rounded-md mb-6">
      <nav className="text-center shadow-sm p-4 text-gray-800 font-semibold">
        <h2>{data.quizTitle}</h2>
      </nav>
      <div className="mt-2 flex flex-col justify-between gap-10">
        <div className="text-center mx-4 mt-4 text-lg font-semibold flex justify-evenly items-center gap-1 border  py-4 bg-[#ffe6ffaa] rounded-md shadow-md">
          <div className="flex items-center justify-center h-full w-full">
            <div className="h-32 w-32">
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                strokeWidth={12}
                styles={buildStyles({
                  textColor: "#111",
                  pathColor: "#ff9800",
                  trailColor: "#d2d2d2",
                  textSize: "16px",
                  strokeLinecap: "butt",
                })}
              />
            </div>
          </div>
          <div className="w-full h-full text-left">
            <h3 className="text-2xl text-gray-900 font-semibold">
              {userData.name}
            </h3>
            <p className="text-gray-600 font-normal mt-2">
              Score: {data.totalCorrect}/{data.questions.length}
            </p>
            <p className="text-gray-600 font-normal">
              Duration: {convertTimeToString(data.timeTaken)} 
            </p>
          </div>
        </div>
        {/* <div className="text-center mx-4 mt-4 text-lg font-semibold flex justify-evenly items-center gap-1 border  py-4 bg-[#ffe6ffaa] rounded-md shadow-md">
          <p className="text-gray-800 text-2xl font-semibold ">Score</p>

          <div className="h-24 w-24 bg-white border border-gray-300 shadow-md rounded-full flex items-center justify-center gap-1 flex-col  text-2xl px-2 ">
            <p>{data.totalCorrect}</p>
            <span className="border-2 w-full"></span>
            <p>{data.questions.length}</p>
          </div>
        </div> */}
        {/* <div className="mx-4 flex justify-between gap-10 font-semibold">
          <button
            type="button"
            className="bg-green-500 w-full text-white py-3 rounded-md"
          >
            My Quiz History
          </button>
          <button
            type="button"
            className="bg-blue-600 w-full text-white py-3 rounded-md"
          >
            Go To Dashboard
          </button>
        </div> */}
        <div className="my-2">
          <div
            className={`
              rounded-md w-full max-h-full overflow-y-auto relative`}
            style={{ scrollbarWidth: "none" }}
          >
            <div
              className={`py-1 text-center  `}
              onClick={() => setShowQuestion(!showQuestion)}
            >
              <p className="font-semibold text-2xl">Questions & Answers</p>
            </div>

            <div className={`mx-4 mt-0`}>
              {data.questions &&
                data.questions.length > 0 &&
                data.questions.map((question, index) => (
                  <div
                    className="shadow-md border rounded-md p-4 mt-6"
                    key={index}
                  >
                    <p className="mb-4 text-gray-700">
                      <span className="text-gray-800 font-semibold">
                        Q.{index + 1}{" "}
                      </span>{" "}
                      {question.question}
                    </p>
                    {question.options.map((option, index) => (
                      <div key={index} className="mb-2 cursor-pointer ">
                        <div
                          className={`flex rounded-md ${
                            option.isCorrect
                              ? "bg-green-500 text-white"
                              : option.selectedAnswer
                              ? "bg-red-500 text-white"
                              : "bg-slate-200 text-gray-500"
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center w-14 font-semibold text-black rounded-l-md
                            ${
                              option.isCorrect
                                ? "bg-green-600 text-white"
                                : option.selectedAnswer
                                ? "bg-red-600 text-white"
                                : "bg-gray-300"
                            }
                              `}
                          >
                            <span>{abcd[index]}</span>
                          </div>
                          <p
                            className={`block w-full py-3 bg-transparent outline-none border-none rounded-l-sm px-3  font-semibold cursor-pointer `}
                          >
                            {option.option}
                          </p>

                          <div className=" flex items-center justify-center w-14 font-bold text-white ">
                            {option.isCorrect ? (
                              <MdCheckCircle className="text-2xl " />
                            ) : option.selectedAnswer ? (
                              <MdClose className="bg-white rounded-full text-xl text-red-500" />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/home" />
  );
};

export default Result;
