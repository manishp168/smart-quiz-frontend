import React, { useState } from "react";
import Loader from "../../components/Loader";
import Tile from "../Tile";
import QuizCard from "../../components/Student/QuizCard";
import LiveQuiz from "../../components/Student/LiveQuiz";

const LiveQuizzes = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Loader loading={loading} />
      <div className="min-h-screen w-full " style={{ scrollbarWidth: "none" }}>
        <div className="px-4">
          <LiveQuiz setLoading={setLoading} />
        </div>
      </div>
    </>
  );
};

export default LiveQuizzes;
