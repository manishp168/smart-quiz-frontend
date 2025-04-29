import React, { useState } from "react";
import Loader from "../Loader";
import axios from "axios";
import httpStatus from "http-status";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const CreateQuizByAi = ({ isOpen, setIsOpen, setQuestions, setHide }) => {
  if (!isOpen) {
    return null;
  }
  const [loading, setLoading] = useState(false);

  const { userData } = useAuthContext();

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [mcqQuestions, setMcqQuestions] = useState("");
  const [trueFalseQuestions, setTrueFalseQuestions] = useState("");
  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      const data = {
        topic,
        difficulty,
        mcqQuestions,
        trueFalseQuestions,
      };
      const res = await axios.post(
        `${import.meta.env.VITE_TEACHER_API_URL}/generate-quiz`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userData.accessToken}`,
          },
        }
      );

      if (res.status === httpStatus.OK) {
        const cleanData = res.data.data.replace(/```json\n|\n```/g, "");
        const jsonData = JSON.parse(cleanData);
        setQuestions(jsonData);
        setHide(true);
        setLoading(false);
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "QUiz generation failed.")
    } finally {
      setLoading(false);
    }
  };
  return (
    isOpen && (
      <>
        <div className="min-h-screen h-full w-screen  fixed top-0 left-0 bg-gray-500/25 z-40 flex justify-center items-center">
          <Loader loading={loading} className="z-50" />
          <div
            className="relative z-20 w-full max-w-lg  min-h-max max-h-[40rem]  overflow-y-auto mx-4 bg-white rounded-lg shadow-xl "
            style={{ scrollbarWidth: "none" }}
          >
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className="text-center font-semibold text-2xl">
                Create Quiz
              </h2>
              <div className=" max-w-sm m-auto mt-6 md:max-w-lg">
                <form onSubmit={handleSubmit}>
                  <div className="mt-4 shadow-md rounded-md pb-6">
                    <div className=" bg-gray-50 p-4 rounded-md rounded-b-none text-center font-semibold">
                      <p>Basic Details</p>
                    </div>
                    <div className="px-4">
                      <div className="mt-4">
                        <span>Quiz Topic:</span>
                        <input
                          type="text"
                          name="topic"
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="eg. c++ loops"
                          className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <span>MCQ Questions:</span>
                        <input
                          type="number"
                          name="mcqQuestions"
                          value={mcqQuestions}
                          onChange={(e) => setMcqQuestions(e.target.value)}
                          placeholder="eg. 5"
                          className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <span>TRUE/FALSE Questions:</span>
                        <input
                          type="number"
                          name="trueFalseQuestions"
                          value={trueFalseQuestions}
                          onChange={(e) =>
                            setTrueFalseQuestions(e.target.value)
                          }
                          placeholder="eg. 5"
                          className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                          required
                        />
                      </div>
                      <div className="mt-4">
                        <span>Difficulty Level:</span>
                        <select
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value)}
                          name="difficulty"
                          className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                          required
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>
                          <option value="Hard">Hard</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end gap-6">
                      <button
                        type="button"
                        className="border-2 border-gray-600 mt-6 py-3 px-6 text-gray-900 font-semibold outline-none  rounded-md hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Cancle
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600  mt-6 py-3 px-6 text-white font-semibold outline-none border-none rounded-md hover:bg-blue-700"
                      >
                        Generate Quiz
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

export default CreateQuizByAi;
