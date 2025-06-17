import React from "react";
import { LoginForm } from "./login-form";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-start pt-14">
      <div className="w-full flex justify-end pr-25">
        <Link
          to="/"
          className="cursor-pointer hover:font-medium border-b-2 border-black border-dashed"
        >
          Home
        </Link>
      </div>
      <LoginForm className="w-90" />
    </div>
  );
};

export default Login;
