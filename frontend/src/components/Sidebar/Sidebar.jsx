import React from "react";
import Profile from "./Profile";
import SaveBox from "./SaveBox";

const Sidebar = ({ sidebar }) => {
  return (
    <div
      id="sidebar-main"
      className={`overflow-hidden border-t w-full h-full px-2 py-2 ${
        sidebar ? "-translate-x-0" : "-translate-x-100"
      } transition-transform ease-in-out duration-500`}
    >
      <Profile />
      <div className="w-full border-t border-b-zinc-300 mt-5"></div>

      <div className="overflow-y-auto h-full">
        <SaveBox />
      </div>
    </div>
  );
};

export default Sidebar;
