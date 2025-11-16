import React from "react";
import Home from "./pages/Home";
import RoadmapContext from "./context/RoadmapContext";
import Start from "./pages/Start";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import LoginContext from "./context/LoginContext";
import Register from "./components/Register/Register";
import RegisterContext from "./context/RegisterContext";
import UserContext from "./context/UserContext";
import HomeProtectWrapper from "./wrappers/HomeProtectWrapper";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="w-screen h-screen">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <UserContext>
        <RegisterContext>
          <LoginContext>
            <RoadmapContext>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/home"
                  element={
                    <HomeProtectWrapper>
                      <Home />
                    </HomeProtectWrapper>
                  }
                />
              </Routes>
            </RoadmapContext>
          </LoginContext>
        </RegisterContext>
      </UserContext>
    </div>
  );
};

export default App;
