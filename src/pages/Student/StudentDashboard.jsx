import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Tile from "../Tile";
import QuizCard from "../../components/Student/QuizCard";
import { getLiveQuizzes } from "../../services/quizzes";
import httpStatus from "http-status";
import { useAuthContext } from "../../context/AuthContext";
import LiveQuiz from "../../components/Student/LiveQuiz";
const StudentDashboard = () => {
  const [loading, setLoading] = useState(false);
 
  return (
    <>
      <Loader loading={loading} />
      <div className="min-h-screen w-full " style={{ scrollbarWidth: "none" }}>
        <div className="px-4">
          <h1 className="font-semibold text-2xl text-gray-800">
            Welcome Back,{" "}
            <span className="text-blue-700 font-bold">Manish</span>
          </h1>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2  mt-8 lg:items-center">
            <Tile
              title="Quiz Attempted"
              bg="bg-blue-500"
              count="14"
              slug="quizattempted"
            />
            <Tile
              title="Avarage Score"
              bg="bg-gray-500"
              count="40%"
              slug="avaragescore"
            />
          </div>

          <LiveQuiz setLoading={setLoading}/>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
