import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import QuizHistoryCard from "../../components/Student/QuizHistoryCard";
import { getUserHistory } from "../../services/quizzes";
import { useAuthContext } from "../../context/AuthContext";
import httpStatus from "http-status"

const QuizHistory = () => {
  let title = "C++ LOOPS AND OR BHI HAI BAHUT";
  let date = "18-02-2025";
  let score = "8/10";
  let timeTaken = "5";

  const [loading, setLoading] = useState(false);
  const arr = [1, 2, 3, 4, 5];

  const [data, setData] = useState([])

  const {userData} = useAuthContext()

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true)
      try {
        const res = await getUserHistory(userData.accessToken);
        if (res.status === httpStatus.OK) {
          let quizzes = res.data.data;
        const sortedData = quizzes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
          setData(sortedData);
        }
      } catch (error) {
        console.log(error);
      }finally{
          setLoading(false)
      }
    };
    getHistory();
  }, []);

  return (
    <>
      <Loader loading={loading} />
      <div className="min-h-screen w-full " style={{ scrollbarWidth: "none" }}>
        <div className="px-4">
          <div className="mt-8">
            <h2 className="text-gray-700 text-xl font-semibold">History</h2>
            <div
              className="cards py-4 lg:grid lg:grid-cols-2 lg:place-items-stretch gap-5"
              style={{ scrollbarWidth: "none" }}
            >
              {data.length > 0 ? (
                data.map((quiz, index) => (
                  <div key={index} className="mb-4">
                    <QuizHistoryCard
                      title={quiz.quizTitle}
                      date={quiz.createdAt}
                      score={quiz.totalCorrect}
                      totalQuestion={quiz.questions.length}
                      timeTaken={quiz.timeTaken}
                      timeLimit={quiz.timeLimit}
                      data={quiz}
                      // id={quiz._id}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No Live Quizzes</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizHistory;
