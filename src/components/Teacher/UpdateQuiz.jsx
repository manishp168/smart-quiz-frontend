import axios from "axios";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../Loader";
import httpStatus from "http-status"
import { toast } from "react-toastify";
const UpdateQuiz = ({ isOpen, setIsOpen, details, index }) => {
  if (!isOpen) {
    return;
  }
  const { userData } = useAuthContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState(details[index].questions);
  const [title, setTitle] = useState(details[index].title);
  const [timer, setTimer] = useState(details[index].timeLimit);
  const [privacy, setPrivacy] = useState(details[index].isPublished ? "public" : "private");

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
      let id = details[index]._id;
      const data = {
        id,
        title,
        timer,
        privacy,
        questions,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_TEACHER_API_URL}/update-quiz`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
          withCredentials: true,
        }
      );

      if (res.status === httpStatus.OK) {
        toast.success("Quiz updated successfully");
        setIsOpen(false);
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(questions);

  return (
    isOpen && (
      <>
      <div className="min-h-screen h-full w-screen  fixed top-0 left-0 bg-gray-500/25 z-40 flex justify-center items-center">
      <Loader loading={loading} className="z-50"/>
        <div
          className="relative z-20 w-full max-w-lg h-3/4 mx-4 overflow-y-auto bg-white rounded-lg shadow-xl "
          style={{ scrollbarWidth: "none" }}
        >
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-center font-semibold text-2xl">Update Quiz</h2>
            <div className=" max-w-sm m-auto mt-6 md:max-w-lg">
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
                        placeholder="Enter time limit for each ques. eg(30s or 1m)"
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
                  {questions &&
                    questions.map((question, index) => (
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
                                  readOnly={
                                    question.type !== "MCQ" ? true : false
                                  }
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

                  <div className="flex justify-end gap-6">
                  <button
                    type="button"
                    className="border-2 border-gray-600 mt-6 py-3 px-6 text-gray-900 font-semibold outline-none  rounded-md hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}>
                    Cancle
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600  mt-6 py-3 px-6 text-white font-semibold outline-none border-none rounded-md hover:bg-blue-700"
                  >
                    Update Quiz
                  </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  );
};

export default UpdateQuiz;
