import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpStatus from "http-status";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { MdCheckCircle } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";
import Result from "../../components/Student/Result";

const AttemptQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userData } = useAuthContext();

  const time = useRef(null);
  const countDown = useRef(null);

  const [questions, setQuestions] = useState();
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [title, setTitle] = useState("");
  const [timeLeft, setTimeLeft] = useState("0:00");
  const [fullTime, setFullTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState();

  const [userQuizData, setUserQuizData] = useState([]);
  const userQuizDataRef = useRef([]);

  const [isOpen, setIsOpen] = useState(false);
  const [resultData, setResultData] = useState();

  const getQuizData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_QUIZ_API_URL}/${id}`);
      if (res.status === httpStatus.OK) {
        if (!res.data.data.isPublished) {
          toast.error("This quiz is private and cannot be accessed.");
          return navigate("/home");
        }
        const data = res.data.data;
        setFullTime(data.timeLimit * 60);
        setTitle(data.title);
        setQuestions(data.questions);
        setTotalQuestion(data.questions.length);
        setTimerStarted(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to fetch quiz data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuizData();
  }, []);

  useEffect(() => {
    if (timerStarted) {
      startTimer();
    }
    return () => clearInterval(countDown.current);
  }, [fullTime]);

  const startTimer = () => {
    time.current = fullTime;
    countDown.current = setInterval(() => {
      time.current--;
      const minutes = Math.floor(time.current / 60);
      const seconds = time.current % 60;
      setTimeLeft(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      if (time.current < 0) {
        clearInterval(countDown.current);
        submitQuiz();
      }
    }, 1000);
  };

  const handleNextBtn = () => {
    if (selectedAnswer === undefined) {
      toast.error("Please select an option before continuing.");
      return;
    }
    const currentQuestion = questions[questionIndex - 1];
    const newData = {
      question: currentQuestion.question,
      type: currentQuestion.type,
      options: currentQuestion.options.map((option, index) => ({
        option: option.option,
        isCorrect: option.isCorrect,
        selectedAnswer: selectedAnswer === index,
      })),
      isAttempted: true,
    };

    setUserQuizData((prev) => {
      const updated = [...prev, newData];
      userQuizDataRef.current = updated;
      return updated;
    });

    setQuestionIndex((prev) => prev + 1);
    setSelectedAnswer(undefined);
  };

  const handleSubmit = () => {
    if (questionIndex === totalQuestion && userQuizData.length < totalQuestion) {
      const currentQuestion = questions[questionIndex - 1];
      const newData = {
        question: currentQuestion.question,
        type: currentQuestion.type,
        options: currentQuestion.options.map((option, index) => ({
          option: option.option,
          isCorrect: option.isCorrect,
          selectedAnswer: selectedAnswer === index,
        })),
        isAttempted: true,
      };

      setUserQuizData((prev) => {
        const updated = [...prev, newData];
        userQuizDataRef.current = updated;
        return updated;
      });
    } else if (userQuizData.length === totalQuestion) {
      submitQuiz();
    } else {
      handleNextBtn();
    }
  };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      const answeredCount = userQuizDataRef.current.length;

      const unanswered = questions.slice(answeredCount).map((q) => ({
        question: q.question,
        type: q.type,
        options: q.options.map((opt) => ({
          option: opt.option,
          isCorrect: opt.isCorrect,
        })),
        isAttempted: false,
      }));

      const fullQuizData = [...userQuizDataRef.current, ...unanswered];

      const res = await axios.post(
        `${import.meta.env.VITE_QUIZ_API_URL}/submit/${id}`,
        {
          userQuizData: fullQuizData,
          quizId: id,
          timeTaken: fullTime - time.current - 1,
          title,
          timeLimit: fullTime,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );

      if (res.status === httpStatus.OK) {
        toast.success("Your Quiz have been submitted.");
        setResultData(res.data.data);
        setTimerStarted(false);
        setIsOpen(true);
      }
    } catch (error) {
      const statusCode = error.response?.data?.statusCode;
      const msg = error.response?.data?.message;

      if (statusCode === httpStatus.BAD_REQUEST) {
        toast.error(msg || "Submission failed. Please try again.");
        setTimeout(() => navigate("/home"), 3000);
        return;
      }
      toast.error(msg || "An error occurred while submitting your quiz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userQuizData.length === totalQuestion && totalQuestion > 0) {
      submitQuiz();
    }
  }, [userQuizData, totalQuestion]);

  const abcd = ["A", "B", "C", "D"];

  return (
    <div className="bg-[#eaeaea] min-h-screen w-full overflow-hidden md:flex md:items-center justify-center">
      <Loader loading={loading} bgWhite={true} />
      <div
        className={`min-h-screen md:h-full m-auto min-w-[24rem] md:min-w-[32rem] md:max-w-lg bg-white rounded-md mx-4 ${
          isOpen ? "hidden" : "block"
        }`}
      >
        <nav className="flex justify-between items-center shadow-md p-4 text-gray-800 font-semibold">
          <span>
            Q. {questionIndex}/{totalQuestion}
          </span>
          <span>
            {timeLeft}/{`${Math.floor(fullTime / 60)}:00`}
          </span>
        </nav>

        <div className="text-center mx-4 mt-4 text-lg font-semibold">{title}</div>

        <div className="px-4 my-10">
          <p className="text-gray-700">
            <span className="text-gray-800 font-semibold">Q.</span>
            {questions &&
              questions.length > 0 &&
              questions[questionIndex - 1]?.question}
          </p>

          <div className="mt-4">
            {questions &&
              questions.length > 0 &&
              questions[questionIndex - 1]?.options.map((option, index) => (
                <div
                  key={index}
                  className="mb-2 cursor-pointer"
                  onClick={() => setSelectedAnswer(index)}
                >
                  <div
                    className={`flex rounded-md ${
                      selectedAnswer === index
                        ? "bg-red-500 text-white"
                        : "bg-slate-100"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-14 font-semibold text-black rounded-l-md ${
                        selectedAnswer === index
                          ? "bg-gray-500 text-white"
                          : "bg-gray-300"
                      }`}
                    >
                      <span>{abcd[index]}</span>
                    </div>
                    <p
                      className={`block w-full py-3 px-3 font-semibold cursor-pointer ${
                        selectedAnswer === index
                          ? "text-white"
                          : "text-gray-500"
                      }`}
                    >
                      {option.option}
                    </p>
                    <div className="flex items-center justify-center w-14 text-white">
                      {selectedAnswer === index && (
                        <MdCheckCircle className="text-2xl" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          <div>
            <button
              onClick={handleSubmit}
              type="button"
              className="bg-blue-600 text-white w-full py-3 rounded-md mt-8"
            >
              {questionIndex === totalQuestion ? "Submit Quiz" : "Next"}
            </button>
          </div>
        </div>
      </div>

      {isOpen && <Result res={resultData} />}
    </div>
  );
};

export default AttemptQuiz;
