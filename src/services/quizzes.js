import axios from "axios";
import httpStatus from "http-status";
const getLiveQuizzes = async (token) => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_QUIZ_API_URL}/live-quizzes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getUserHistory = async (token) => {
    try {
        const res = await axios.get(
          `${import.meta.env.VITE_QUIZ_API_URL}/quiz-history`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        return res;
      } catch (error) {
        console.log(error);
      }
}

export { getLiveQuizzes, getUserHistory };
