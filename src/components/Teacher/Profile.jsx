import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  BarChart3,
  TrendingDown,
  BookOpen,
  LayoutDashboard,
  ListTodo,
  ScrollText,
} from "lucide-react";
import userLogoPng from "../../assets/user.png";

export const Button = ({
  children,
  className,
  variant = "solid",
  ...props
}) => {
  let buttonClass = "px-4 py-2 rounded-lg font-semibold text-white ";

  if (variant === "outline") {
    buttonClass = `px-4 py-2 rounded-lg border-2 text-blue-600 border-blue-600 ${className} hover:bg-blue-50`;
  } else {
    buttonClass += `bg-blue-600 hover:bg-blue-700 ${className}`;
  }

  return (
    <button className={buttonClass} {...props}>
      {children}
    </button>
  );
};
import { getUserHistory } from "../../services/quizzes";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";
const StudentProfile = () => {
  const { userData, logout } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [totalQuiz, setTotalQuiz] = useState(0);
  const [avarageScore, setAvarageScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [lowestScore, setLowestScore] = useState(0);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true);
      try {
        const res = await getUserHistory(userData.accessToken);
        console.log("Res:", res);
        const data = res.data.data;
        const sortedQuizData =
          data.length > 3
            ? data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            : data;

        setQuizData(
          sortedQuizData.length > 3
            ? sortedQuizData.slice(0, 3)
            : sortedQuizData
        );

        const scores = data.map((quiz) => {
          const correct = quiz.totalCorrect || 0;
          const total = quiz.questions.length;
          return (correct / total) * 100;
        });

        const totalQuiz = scores.length;
        setTotalQuiz(totalQuiz);
        const totalScore = scores.reduce((a, b) => a + b, 0);
        const averageScore = totalQuiz ? totalScore / totalQuiz : 0;
        setAvarageScore(averageScore.toFixed(2));
        const bestScore = Math.max(...scores);
        setBestScore(bestScore.toFixed(2));
        const lowestScore = Math.min(...scores);
        setLowestScore(lowestScore.toFixed(2));
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getHistory();
  }, []);

  return (
    <div className="min-h-screen w-full  px-4 py-8 text-gray-800">
      <Loader loading={loading} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-full max-w-4xl "
      >
        {/* Student Info */}
        <div className="bg-white shadow-md rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-5 justify-center items-center">
              <img
                src={userLogoPng}
                alt="profile-img"
                className="max-w-24 border-4 rounded-full p-2 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-semibold">{userData.name}</h2>
                <p className="text-sm text-gray-600">
                  Grade: BCA-{userData.semester}-SEM
                </p>
                <p className="text-sm text-gray-600">Email: {userData.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant=""
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Quiz History
              </Button>
              <Button onClick={logout}
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Quiz Stats */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 mb-6">
          <div className="bg-white shadow-md rounded-lg border border-gray-200 text-center">
            <div className="p-4">
              <LayoutDashboard className="mx-auto mb-2 h-6 w-6 text-blue-500" />
              <h4 className="font-semibold">{totalQuiz}</h4>
              <p className="text-sm text-gray-600">Attempted Quizzes</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg border border-gray-200 text-center">
            <div className="p-4">
              <ScrollText className="mx-auto mb-2 h-6 w-6 text-yellow-500" />
              <h4 className="font-semibold">{avarageScore}%</h4>
              <p className="text-sm text-gray-600">Average Score</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg border border-gray-200 text-center">
            <div className="p-4">
              <BarChart3 className="mx-auto mb-2 h-6 w-6 text-purple-500" />
              <h4 className="font-semibold">{bestScore}%</h4>
              <p className="text-sm text-gray-600">Best Score</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg border border-gray-200 text-center">
            <div className="p-4">
              <TrendingDown className="mx-auto mb-2 h-6 w-6 text-green-500" />
              <h4 className="font-semibold">{lowestScore}%</h4>
              <p className="text-sm text-gray-600">Lowest Score</p>
            </div>
          </div>
        </div>

        {/* Recent Quizzes */}
        <div className="bg-white shadow-md rounded-lg border border-gray-200 mb-6">
          <div className="p-4">
            <h3 className="mb-4 text-lg font-semibold text-gray-700">
              Recent Quizzes
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-center">
                <thead>
                  <tr className="border-b text-center">
                    <th className="p-2">Quiz</th>
                    <th className="p-2">Score</th>
                    <th className="p-2">Percantage</th>
                  </tr>
                </thead>
                <tbody>
                  {quizData.length > 0 ? quizData.map((quiz, index) => {
                    const score = quiz.totalCorrect
                      ? (quiz.totalCorrect / quiz.questions.length) * 100
                      : 0;
                    
                    return (
                      <tr key={index} className="border-b">
                        <td className="p-2">{quiz.quizTitle}</td>
                        <td
                          className={`p-2 font-medium ${
                            status === "Pass"
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {quiz.totalCorrect} / {quiz.questions.length}
                        </td>
                        <td className="p-2">{score.toFixed(2)}%</td>
                      </tr>
                    );
                  }): (<p>Not attempted any quiz</p>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentProfile;
