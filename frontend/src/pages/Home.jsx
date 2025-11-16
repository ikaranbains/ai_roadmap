import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
import Header from "../components/Header";
import { RoadmapGenerate } from "../context/RoadmapContext";
import Markdown from "react-markdown";
import { SyncLoader } from "react-spinners";
import Sidebar from "../components/Sidebar/Sidebar";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarLeftCollapse,
} from "react-icons/tb";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
// import { ClockFadingIcon } from "lucide-react";
import { apiCall } from "@/lib/apiService";
import Loader from "@/components/Loader";

const Home = () => {
  const { generateClicked, setGenerateClicked } =
    React.useContext(RoadmapGenerate);
  const { input, setInput } = React.useContext(RoadmapGenerate);
  const [userin, setuserin] = useState("");
  // console.log(userin);
  const [roadmap, setRoadmap] = useState(``);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const [sidebarIcon, setSidebarIcon] = useState(
    <TbLayoutSidebarLeftCollapse size={24} />
  );
  const [saveIcon, setSaveIcon] = useState(<GoBookmark size={24} />);
  const [saved, setSaved] = useState(false);

  // console.log("isLoading", isLoading);
  // console.log("generateClicked", generateClicked);

  const fetchData = async (prompt) => {
    try {
      // const response = await axios.get("/api/get-data", {
      //   params: {
      //     userInput: prompt,
      //   },
      // });

      const response = await apiCall({
        method: "get",
        url: "/api/get-data",
        params: {
          userInput: prompt,
        },
      });

      console.log("Response ---------", response);

      // if (response) {
      //   console.log("here", response.data.roadmap);
      //   setGenerateClicked(true);
      //   setIsLoading(false);
      //   setRoadmap(response.data.roadmap);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  //html2pdf generation
  const roadmapref = React.useRef(null);

  const handleDownload = async () => {
    const roadmapElement = roadmapref.current;
    const clone = roadmapElement.cloneNode(true);
    clone.style.background = "#ffffff";
    clone.style.color = "#000000";
    clone.style.padding = "20px";
    clone.style.fontSize = "14px";
    clone.style.fontFamily = "sans-serif";
    clone.style.width = "794px";

    clone.style.position = "absolute";
    clone.style.top = "-9999px";
    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jspdf({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${userin}-roadmap.pdf`);

    document.body.removeChild(clone);
  };

  // roadmap regenerate logic
  const handleRegen = async (e) => {
    e.preventDefault();
    await fetchData(input);
    if (input !== "" && input && !generateClicked) setuserin(input);
    setInput("");
    setIsLoading(true);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (input === "" && !input && !isLoading && generateClicked)
      return alert("Input cannot be empty!!");
    if (input !== "" && input && !generateClicked) setuserin(input);
    console.log("===============", input);
    await fetchData(input);
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

    setSaveIcon(
      saved ? <GoBookmarkFill size={24} /> : <GoBookmark size={24} />
    );
  }, [sidebar, saved]);

  // save logic
  const handleSave = () => {
    setSaved((prev) => !prev);
  };

  return (
    <main className="overflow-hidden">
      {isLoading && (
        <div className="absolute backdrop-blur-xl w-screen h-screen top-0 z-[99] flex items-center justify-center">
          <Loader />
        </div>
      )}
      <Header home={true} />
      <div className="overflow-hidden w-screen flex h-[88vh]">
        <aside
          className={`h-full ${
            sidebar ? "w-[20vw]" : "w-[0vw]"
          } transition-width ease-in-out duration-300`}
        >
          <Sidebar saved={saved} userin={input} sidebar={sidebar} />
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

          {generateClicked && !isLoading && (
            <div className="m-auto w-[83%] sm:min-w-[75%] md:min-w-[70%] lg:min-w-[65%] border mt-8 px-10 py-5 mb-10 ">
              <div className="flex justify-between">
                <div></div>
                <h2 className="text-2xl font-medium text-center mb-7">
                  {userin.toUpperCase()} Roadmap
                </h2>
                <span
                  onClick={() => handleSave()}
                  className=" cursor-pointer"
                  title="save"
                >
                  {saveIcon}
                </span>
              </div>
              {roadmap && (
                <>
                  <div
                    className="text-[.9rem] sm:text-[.75rem] md:text-[.8rem] lg:text-[1rem]"
                    ref={roadmapref}
                    style={{ minWidth: "794px" }}
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
