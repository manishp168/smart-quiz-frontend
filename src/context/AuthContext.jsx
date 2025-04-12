import axios from "axios";
import httpStatus from "http-status";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginHandler = async (data) => {
    setLoading(true);
    try {
      let res = await axios.post(
        `${import.meta.env.VITE_USERS_API_URL}/login`,
        data
      );
      if (res.status === httpStatus.OK) {
        toast.success("Login Successfully");

        setUserData(res.data.data);
        localStorage.setItem("token", res.data.data.accessToken);

        return {success: true, role: res.data.data.role};
      } else {
        toast.error(res.data.message);
        return false;
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message || "Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const registerHandler = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USERS_API_URL}/register`,
        data
      );
      console.log(response);
      if (response.status === httpStatus.OK) {
        toast.success("Account Created Successfully");
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
  };

  const getProfile = async (token) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_USERS_API_URL}/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        { withCredentials: true }
      );
      if (res.status === httpStatus.OK) {
        setUserData(res.data.data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && token != "") {
      getProfile(token);
    }else{
      setLoading(false)
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        logout,
        loading,
        userData,
        setLoading,
        loginHandler,
        registerHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
