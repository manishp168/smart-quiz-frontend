import axios from "axios";
import httpStatus from "http-status";

const getQuizzes = async (token) => {
  try {
    let res = await axios.get(
      `${import.meta.env.VITE_TEACHER_API_URL}/get-quizzes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    if (res.status === httpStatus.OK) {
      console.log(res);
      return {
        status: true,
        data: res.data.data,
      };
    }
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const getQuizData = async (id, token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_TEACHER_API_URL}/quiz-details/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch quiz data. Please try again later.");
  }
};

export { getQuizzes, getQuizData };
