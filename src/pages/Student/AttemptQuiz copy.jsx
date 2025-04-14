import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import httpStatus from "http-status";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { MdCheck, MdCheckCircle } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";
import Result from "../../components/Student/Result";

const AttemptQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userData } = useAuthContext();

  let time = useRef(null);
  let countDown = useRef(null);

  const [questions, setQuestions] = useState();
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [title, setTitle] = useState("");
  const [timeLeft, setTimeLeft] = useState("0:00");
  const [fullTime, setFullTime] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState();

  const [userQuizData, setUserQuizData] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [resultData, setResultData] = useState();
  const getQuizData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_QUIZ_API_URL}/${id}`);
      if (res.status === httpStatus.OK) {
        if (res.data.data.isPublished === false) {
          toast.error("This quiz is private. you can't access.");
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
      toast.error(error.response?.data?.message || "Server Error Please Try Again.");
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
    time.current = fullTime - 1;
    let minutes;
    let seconds;
    countDown.current = setInterval(() => {
      minutes = Math.floor(time.current / 60);
      seconds = time.current % 60;
      setTimeLeft(`${minutes}:${seconds}`);
      time.current--;
      if (time.current < 0) {
        clearInterval(countDown.current);
      }
      if (time.current < 0) {
        clearInterval(countDown.current);
        submitQuiz();
      }
    }, 1000);
  };

  const handleNextBtn = () => {
    if (selectedAnswer === undefined) {
      toast.error("Choose a option");
      return;
    }
    setUserQuizData((prev) => {
      const currentQuestion = questions[questionIndex - 1];

      const data = [
        ...prev,
        {
          question: currentQuestion.question,
          type: currentQuestion.type,
          options: currentQuestion.options.map((option, index) => {
            return {
              option: option.option,
              isCorrect: option.isCorrect,
              selectedAnswer: selectedAnswer === index,
            };
          }),
        },
      ];

      return data;
    });

    setQuestionIndex((prev) => prev + 1);
    setSelectedAnswer();
  };

  const submitQuiz = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_QUIZ_API_URL}/submit/${id}`,
        {
          userQuizData,
          quizId: id,
          timeTaken: fullTime - time.current,
          title,
          timeLimit: fullTime,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );
      console.log(res);
      if (res.status === httpStatus.OK) {
        toast.success(res.data.message);
        setResultData(res.data.data);
        setTimerStarted(false);
        setIsOpen(true);
      }
    } catch (error) {
      if (
        error.response?.data?.message ===
        "You are already participated in this quiz"
      ) {
        toast.error(error.response?.data?.message);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
        return;
      }
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (
      questionIndex === totalQuestion &&
      userQuizData.length < totalQuestion
    ) {
      setUserQuizData((prev) => {
        const currentQuestion = questions[questionIndex - 1];

        const data = [
          ...prev,
          {
            question: currentQuestion.question,
            type: currentQuestion.type,
            options: currentQuestion.options.map((option, index) => {
              return {
                option: option.option,
                isCorrect: option.isCorrect,
                selectedAnswer: selectedAnswer === index,
              };
            }),
          },
        ];
        return data;
      });
    } else if (userQuizData.length === totalQuestion) {
      submitQuiz();
    } else {
      handleNextBtn();
    }
  };

  useEffect(() => {
    if (userQuizData.length === totalQuestion && totalQuestion > 0) {
      submitQuiz();
    }
  }, [userQuizData, totalQuestion]);
  const abcd = ["A", "B", "C", "D"];
  return (
    <div
      className="bg-[#eaeaea]  min-h-screen w-full overflow-hidden md:flex md:item
       justify-center"
      style={{ scrollbarWidth: "none" }}
    >
      <Loader loading={loading} bgWhite={true} />
      <div
        className={`min-h-screen md:h-full m-auto  min-w-[24rem] md:min-w-[32rem] md:max-w-lg bg-white rounded-md mx-4 ${
          isOpen ? "hidden" : "block" 
        }`}
      >
        <nav className="flex justify-between items-center shadow-md p-4 text-gray-800 font-semibold">
          <span className="whitespace-nowrap">
            Q. {questionIndex}/{totalQuestion}
          </span>

          <span>
            {timeLeft}/{`${Math.floor(fullTime / 60)}:${"00"}`}
          </span>
        </nav>
        <div className="text-center mx-4 mt-4 text-lg font-semibold">
          {title}
        </div>
        <div className="px-4 my-10">
          <p className=" text-gray-700">
            <span className="text-gray-800 font-semibold">Q.</span>
            {questions &&
              questions.length > 0 &&
              questions[questionIndex - 1].question}
          </p>

          <div className="mt-4">
            {questions && questions.length > 0
              ? questions[questionIndex - 1].options.map((option, index) => (
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
                        className={`flex items-center justify-center w-14 font-semibold text-black rounded-l-md  ${
                          selectedAnswer === index
                            ? "bg-gray-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        <span>{abcd[index]}</span>
                      </div>
                      <p
                        className={`block w-full py-3 bg-transparent outline-none border-none rounded-l-sm px-3  font-semibold cursor-pointer ${
                          selectedAnswer === index
                            ? "text-white"
                            : "text-gray-500"
                        }`}
                      >
                        {option.option}
                      </p>

                      <div className=" flex items-center justify-center w-14 font-bold text-white ">
                        {selectedAnswer === index ? (
                          <MdCheckCircle className="text-2xl " />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </div>

          <div>
            <button
              onClick={() => handleSubmit()}
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
