import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';
import { getLiveQuizzes } from '../../services/quizzes';
import httpStatus from "http-status"
import QuizCard from './QuizCard';
import Loader from '../Loader';
import { toast } from 'react-toastify';

const LiveQuiz = ({setLoading}) => {
    const [liveQuizzes, setLiveQuizzes] = useState([]);
    const { userData } = useAuthContext();
  
    useEffect(() => {

      const getQuizData = async () => {
        setLoading(true)
        try {
          const res = await getLiveQuizzes(userData.accessToken);
          
          if (res.status === httpStatus.OK) {
            let data = res.data.data;
        const sortedData = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        setLiveQuizzes(sortedData);
      }
        } catch (error) {
          toast.error("Something went wrong.")
        }finally{
            setLoading(false)
        }
      };
      getQuizData();
    }, []);
  
  return (
    
    <div className="mt-8">
            <h2 className="text-gray-700 text-xl font-semibold">
              Active Quizzes
            </h2>
            <div
              className="cards py-4 mx-auto  lg:grid md:grid-cols-2 md:place-items-stretch gap-5"
              style={{ scrollbarWidth: "none" }}
            >
              {liveQuizzes.length > 0 ? (
                liveQuizzes.map((quiz, index) => (
                  <div key={index} className='mb-4 '>
                    <QuizCard
                      title={quiz.title}
                      timeLimit={quiz.timeLimit}
                      totalQuestions={quiz.questions.length}
                      date={quiz.createdAt}
                      id={quiz._id}
                    />
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No Live Quizzes</p>
              )}
            </div>
          </div>
  )
}

export default LiveQuiz