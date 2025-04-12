import React, { act, useState } from "react";

import kkcLogo from "../../assets/kkc.jpg";
import { MdMenu, MdClose } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const Navbar = ({ role }) => {

  const {userData} = useAuthContext();
   role = userData.role;
  //  role = "teacher"

  const teacherUl = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Create Quiz",
      path: "/teacher/create-quiz",
    },
    {
      name: "My Quizzes",
      path: "/teacher/quizzes",
    },
    {
      name: "Students List",
      path: "/teacher/student-list",
      active: true
    },
    // {
    //   name: "Student Progress",
    //   path: "/teacher/student-progress",
    
    // },
    // {
    //   name: "Notifications",
    //   path: "/teacher/notification",
    // },
    {
      name: "Profile",
      path: "/teacher/profile",
    },
    {
      name: "Logout",
      path: "/logout",
    },
  ];

  const studentUl = [
    {
      name: "Dashboard",
      path: "/home",
    },
    {
      name: "Live Quizzes",
      path: "/quizzes",
    },
    {
      name: "Quiz History",
      path: "/history",
    },
    // {
    //   name: "My Progress",
    //   path: "/progress",
    // },
    // {
    //   name: "Notifications",
    //   path: "/notification",
    // },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Logout",
      path: "/logout",
    },

  ];

  const ulList = role === "teacher" ? teacherUl : studentUl;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white fixed left-0 right-0 top-0 flex justify-between items-center px-3 py-1 shadow-md h-16 z-50">
      
        <div className="logo flex items-center">
          <img src={kkcLogo} alt="Logo" className="w-14" />
          <h1 className="font-bold text-2xl pl-2 text-gray-900">Smart Quiz</h1>
        </div>

        <div className="block lg:hidden">
          <div className="text-2xl cursor-pointer lg:hidden transition-all duration-500 ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <MdClose /> : <MdMenu />}
          </div>
         
          <ul
            className={`fixed bg-white text-black right-0 top-16 w-64  h-full shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
              isMenuOpen ? "h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col flex-wrap h-full border-t-2 md:border-0 px-2 pt-6">
              {ulList.map((item) => (

                <NavLink 
                key={item.path} 
                to={item.path} 
                className={({isActive}) => 
                `${isActive ? "bg-[#eaeaea] text-blue-700 font-semibold" : ""} cursor-pointer mt-1 p-2 rounded-lg hover:bg-[#eaeaea]`
                }
                onClick={() => setIsMenuOpen(false)}
                >
                {item.name}

                </NavLink>
              ))}
            </div>
          </ul>
        </div>

        <ul className="hidden lg:flex space-x-6 items-center ">
        {ulList.map((item) => (
                <NavLink 
                key={item.path}
                to={item.path}
                className= {({isActive}) => ` font-medium ${isActive ? "text-[#4b69fb]" : "text-gray-900"} hover:text-[#4b69fb] cursor-pointer transition-all duration-300`}
                >{item.name}</NavLink>
              ))}
          
        </ul>
      </nav>
      <div className={`overlay z-50 h-full transition-all duration-500 ease-in-out w-full bg-[#0000006a] fixed top-16 right-64 ${isMenuOpen ? 'h-full opacity-100' : 'max-h-0 opacity-0'} lg:hidden`}  onClick={() => setIsMenuOpen(!isMenuOpen)}></div>
    </>
  );
};

export default Navbar;
