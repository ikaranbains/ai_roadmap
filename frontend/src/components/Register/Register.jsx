import React from "react";
import { RegisterForm } from "./register-form";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex flex-col gap-2 h-screen items-center justify-center">
      <div className="w-full flex items-center justify-end pr-25">
        <Link
          to="/"
          className="cursor-pointer hover:font-medium border-b-2 border-black border-dashed"
        >
          Home
        </Link>
      </div>
      <RegisterForm className="w-90" />
    </div>
  );
};

export default Register;
