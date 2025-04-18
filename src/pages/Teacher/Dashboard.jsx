import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Container } from "../../components/Container";
import Tile from "../Tile";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import { getQuizzes } from "../../services/teacher";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { userData } = useAuthContext();

  const [totalQuiz, setTotalQuiz] = useState(0);
  const [unPublishedQuizzes, setUnPublishedQuizzes] = useState(0);
  const [quizzes, setQuizzes] = useState();
  const [totalParticipated, setTotalParticipated] = useState(0);
  const [todayParticipated, setTodayParticipated] = useState(0);

  const getQuizData = async () => {
    setLoading(true);
    try {
      let res = await getQuizzes(userData.accessToken);
      console.log(res);
      if (res.status) {
        let data = res.data.quizzes;
        setQuizzes(shortQuizData(data));
        setTotalQuiz(data.length);
        let privateQuizzes = data.filter((obj) => obj.isPublished === false);
        setUnPublishedQuizzes(privateQuizzes.length);
        setTotalParticipated(res.data.totalUserParticipated);
        setTodayParticipated(res.data.todayParticipated);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getQuizData();
  }, []);



  const shortQuizData = (quizzes) => {
    if (quizzes && quizzes.length > 0) {
      if (quizzes.length > 3) {
        let shortQuiz = quizzes;
        shortQuiz.length = 3;
        return shortQuiz;
      }else{
        return quizzes;
      }
    }
  };
  return (
    <>
      <Loader loading={loading} />
      <div
        className="min-h-screen w-full overflow-x-hidden"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="px-4">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 mt-8 lg:items-center">
            <Tile
              title="Total Quizzes"
              bg="bg-blue-500"
              count={totalQuiz}
              slug="created"
            />
            <Tile
              title="Unpublished Quizzes"
              bg="bg-red-500"
              count={unPublishedQuizzes}
              slug="unpublished"
            />
            <Tile
              title="Students Participated"
              bg="bg-emerald-500"
              count={totalParticipated}
              slug="students"
            />
            <Tile
              title="Today's Participated"
              bg="bg-gray-500"
              count={todayParticipated}
              slug="students"
            />
          </div>

          <div className="bg-white mt-6 p-4 rounded-md shadow">
            <h3 className="text-xl text-gray-800 font-semibold">
              Recent Quizzes
            </h3>

            <div className="relative overflow-x-auto shadow rounded-sm mt-3">
              <table className="w-full text-sm text-left rtl:text-right text-gray-700 ">
                <thead className="text-sm text-gray-700 uppercase bg-gray-100 text-nowrap">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Quiz Title
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Total Participates
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Avarage Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes && quizzes.length > 0 ? (
                    quizzes.map((obj, index) => (
                      <tr key={index} className="bg-slate-50 border-b ">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                        >
                          {obj.title}
                        </th>
                        <td className="px-6 py-4">{obj.totalParticipated}</td>
                        <td className="px-6 py-4">
                          {obj.averageScore || 0}/{obj.questions?.length || 0}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="text-center py-6 text-gray-500"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
