import React, { useState } from "react";

export const RegisterDetails = React.createContext();
const RegisterContext = ({ children }) => {
  const [registerDetails, setRegisterDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  return (
    <div>
      <RegisterDetails.Provider value={{ registerDetails, setRegisterDetails }}>
        {children}
      </RegisterDetails.Provider>
    </div>
  );
};

export default RegisterContext;
