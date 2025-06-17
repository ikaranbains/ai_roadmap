import React, { useState } from "react";

export const LoginDetails = React.createContext();
const LoginContext = ({children}) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  return (
    <div>
      <LoginDetails.Provider value={{ loginDetails, setLoginDetails }}>
        {children}
      </LoginDetails.Provider>
    </div>
  );
};

export default LoginContext;
