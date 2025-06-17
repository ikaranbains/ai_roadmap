import { UserDetails } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const Header = ({ home }) => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { user, setUser } = useContext(UserDetails);
  const navigate = useNavigate();

  //logout logic
  const handleLogout = () => {
    setLogoutLoading(true);
    setUser({});
    setTimeout(() => {
      setLogoutLoading(false);
      localStorage.removeItem("token");
      navigate("/login");
    }, 1000);
  };
  return (
    <div className="w-full overflow-hidden h-[12vh] flex items-center justify-between px-17">
      <h1 className="text-lg font-medium hover:font-semibold tracking-tight leading-none">
        <Link to="/">justRoadmap</Link>
      </h1>
      <h2 className="font-light text-zinc-300">NOTHING HERE</h2>
      {home ? (
        <button
          onClick={() => handleLogout()}
          className="bg-red-500 text-white hover:bg-red-600 px-4 py-1.5 rounded cursor-pointer"
        >
          {logoutLoading ? <PuffLoader size={22} color="#ffffff" /> : "Logout"}
        </button>
      ) : (
        <h1 className="text-lg font-medium hover:font-semibold tracking-tight leading-none">
          <Link to="/">justRoadmap</Link>
        </h1>
      )}
    </div>
  );
};

export default Header;
