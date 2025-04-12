import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdClose, MdLabel } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import httpStatus from "http-status"
import Loader from "../../components/Loader";
import CreateQuizByAi from "../../components/Teacher/CreateQuizByAi";

const CreateQuiz = () => {
  const { userData } = useAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();

  const [questions, s5kh;pujgbmpdeij.etQuestions] = useState([
    {
      question: "",
      type: "MCQ",
      options: [
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
        { option: "", isCorrect: false },
      ],
    },
  ]);
  const [title, setTitle] = useState("");
  const [timer, setTimer] = useState("");
  const [privacy, setPrivacy] = useState("public");

  // for generating quiz by ai
  const [isOpen, setIsOpen] = useState(false)


  const handleInputChange = (e, quesIndex = null, optIndex = null) => {
    const { name, value } = e.target;

    let updatedQuestions = [...questions];
    if (name === "question") {
      updatedQuestions[quesIndex].question = value;
    } else if (name === "option") {
      updatedQuestions[quesIndex].options[optIndex].option = value;
    } else if (name === "isCorrect") {
      if (e.target.checked) {
        updatedQuestions[quesIndex].options.forEach((obj) => {
          obj.isCorrect = false;
        });
      }
      console.log(quesIndex, optIndex);
      updatedQuestions[quesIndex].options[optIndex].isCorrect =
        e.target.checked;
    }

    setQuestions(updatedQuestions);
  };
  const addQuestion = (type) => {
    const options =
      type === "MCQ"
        ? [
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
            { option: "", isCorrect: false },
          ]
        : [
            { option: "TRUE", isCorrect: false },
            { option: "FALSE", isCorrect: false },
          ];
    setQuestions((prev) => [
      ...prev,
      {
        question: "",
        type: type,
        options: options,
      },
    ]);
  };
  const deleteQuestion = (index) => {
    setQuestions((prev) => prev.filter((obj, objIndex) => index !== objIndex));
  };
  const optionInABCD = ["A", "B", "C", "D"];
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (questions.length <= 1 && questions[0].question === "") {
      setError("atleast add one question");
      return;
    }

    setLoading(true);
    try {
      const data = {
        title,
        timer,
        privacy,
        questions,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_TEACHER_API_URL}/create-quiz`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === httpStatus.OK) {
        toast.success("Quiz created successfully");
        setTimeout(() => {
          navigate("/teacher/quizzes")
        }, 3000);
        
      }else{
        toast.error(res.data.message)

      }

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const generateQuiz = async() => {
    if (condition) {
      
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);
  return (
    <div className="h-full ">
      <Loader loading={loading} />
      <div className="bg-white rounded-lg mb-12 mx-4 py-6">
        <h1 className="text-center text-2xl text-gray-950 font-semibold">
          Create Quiz
        </h1>
        <div className={`max-w-sm md:max-w-lg w-full m-auto gap-7 justify-between mt-8 ${hide ? 'hidden': 'flex'}`}>
          <button className="bg-blue-500 py-5 w-full rounded-md text-white font-semibold border-none outline-none hover:bg-blue-600" onClick={() => setIsOpen(true)}>
            Generate Quiz By AI
          </button>
          <button className="bg-blue-500 py-5 w-full rounded-md text-white font-semibold border-none outline-none hover:bg-blue-600" onClick={() => setHide(true)}>
            Create Quiz Manually
          </button>
        </div>



{/* ask for details for ai  */}

<CreateQuizByAi isOpen={isOpen} setIsOpen={setIsOpen} setQuestions={setQuestions} setHide={setHide}/>


        <div className={`max-w-sm m-auto mt-6 md:max-w-lg ${!hide ? 'hidden': 'block'}`}>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 shadow-md rounded-md pb-6">
              <div className=" bg-gray-50 p-4 rounded-md rounded-b-none text-center font-semibold">
                <p>Basic Details</p>
              </div>
              <div className="px-4">
                <div className="mt-4">
                  <span>Title:</span>
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter quiz title"
                    className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                    required
                  />
                </div>
                <div className="mt-4">
                  <span>TIme Limit:</span>
                  <input
                    type="text"
                    name="time"
                    value={timer}
                    onChange={(e) => setTimer(e.target.value)}
                    placeholder="Time limit for quiz in minutes"
                    className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                    required
                  />
                </div>
                <div className="mt-4">
                  <span>Quiz Privacy:</span>
                  <select
                    value={privacy}
                    onChange={(e) => setPrivacy(e.target.value)}
                    name="privacy"
                    className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                    required
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              {questions.map((question, index) => (
                <div key={index} className="mt-4 shadow-md rounded-md">
                  <div className="flex bg-gray-50 py-4 rounded-md rounded-b-none justify-between items-center px-4 text-center font-semibold">
                    <p className="">Q.{index + 1}</p>
                    <p>Type: {question.type}</p>
                    {questions.length === 1 ? (
                      ""
                    ) : (
                      <MdClose
                        className="text-xl cursor-pointer"
                        onClick={() => deleteQuestion(index)}
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <span>Question:</span>
                    <input
                      type="text"
                      name="question"
                      value={question.question}
                      onChange={(e) => handleInputChange(e, index)}
                      placeholder="Enter question"
                      className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                      required
                    />

                    <p className="mt-2">Options</p>

                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="mb-2">
                        <div
                          className={`flex bg-slate-100 h-10 rounded-md ${
                            option.isCorrect ? "bg-slate-300" : "hii"
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center w-12 font-semibold text-black rounded-l-md ${
                              option.isCorrect
                                ? "bg-gray-500 text-white"
                                : "bg-gray-300"
                            }`}
                          >
                            <span>{optionInABCD[optionIndex]}</span>
                          </div>
                          <input
                            type="text"
                            name="option"
                            value={option.option}
                            readOnly={question.type !== "MCQ" ? true : false}
                            onChange={(e) =>
                              handleInputChange(e, index, optionIndex)
                            }
                            placeholder="Enter option"
                            className={`block w-full py-2 bg-transparent outline-none border-none rounded-l-sm px-3 ${
                              option.isCorrect
                                ? "placeholder:text-gray-800"
                                : "placeholder:text-gray-500"
                            } `}
                            required
                          />
                          <div className="-h-full w-10 flex items-center justify-center ">
                            <input
                              type="checkbox"
                              name="isCorrect"
                              checked={option.isCorrect}
                              onChange={(e) =>
                                handleInputChange(e, index, optionIndex)
                              }
                              className=" h-1/2 w-1/2 text-3xl border-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  className="bg-stone-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-stone-600"
                  onClick={() => addQuestion("MCQ")}
                >
                  Add MCQ
                </button>
                <button
                  type="button"
                  className="bg-stone-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-stone-600"
                  onClick={() => addQuestion("TRUE/FALSE")}
                >
                  Add True/False
                </button>
              </div>

              <button
                type="submit"
                className="bg-blue-600 w-full mt-6 py-3 text-white font-semibold outline-none border-none rounded-md hover:bg-blue-700"
              >
                Create Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
