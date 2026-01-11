import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import { RoadmapGenerate } from "../context/RoadmapContext";
import Markdown from "react-markdown";
import jspdf from "jspdf";
import html2canvas from "html2canvas";
import Sidebar from "../components/Sidebar/Sidebar";
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { apiCall } from "@/lib/apiService";
import Loader from "@/components/Loader";
import LimitModal from "@/components/modals/LimitModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

const TRIAL_LIMIT = 3;
const TRIAL_STORAGE_KEY = "trial_roadmap_count";

const Home = ({ trial = false }) => {
  const { generateClicked, setGenerateClicked } =
    React.useContext(RoadmapGenerate);
  const { input, setInput } = React.useContext(RoadmapGenerate);
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  const Motion = motion;

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
  const [limitModalOpen, setLimitModalOpen] = useState(trial);
  const [trialUsed, setTrialUsed] = useState(() => {
    if (!trial) return 0;
    const raw = localStorage.getItem(TRIAL_STORAGE_KEY);
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  });

  const trialLocked = trial && trialUsed >= TRIAL_LIMIT;
  const trialRemaining = useMemo(
    () => Math.max(0, TRIAL_LIMIT - trialUsed),
    [trialUsed]
  );

  // console.log("isLoading", isLoading);
  // console.log("generateClicked", generateClicked);

  const fetchData = async (prompt) => {
    try {
      const response = await apiCall({
        method: "get",
        url: "/api/get-data",
        params: {
          userInput: prompt,
        },
      });

      console.log("Response ---------", response);

      const roadmapText = response?.data?.roadmap;
      if (roadmapText) {
        setGenerateClicked(true);
        setRoadmap(roadmapText);

        if (trial) {
          const next = trialUsed + 1;
          setTrialUsed(next);
          localStorage.setItem(TRIAL_STORAGE_KEY, String(next));
          if (next >= TRIAL_LIMIT) setLimitModalOpen(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    if (!input || input.trim() === "") return alert("Input cannot be empty!!");
    if (trialLocked) return setLimitModalOpen(true);
    setIsLoading(true);
    await fetchData(input);
    if (input !== "" && input && !generateClicked) setuserin(input);
    setInput("");
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!input || input.trim() === "") return alert("Input cannot be empty!!");
    if (trialLocked) return setLimitModalOpen(true);
    if (input !== "" && input && !generateClicked) setuserin(input);
    console.log("===============", input);
    setIsLoading(true);
    await fetchData(input);
    setInput("");
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
    if (trial) return setLimitModalOpen(true);
    setSaved((prev) => !prev);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-100">
      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-xl z-[99] flex items-center justify-center">
          <Loader />
        </div>
      )}
      <Header home={!trial} landing={trial} />

      <LimitModal
        open={limitModalOpen}
        onClose={() => setLimitModalOpen(false)}
        trialUsed={trialUsed}
        trialLimit={TRIAL_LIMIT}
        title={trialLocked ? "Trial limit reached" : "Trial mode"}
        description={
          trialLocked
            ? "You’ve used all 3 free generations. Login/signup to generate more roadmaps and unlock saved roadmaps."
            : "You can generate up to 3 roadmaps for free. Saved roadmaps and the sidebar are disabled until you login."
        }
        onPrimary={() => navigate("/login")}
        onSecondary={() => navigate("/register")}
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
        <div
          className={`grid gap-6 ${
            trial ? "" : "lg:grid-cols-[300px_1fr]"
          }`}
        >
          {!trial && (
            <Card className="bg-white/60 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  Saved roadmaps
                  <button
                    onClick={() => handleSidebar()}
                    className="rounded-md p-2 hover:bg-accent"
                    title="Toggle sidebar"
                    type="button"
                  >
                    {sidebarIcon}
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className={sidebar ? "block" : "hidden lg:block"}>
                <div className="h-[calc(100vh-12rem)] overflow-y-auto">
                  <Sidebar saved={saved} userin={input} sidebar={true} />
                </div>
              </CardContent>
            </Card>
          )}

          {trial && (
            <Card className="bg-white/60 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Trial mode</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-zinc-600">
                <div className="flex items-center justify-between">
                  <span>Free generations left</span>
                  <span className="font-medium text-zinc-900">
                    {trialRemaining}/{TRIAL_LIMIT}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button onClick={() => navigate("/login")} className="w-full">
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/register")}
                    className="w-full"
                  >
                    Sign up
                  </Button>
                </div>
                <p className="mt-3 text-xs text-zinc-500">
                  Saved roadmaps & sidebar are disabled in trial mode.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-6">
            <Motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: "easeOut" }}
            >
              <Card className="bg-white/60 backdrop-blur">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">
                    Generate your roadmap
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={(e) => handleGenerate(e)}
                    className="flex flex-col gap-3 sm:flex-row sm:items-center"
                  >
                    <div className="w-full">
                      <label htmlFor="roadmap" className="sr-only">
                        Roadmap topic
                      </label>
                      <Input
                        id="roadmap"
                        name="roadmap"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. Software Developer"
                        disabled={trialLocked}
                      />
                      {trial && (
                        <p className="mt-2 text-xs text-zinc-500">
                          Trial: {trialRemaining}/{TRIAL_LIMIT} generations left
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      disabled={trialLocked || isLoading}
                      className="h-9 sm:h-10"
                    >
                      Generate
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Motion.div>

            {generateClicked && !isLoading && roadmap && (
              <Card className="bg-white/60 backdrop-blur">
                <CardHeader className="pb-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <CardTitle className="text-base">
                      {userin ? `${userin.toUpperCase()} Roadmap` : "Roadmap"}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSave()}
                        className={`rounded-md p-2 transition-colors ${
                          trial
                            ? "cursor-not-allowed opacity-50"
                            : "hover:bg-accent"
                        }`}
                        title={trial ? "Login to save roadmaps" : "Save"}
                        type="button"
                      >
                        {saveIcon}
                      </button>
                      <Button
                        variant="outline"
                        onClick={(e) => handleRegen(e)}
                        disabled={trialLocked}
                      >
                        Regenerate
                      </Button>
                      <Button
                        onClick={() => handleDownload()}
                        disabled={!roadmap}
                      >
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div
                    className="max-h-[60vh] overflow-y-auto overflow-x-hidden rounded-xl border bg-white/70 p-4 text-sm leading-relaxed text-zinc-800"
                    ref={roadmapref}
                  >
                    <Markdown
                      components={{
                        code: ({ children }) => (
                          <code className="rounded bg-zinc-100 px-1 py-0.5 text-[0.9em]">
                            {children}
                          </code>
                        ),
                        pre: ({ children }) => (
                          <pre className="my-3 overflow-x-auto rounded-lg bg-zinc-950 p-3 text-zinc-50">
                            {children}
                          </pre>
                        ),
                      }}
                    >
                      {roadmap}
                    </Markdown>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
