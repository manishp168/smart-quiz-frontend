import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import userPng from "../../assets/user.png";
import { MdDateRange, MdEmail, MdLogin, MdLogout, MdPerson } from "react-icons/md";
import { Link } from "react-router-dom";

const Profile = () => {
    const { userData } = useAuthContext();
  
  return (
    <div className="min-h-screen max-w-2xl mx-auto">
      <div className="mx-4 mt-10 ">
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-screen-md text-center">
          {/* Profile Image */}
          {userData.profileImage ? (
            <img
              src={userData.profileImage || userPng}
              alt="Profile"
              className="w-28 h-28 mx-auto rounded-full border-4 border-blue-500"
            />
          ) : (
            <div className="w-28 h-28 mx-auto rounded-full border-4 bg-green-500 border-blue-500 flex items-center justify-center text-4xl font-bold text-white">
                {userData.name.charAt(0).toUpperCase()}
            </div>
          )}

          {/* Name & Email */}
          <h2 className="mt-4 text-3xl font-semibold text-gray-800">
            {userData.name}
          </h2>
          <p className="text-gray-500 ">{userData.email}</p>

          {/* Extra Details */}
          <div className="mt-4 text-gray-600 text-left">
            <div className="flex items-center justify-center">
              <MdDateRange /> Account Created:{" "}
              {new Date(userData.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center justify-center">
              <MdLogout /> Last Login:{" "}
              {new Date(userData.createdAt).toLocaleString()}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-around">
            <Link to="/logout" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Logout
            </Link>
            {/* <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
              Change Password
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
