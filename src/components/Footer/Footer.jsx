import React from "react";
import kkcLogo from "../../assets/kkc.jpg";
const Footer = () => {
  return (
    <div className="bg-[#fff] border-t border-t-slate-300 py-4 px-4">
      <div>
        <div className="logo flex items-center">
          <img src={kkcLogo} alt="Logo" className="w-14" />
          <h1 className="font-bold text-2xl pl-2 text-gray-900">Smart Quiz</h1>
        </div>

        <p className="mt-2 text-gray-700 text-md mb-4"><span className="font-medium text-gray-800">Smart Quiz</span> is an interactive platform that makes learning and expanding knowledge fun through quizzes. It's perfect for students and professionals alike.</p>
        <hr />
        <p className="mt-3  text-lg mb-4 text-center">Developed By: <span className="text-gray-900 font-semibold">Manish Choudhary</span></p>
      </div>
      <hr />
    <div className="mt-1 text-center font-medium">
        <p>&copy;2025 Smart Quiz. All Rights Reserved.</p>
    </div>
    </div>
  );
};

export default Footer;
