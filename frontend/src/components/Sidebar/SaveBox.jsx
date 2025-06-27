import React from "react";

const SaveBox = ({ saved, userin }) => {
  return (
    <div className="overflow-y-auto px-2 py-2 pb-10 h-full font-insta">
      {saved ? (
        <div className="px-3 bg-slate-100 text-sm tracking-tight rounded-md py-2 mt-5">
          {userin ? userin : " - roadmap"}
        </div>
      ) : (
        <h1 className="leading-none mt-3 text-sm  text-center text-zinc-500 selection:bg-black selection:text-white">
          No roadmaps
        </h1>
      )}
    </div>
  );
};

export default SaveBox;
