import React from "react";
import "/public/loader.css";

const Loader = () => {
  return (
    <div className="absolute z-[999] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center gap-5 sm:gap-7 md:gap-5 lg:gap-4 border border-gray-300 rounded-lg h-[30vh] w-[60vw] sm:w-[47vw] lg:w-[35vw] py-3 sm:py-2 lg:h-[40vh] px-7 mt-10">
      {/* <h2 className="text-[.7rem] sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.6rem] text-black">
        Loading...
      </h2> */}
      {/* <SyncLoader size={5} /> */}

      <div className="loader"></div>
    </div>
  );
};

export default Loader;
