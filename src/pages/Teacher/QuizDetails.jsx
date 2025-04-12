import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizData } from "../../services/teacher";
import { useAuthContext } from "../../context/AuthContext";
import StudentQuizDetail from "../../components/Teacher/StudentQuizDetail";
import Loader from "../../components/Loader";

const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  if (!id) {
    return navigate("/");
  }

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const data = await getQuizData(id, userData.accessToken);
        console.log(data);
        setData(data.data);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
    console.log(data);
  }, [id]);

  return (
    <div className="min-h-screen">
      <Loader loading={loading} />
      <div className=" mb-12 mx-4 ">
        <h1 className="text-2xl text-gray-950 text-left font-semibold">{data[0]?.quizTitle || "Quiz Details"}</h1>

        <div
          className="cards py-4 mx-auto  max-w-md lg:grid lg:grid-cols-2 lg:place-items-stretch gap-5"
          style={{ scrollbarWidth: "none" }}
        >
          {data.length > 0 ? (
            data.map((obj, index) => (
              <div key={index} className="mb-4">
                <StudentQuizDetail
                  data={obj}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-600">No data available yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;
