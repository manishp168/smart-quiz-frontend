import React, { useState, useRef } from "react";
import { MdCheckCircle, MdClose } from "react-icons/md";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import html2pdf from "html2pdf.js";
import "react-circular-progressbar/dist/styles.css";

const Result = ({ res }) => {
  const location = useLocation();
  let data = res || location.state || [];

  const [showQuestion, setShowQuestion] = useState(true);
  const abcd = ["A", "B", "C", "D"];
  const percentage =
    (data.totalCorrect / data.questions.length) * 100 || 0;

  const printRef = useRef(null);

  const downloadPDF = () => {
    const opt = {
      margin: 0.3,
      filename: "quiz-result.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(printRef.current).save();
  };

  const chartData = [
    { name: "Correct", value: data.totalCorrect },
    { name: "Wrong", value: data.questions.length - data.totalCorrect },
  ];

  return data ? (
    <div ref={printRef} className="min-h-screen w-full px-4 py-6 bg-white md:min-w-[32rem] md:max-w-lg mx-auto rounded-md animate-fade-in">
      {/* Stylish Heading */}
      <nav className="text-center shadow-md p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white font-bold text-2xl tracking-wide">
        {data.quizTitle}
      </nav>

      <div className="mt-6 flex flex-col gap-10">
        {/* Score */}
        <div className="text-center flex flex-col md:flex-row justify-evenly items-center gap-6 bg-gradient-to-tr from-[#dbeafe] to-[#e0f2fe] py-6 rounded-2xl shadow-lg">
          <div className="text-sky-900 text-2xl font-bold flex flex-col items-center">
            🏆<span>Your Score</span>
          </div>
          <div className="h-32 w-32">
            <CircularProgressbar
              value={percentage}
              text={`${data.totalCorrect}/${data.questions.length}`}
              strokeWidth={10}
              styles={buildStyles({
                textColor: "#0f172a",
                pathColor: "#0ea5e9",
                trailColor: "#e5e7eb",
                textSize: "16px",
              })}
            />
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white shadow-md p-4 rounded-xl">
          <p className="font-semibold text-gray-700 text-center mb-2">Performance Overview</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row mx-2 gap-4 font-semibold">
          
          <button
            className="bg-blue-600 w-full text-white py-3 rounded-lg hover:bg-purple-600 transition shadow"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
          <button className="bg-blue-400 w-full text-white py-3 rounded-lg transition-all hover:bg-blue-700 shadow">
            Go To Dashboard
          </button>
        </div>

        {/* Questions */}
        <div>
          <div
            className="py-2 text-center cursor-pointer bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition"
            onClick={() => setShowQuestion(!showQuestion)}
          >
            <p className="font-semibold text-xl">Questions & Answers</p>
          </div>

          {showQuestion && (
            <div className="mx-2 mt-2">
              {data.questions.map((question, index) => (
                <div
                  className="shadow-md border rounded-xl p-4 mt-6 bg-white transition-all hover:shadow-lg"
                  key={index}
                >
                  <p className="mb-4 text-gray-700">
                    <span className="text-gray-800 font-semibold">Q.{index + 1}</span>{" "}
                    {question.question}
                  </p>
                  {question.options.map((option, i) => (
                    <div key={i} className="mb-2 cursor-pointer">
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
                          }`}
                        >
                          {abcd[i]}
                        </div>
                        <p className="block w-full py-3 px-3 font-semibold cursor-pointer">
                          {option.option}
                        </p>
                        <div className="flex items-center justify-center w-14 font-bold text-white">
                          {option.isCorrect ? (
                            <MdCheckCircle className="text-2xl" />
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
          )}
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/home" />
  );
};

export default Result;
