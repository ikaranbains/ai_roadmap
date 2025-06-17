import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import { RoadmapGenerate } from "../context/RoadmapContext";
import Markdown from "react-markdown";
import { SyncLoader } from "react-spinners";
import html2pdf from "html2pdf.js";
import Sidebar from "../components/Sidebar/Sidebar";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Home = () => {
  const { generateClicked, setGenerateClicked } =
    React.useContext(RoadmapGenerate);

  const { input, setInput } = React.useContext(RoadmapGenerate);
  const [userin, setuserin] = useState("");
  const [roadmap, setRoadmap] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const [sidebarIcon, setSidebarIcon] = useState(
    <TbLayoutSidebarLeftCollapse size={24} />
  );

  const apiCall = async (prompt) => {
    try {
      const response = await axios.get("http://localhost:3000/api/get-data", {
        params: {
          userInput: prompt,
        },
      });

      if (response) {
        setGenerateClicked(true);
        setIsLoading(false);
        setRoadmap(response.data.roadmap);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //html2pdf generation
  const roadmapref = React.useRef(null);

  const handleDownload = () => {
    const element = roadmapref.current;

    html2pdf()
      .set({
        margin: 5,
        filename: `${userin}-roadmap.pdf`,
        image: {
          type: "jpeg",
          quality: 1,
        },
        html2canvas: {
          scale: 4,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save();
  };

  // roadmap regenerate logic
  const handleRegen = (e) => {
    e.preventDefault();
    setuserin(input);
    apiCall(userin);
    setInput("");
    setIsLoading(true);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    apiCall(input);
    setuserin(input);
    setInput("");
    setIsLoading(true);
  };

  //sidebar logic
  const handleSidebar = () => {
    setSidebar((prev) => !prev);
  };

  useEffect(() => {
    setSidebarIcon(
      sidebar ? (
        <TbLayoutSidebarLeftCollapse size={24} />
      ) : (
        <TbLayoutSidebarLeftExpand size={24} />
      )
    );
  }, [sidebar]);

  // console.log(sidebar);

  return (
    <main className="overflow-hidden">
      <Header home={true} />
      <div className="overflow-hidden w-screen flex h-[88vh]">
        <aside
          className={`h-full ${
            sidebar ? "w-[20vw]" : "w-[0vw]"
          } transition-width ease-in-out duration-300`}
        >
          <Sidebar sidebar={sidebar} />
        </aside>

        <div
          className={`flex flex-col gap-2 items-center justify-start pt-5 border-t border-l overflow-y-auto overflow-x-hidden ${
            sidebar ? "w-[80vw]" : "w-[100vw]"
          } transition-width ease-in-out duration-300`}
        >
          <span
            onClick={() => handleSidebar()}
            className="inline-block self-start ml-5 cursor-pointer"
          >
            {sidebarIcon}
          </span>
          <div className="font-['Inter'] ">
            <form className="flex flex-col items-center justify-center mt-10 gap-5">
              <label
                className=" text-sm sm:text-md lg:text-lg font-medium "
                htmlFor="roadmap"
              >
                What Roadmap do you want to create ?
              </label>
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="border-b border-zinc-400 outline-none rounded px-2 pl-5 py-2 w-[60vw] sm:w-[28vw] lg:w-[30vw]"
                id="roadmap"
                name="roadmap"
                type="text"
                placeholder="e.g software developer"
              />
              <button
                type="submit"
                onClick={(e) => handleGenerate(e)}
                className="px-3 py-1 text-white bg-[#443C68] hover:bg-black transition-all ease 200ms cursor-pointer mt-5 rounded text-[4vw] sm:text-sm md:text-md lg:text-lg"
              >
                Generate
              </button>
            </form>
          </div>

          <div>
            {isLoading && (
              <div className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] flex items-center justify-center gap-5 sm:gap-7 md:gap-5 lg:gap-4 bg-zinc-100 w-[60vw] sm:w-[47vw] lg:w-[35vw] py-3 sm:py-2 lg:h-[10vh] px-7 mt-10">
                <h2 className="text-[.7rem] sm:text-[1.2rem] md:text-[1.3rem] lg:text-[1.6rem]">
                  Generating Roadmap
                </h2>
                <SyncLoader size={5} />
              </div>
            )}
          </div>

          {generateClicked && !isLoading && (
            <div className="m-auto w-[83%] sm:w-[75%] md:w-[70%] lg:w-[65%] border mt-8 px-10 py-5 mb-10 ">
              <h2 className="text-2xl font-medium text-center mb-7">
                {userin.toUpperCase()} Roadmap
              </h2>
              {roadmap && (
                <>
                  <div
                    className="text-[.9rem] sm:text-[.75rem] md:text-[.8rem] lg:text-[1rem]"
                    ref={roadmapref}
                    style={{ maxWidth: "794px" }}
                  >
                    <Markdown>{roadmap}</Markdown>
                  </div>
                  <div className="mt-4 mb-4 py-2 flex items-center justify-center gap-5">
                    <button
                      onClick={(e) => handleRegen(e)}
                      className="bg-blue-600 text-white border-none rounded-md px-4 py-1 md:px-3 lg:px-4 lg:py-2 text-[.7rem] md:text-[.9rem] lg:text-[1rem] cursor-pointer"
                    >
                      Regenerate Roadmap
                    </button>
                    <button
                      onClick={() => handleDownload()}
                      className="bg-green-600 text-white border-none rounded-md px-4 py-1 md:px-3 lg:px-4 lg:py-2 text-[.7rem] md:text-[.9rem] lg:text-[1rem] cursor-pointer"
                    >
                      Download PDF
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
