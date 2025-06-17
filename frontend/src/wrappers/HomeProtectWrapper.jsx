import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../context/UserContext";

const HomeProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDetails);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return <div>{children}</div>;
};

export default HomeProtectWrapper;
