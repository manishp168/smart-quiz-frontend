import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Tile from "../Tile";
import httpStatus from "http-status";
import { useAuthContext } from "../../context/AuthContext";
import LiveQuiz from "../../components/Student/LiveQuiz";
import { getUserHistory } from "../../services/quizzes";

const StudentDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [attemptedQuiz, setAttemptedQuiz] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [error, setError] = useState(""); // New state for error messages
  const { userData } = useAuthContext();

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      setError(""); // Reset error on new request
      try {
        const res = await getUserHistory(userData.accessToken);
        if (res.status === httpStatus.OK) {
          const data = res.data.data;
          if (!data || data.length === 0) {
            setAttemptedQuiz(0);
            setAverageScore(0);
          } else {
            setAttemptedQuiz(data.length);
            const totalPercentage = data.reduce((acc, attempt) => {
              const percent =
                (attempt.totalCorrect / attempt.questions.length) * 100;
              console.log(attempt);
              return acc + percent;
            }, 0);
            console.log(totalPercentage);
            setAverageScore((totalPercentage / data.length).toFixed(2));
          }
        }
      } catch (error) {
        setError("Failed to fetch quiz data. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getHistory();
  }, [userData.accessToken]);
  console.log(averageScore);
  return (
    <>
      <Loader loading={loading} />
      <div className="min-h-screen w-full " style={{ scrollbarWidth: "none" }}>
        <div className="px-4">
          <h1 className="font-semibold text-2xl text-gray-800">
            Welcome Back,{" "}
            <span className="text-blue-700 font-bold">{userData.name}</span>
          </h1>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2  mt-8 lg:items-center">
            <Tile
              title="Quiz Attempted"
              bg="bg-blue-500"
              count={attemptedQuiz}
              slug="quizattempted"
            />
            <Tile
              title="Average Score"
              bg="bg-gray-500"
              count={attemptedQuiz === 0 ? "0" : `${averageScore}%`}
              slug="avaragescore"
            />
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}{" "}
          {/* Display error if any */}
          <LiveQuiz setLoading={setLoading} />
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
