import React from "react";

export const UserDetails = React.createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = React.useState();
  const [registerUser, setRegisterUser] = React.useState();
  return (
    <div>
      <UserDetails.Provider
        value={{ user, setUser, registerUser, setRegisterUser }}
      >
        {children}
      </UserDetails.Provider>
    </div>
  );
};

export default UserContext;
