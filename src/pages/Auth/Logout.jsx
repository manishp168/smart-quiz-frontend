import React, { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  useEffect(() => {
    logout();
    navigate("/login");
  }, []);
};

export default Logout;
