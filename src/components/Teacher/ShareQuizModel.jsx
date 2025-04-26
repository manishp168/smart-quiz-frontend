
import React, { useState } from 'react'
import { MdWhatsapp } from 'react-icons/md';

import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import { CopyIcon } from 'lucide-react';

import { FaTelegramPlane } from "react-icons/fa";

import {TelegramShareButton, WhatsappShareButton} from 'react-share'

const ShareQuizModel = ({ shareModelOpen, setShareModelOpen, quizId, quizTitle }) => {
    const navigate = useNavigate();
    const [isCopied, setIsCopied] = useState(false);
    const quizLink = `https://smart-quizz.vercel.app/quiz/${quizId}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quizLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // 2 सेकंड बाद रिसेट
    } catch (err) {
      console.error('not copied:', err);
    }
  };
  const handleCloseBtn = () => {
    setShareModelOpen(false);
    navigate("/teacher/quizzes")
  }
    return (
        shareModelOpen && (
          <>
          <div className="min-h-screen h-full w-screen  fixed top-0 left-0 bg-gray-500/25 z-40 flex justify-center items-center">
          
            <div
              className="relative z-20 w-full max-w-lg h-fit  mx-4 overflow-y-auto bg-white rounded-lg shadow-xl "
              style={{ scrollbarWidth: "none" }}
            >
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4  h-full">
                <h2 className="text-center font-semibold text-2xl">Share Your Quiz</h2>
                <div className=" max-w-sm m-auto mt-8 md:max-w-lg">
                <span className='text-gray-800 font-normal'>Quiz link:</span>
                    <div className="flex justify-between items-center border-2 border-blue-500 rounded-md ">
                        <input type="text" className='px-2 flex-1 border-none outline-none cursor-pointer text-gray-700 font-medium' value={quizLink} readOnly/>
                        <button className='flex bg-blue-500 p-2 rounded-sm text-white hover:bg-blue-600 transition-all duration-300 font-medium gap-2' onClick={handleCopy}><CopyIcon /> {isCopied ? "Copied":"Copy"}</button>
                    </div>
                    <div className="mt-6 mb-4">
                        <p className='text-center'>Share quiz with students on:</p>
                        <div className="flex justify-center gap-4 mt-2 items-center text-3xl">
                            <WhatsappShareButton 
                            title={quizTitle}
                            url={quizLink}
                            >
                            <div className='flex items-center gap-2 bg-[#20c25b] text-white p-2 rounded-md text-lg'>
                            <span className='text-3xl'>
                            <MdWhatsapp />
                            </span> 
                            Whatsapp
                            </div>
                            </WhatsappShareButton>
                            <TelegramShareButton 
                            title={quizTitle}
                            url={quizLink}
                            openShareDialogOnClick={true}
                            >

                            <div className='flex items-center gap-2 bg-[#0088cc] text-white p-2 rounded-md text-lg'>
                            <span className='text-3xl'>
                            <FaTelegramPlane />
                            </span> 
                            Telegram
                            </div>
                            </TelegramShareButton>
                            
                        </div>
                        </div>
                    <div className="relative bg-blue-500 mt-20">

                      <button
                        type="button"
                        className="absolute -bottom-2 -right-4 border-2 border-red-500 mt-6 py-2 px-6 text-gray-900 font-semibold outline-none  rounded-md hover:bg-red-500 hover:text-white transition-all duration-300"
                      onClick={handleCloseBtn}>
                        Close
                      </button>

                        </div>
                </div>
              </div>
            </div>
          </div>
          </>
        )
      );
}

export default ShareQuizModel