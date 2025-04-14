import React, { useEffect, useState } from "react";
import { getQuizzes } from "../../services/teacher";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import UpdateQuiz from "../../components/Teacher/UpdateQuiz";
import Card from "../../components/Teacher/Card";
import axios from "axios";
import httpStatus from "http-status";
import { toast } from "react-toastify";

const Quizzes = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useAuthContext();
  const [quizzes, setQuizzes] = useState([]);
  const [quizIndex, setQuizIndex] = useState();
  

  const getQuizData = async () => {
    if (quizzes && quizzes.length > 0) return;
    setLoading(true);
    try {
      let res = await getQuizzes(userData.accessToken);
      if (res.status) {
        let data = res.data.quizzes;
        setQuizzes(data);
      }
    } catch (error) {
      toast.error("SOmething Went Wrong.")
    } finally {
      setLoading(false);
    }
  };
  // TODO : fix the Something went wrong error when token is expired but user still on dashboard
  useEffect(() => {
    getQuizData();
  }, []);

  const deleteQuiz = async (id) => {
      setLoading(true);
      try {
        let res = await axios.delete(
          `${import.meta.env.VITE_TEACHER_API_URL}/delete-quiz`,
          {
            data: { id },
            headers: {
              Authorization: `Bearer ${userData.accessToken}`,
            },
          }
        );
        if (res.status === httpStatus.OK) {
          toast.success("Quiz deleted successfully");
          await getQuizData();
        }
      } catch (error) {
        toast.error("Quiz not deleted. Try again")
      } finally {
        setLoading(false);
      }
    };
  return (
    <div className="min-h-screen ">
      <Loader loading={loading} />
      <div className=" mb-12 mx-4 ">
        <h1 className="text-2xl text-gray-950 font-semibold">
          My Quizzes
        </h1>

        <UpdateQuiz
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          details={quizzes}
          index={quizIndex}
        />

        <div
          className="cards py-4  lg:grid lg:grid-cols-2 lg:place-items-stretch gap-5"
          style={{ scrollbarWidth: "none" }}
        >
          {quizzes.length > 0 ? (
            quizzes.map((quiz, index) => (
              <div key={index} className="mb-4">
                <Card
                  id={quiz._id}
                  title={quiz.title}
                  date={quiz.createdAt}
                  avarageScore={quiz.avarageScore}
                  totalParticipated={quiz.totalParticipated}
                  totalQuestion={quiz.questions.length}
                  index={index}
                  setIsOpen={setIsOpen}
                  setQuizIndex={setQuizIndex}
                  deleteQuiz={deleteQuiz}
                  timeLimit={quiz.timeLimit}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600">No Live Quizzes</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quizzes;
