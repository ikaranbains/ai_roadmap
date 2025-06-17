import React from "react";
import Header from "../components/Header";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  useGSAP(() => {
    const btn = document.querySelector("#btn");
    const topSpans = btn.querySelectorAll(".sp");
    const bottomSpans = btn.querySelectorAll(".sp2");
    const tl = gsap.timeline({ paused: true });
    gsap.set(bottomSpans, { y: 64 });

    tl.to(
      topSpans,
      {
        y: -64,
        stagger: 0.02,
        duration: 0.2,
        ease: "power1.out",
      },
      0
    ).to(
      bottomSpans,
      {
        y: 0,
        stagger: 0.02,
        duration: 0.2,
        ease: "power1.out",
      },
      0
    );

    const handleHover = () => tl.play();
    const handleLeave = () => tl.reverse();

    btn?.addEventListener("mouseenter", handleHover);
    btn?.addEventListener("mouseleave", handleLeave);

    return () => {
      btn?.removeEventListener("mouseenter", handleHover);
      btn?.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className='font-["Space_Grotesk"] h-screen items-center justify-center pb-5 flex flex-col'>
      <Header />
      <div className="h-full flex items-center flex-col gap-7 justify-center border-2 border-dashed border-black w-[90%] mt-4">
        <h1 className="text-[2rem] font-medium leading-none">
          Ai curated roadmaps for you!!
        </h1>
        <h2> Let's start building a wonderful journey :)</h2>
        <div>
          <button
            onClick={() => navigate("/login")}
            id="btn"
            className="overflow-hidden relative bg-black text-white px-4 py-2 text-2xl font-light tracking-wide cursor-pointer h-[3rem]"
          >
            <div className="sp-row relative">
              <span className="sp inline-block">G</span>
              <span className="sp inline-block">E</span>
              <span className="sp inline-block">T</span>
              <span className="sp inline-block">&nbsp;</span>
              <span className="sp inline-block">S</span>
              <span className="sp inline-block">T</span>
              <span className="sp inline-block">A</span>
              <span className="sp inline-block">R</span>
              <span className="sp inline-block">T</span>
              <span className="sp inline-block">E</span>
              <span className="sp inline-block">D</span>
            </div>
            <div className="sp-row absolute top-2 left-0 w-full">
              <span className="sp2 inline-block">G</span>
              <span className="sp2 inline-block">E</span>
              <span className="sp2 inline-block">T</span>
              <span className="sp2 inline-block">&nbsp;</span>
              <span className="sp2 inline-block">S</span>
              <span className="sp2 inline-block">T</span>
              <span className="sp2 inline-block">A</span>
              <span className="sp2 inline-block">R</span>
              <span className="sp2 inline-block">T</span>
              <span className="sp2 inline-block">E</span>
              <span className="sp2 inline-block">D</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
