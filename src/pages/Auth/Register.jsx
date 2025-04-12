import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import kkc from "../../assets/kkc.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";

const Register = () => {
  const [inputFields, setInputFields] = useState({
    name: "",
    email: "",
    role: "1",
    password: "",
    cpassword: "",
  });

  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cPasswordVisible, setCPasswordVisible] = useState(false);

  const navigate = useNavigate();
  
  const toggleEye = (field) => {
    field == "password"
      ? setPasswordVisible(!passwordVisible)
      : setCPasswordVisible(!cPasswordVisible);
  };

  const handleInputChange = (e) => {
    let fieldName = e.target.name;
    let fieldvalue = e.target.value;
    setInputFields((prevData) => ({ ...prevData, [fieldName]: fieldvalue }));
  };

  const { registerHandler } = useAuthContext();
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in inputFields) {
      console.log(inputFields[key]);
      if (inputFields[key].trim() === "") {
        console.log("error", key);
        setError(`${key} field is required`);
        break;
      }
    }
    if (inputFields.password !== inputFields.cpassword) {
      setError("confirm password does not match");
      return;
    }
    try {
      let res = await registerHandler(inputFields);
      if (res) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setInputFields({
          name: "",
          email: "",
          role: "1",
          password: "",
          cpassword: "",
        });
      }
    } catch (error) {
      console.log(error);
      setInputFields({
        name: "",
        email: "",
        role: "1",
        password: "",
        cpassword: "",
      });
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError("");
    }
  }, [error]);
  return (
    <>
      <div className="min-h-screen h-full w-full flex flex-col justify-center items-center bg-gray-50 py-6 px-4">
        <div className="text-center mb-6 flex justify-center items-center gap-3">
          <img src={kkc} alt="" className="w-20 rounded-full" />
          <h1 className="text-4xl font-bold text-zinc-900">Smart Quiz</h1>
        </div>
        <div className="bg-[#fff] max-w-md w-full mx-10 shadow-slate-800 px-5 pt-5 rounded-md">
          <h2 className="text-[#1F2937] text-3xl text-center">
            Create a account
          </h2>
          <form className="py-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="mt-4">
              <label className="text-[#4B5563]" htmlFor="name">
                Name:
              </label>
              <input
                value={inputFields.name}
                onChange={(e) => handleInputChange(e)}
                name="name"
                type="text"
                id="name"
                placeholder="Enter your name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              />
            </div>

            <div className="mt-4">
              <label className="text-[#4B5563]" htmlFor="email">
                Email:
              </label>
              <input
                value={inputFields.email}
                onChange={(e) => handleInputChange(e)}
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                required
              />
            </div>

            <div className="mt-4">
              <label className="text-[#4B5563]" htmlFor="password">
                Password:
              </label>
              <div className="relative flex">
                <input
                  value={inputFields.password}
                  onChange={(e) => handleInputChange(e)}
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                  required
                />

                {inputFields.password.length > 0 && (
                  <div
                    className="absolute right-2 top-3 text-[#2d62ff] text-xl"
                    onClick={() => toggleEye("password")}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[#4B5563]" htmlFor="cpassword">
                Confirm Password:
              </label>
              <div className="relative flex">
                <input
                  value={inputFields.cpassword}
                  onChange={(e) => handleInputChange(e)}
                  name="cpassword"
                  type={cPasswordVisible ? "text" : "password"}
                  id="cpassword"
                  placeholder="Confirm your password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
                  required
                />

                {inputFields.cpassword.length > 0 && (
                  <div
                    className="absolute right-2 top-3 text-[#2d62ff] text-xl"
                    onClick={() => toggleEye("cpassword")}
                  >
                    {cPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <label className="text-[#4B5563]" htmlFor="class">
                Class/Role:
              </label>
              <select
                value={inputFields.role}
                onChange={(e) => handleInputChange(e)}
                name="role"
                id="class"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5"
              >
                <option value="1">BCA-1-SEM</option>
                <option value="2">BCA-2-SEM</option>
                <option value="3">BCA-3-SEM</option>
                <option value="4">BCA-4-SEM</option>
                <option value="5">BCA-5-SEM</option>
                <option value="6">BCA-6-SEM</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-6"
            >
              Register
            </button>
            <p className="mt-2">
              already have an account?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
