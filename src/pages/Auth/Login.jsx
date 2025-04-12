import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import kkc from "../../assets/kkc.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";

axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const toggleEye = (field) => {
    if (field == "password") setPasswordVisible(!passwordVisible);
  };

  const navigate = useNavigate();
  const { loginHandler, loading } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error(`${!email ? "Email" : "Password"} is required`);
    }

    try {
      let {success, role} = await loginHandler({ email, password });
      if (success) {
        setTimeout(() => {
          // role === "teacher" ? navigate("/dashboard") : navigate("/home"); 
          navigate(role === "teacher" ? "/dashboard" : "/home")
        }, 3000);
      } else {
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
    <Loader loading={loading}/>
      <div className="min-h-screen h-full w-full flex flex-col justify-center items-center bg-[#eaeaea] px-4">
        <div className="text-center mb-6 flex justify-center items-center gap-3">
          <img src={kkc} alt="" className="w-20 rounded-full" />
          <h1 className="text-4xl font-bold text-zinc-900">Smart Quiz</h1>
        </div>
        <div className="bg-[#fff] max-w-md w-full mx-10 shadow-slate-800 px-5 pt-5 rounded-md">
          <h2 className="text-[#1F2937] text-3xl text-center">Login account</h2>
          <form onSubmit={(e) => handleSubmit(e)} className="py-4">
            <div className="mt-4">
              <label className="text-[#4B5563]" htmlFor="email">
                Email:
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                placeholder="Enter your email"
                className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                required
              />
            </div>

            <div className="mt-4">
              <label className="text-[#4B5563]" htmlFor="password">
                Password:
              </label>
              <div className="relative flex">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  className="bg-[#F5EFFF] border-[#D1D5DB] border-2 outline-none rounded-md w-full p-2"
                  required
                />

                {password.length > 0 && (
                  <div
                    className="absolute right-2 top-3 text-[#2d62ff] text-xl"
                    onClick={() => toggleEye("password")}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#2d62ff] mt-6 w-full p-[0.6rem] rounded-md text-white font-semibold"
            >
              Login
            </button>
            <p className="mt-2">
              don't have an account?{" "}
              <Link to="/register" className="text-blue-600 underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
