import { UserDetails } from "@/context/UserContext";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const Header = ({ home, landing }) => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { setUser } = useContext(UserDetails);
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
    <header className="w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <h1 className="text-base font-semibold tracking-tight">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            justRoadmap
          </Link>
        </h1>

        <div className="flex items-center gap-2">
          {home ? (
            <button
              onClick={() => handleLogout()}
              className="inline-flex items-center justify-center rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/30"
            >
              {logoutLoading ? (
                <PuffLoader size={18} color="#ffffff" />
              ) : (
                "Logout"
              )}
            </button>
          ) : landing ? (
            <nav className="flex items-center gap-2">
              <Link
                to="/login"
                className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                Create account
              </Link>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
