import React from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { Brain, FileDown, Sparkles, Wand2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Start = () => {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();
  // ESLint in this repo doesn't reliably treat `<motion.div />` as usage of `motion`.
  // Using a capitalized alias keeps the same API while satisfying no-unused-vars.
  const Motion = motion;
  const MotionLink = motion(Link);

  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className='font-["Space_Grotesk"] min-h-screen overflow-x-hidden bg-gradient-to-br from-zinc-50 via-white to-zinc-100'>
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-[-12rem] sm:right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-violet-300/30 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 left-[-12rem] sm:left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-fuchsia-300/20 blur-3xl"
        />

        <Header landing />

        <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
          <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Motion.div
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="flex flex-col items-start gap-5"
            >
              <Motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur"
              >
                <Sparkles className="size-4" />
                AI-curated career roadmaps
              </Motion.div>

              <Motion.h1
                variants={fadeUp}
                className="text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl"
              >
                Build your path with{" "}
                <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  justRoadmap
                </span>
              </Motion.h1>

              <Motion.p
                variants={fadeUp}
                className="max-w-xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg"
              >
                Tell us the role you want, and we’ll generate a clear,
                structured roadmap you can save, revisit, and export.
              </Motion.p>

              <Motion.div
                variants={fadeUp}
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <MotionLink
                  to="/trial"
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-primary px-6 text-sm font-semibold tracking-wide text-primary-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-violet-600/0 via-white/18 to-fuchsia-600/0" />
                  <Motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={
                      prefersReducedMotion
                        ? { x: 0 }
                        : { x: ["-140%", "140%"] }
                    }
                    transition={
                      prefersReducedMotion
                        ? undefined
                        : { duration: 1.6, ease: "easeInOut", repeat: Infinity }
                    }
                    className="pointer-events-none absolute -inset-y-6 left-0 w-24 bg-white/15 blur-xl"
                  />

                  <span className="relative inline-flex items-center gap-2">
                    Get started
                    <Motion.span
                      aria-hidden="true"
                      className="inline-flex"
                      whileHover={
                        prefersReducedMotion ? undefined : { x: 3, opacity: 1 }
                      }
                      initial={{ opacity: 0.8 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      →
                    </Motion.span>
                  </span>
                </MotionLink>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="h-12"
                >
                  Create account
                </Button>
              </Motion.div>

              <Motion.div
                variants={fadeUp}
                className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-600"
              >
                <div className="inline-flex items-center gap-2">
                  <Wand2 className="size-4" />
                  Personalized roadmap in seconds
                </div>
                <div className="inline-flex items-center gap-2">
                  <FileDown className="size-4" />
                  Export as PDF
                </div>
                <div className="inline-flex items-center gap-2">
                  <Brain className="size-4" />
                  Clear, structured learning path
                </div>
              </Motion.div>
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeOut" }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-200/50 to-fuchsia-200/20 blur-2xl"
              />
              <Motion.div
                className="relative rounded-[2rem] border bg-white/70 p-4 shadow-sm backdrop-blur"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -6, 0] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <Motion.img
                  src="/bg.png"
                  alt="Illustration for roadmap generation"
                  className="h-auto w-full rounded-2xl object-contain"
                  loading="eager"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              </Motion.div>
            </Motion.div>
          </section>

          <section className="mt-14 grid gap-4 md:mt-18 md:grid-cols-3">
            <Motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Card className="bg-white/60 backdrop-blur transition-shadow hover:shadow-md">
              <CardHeader className="gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="inline-flex size-9 items-center justify-center rounded-md border bg-white">
                    <Sparkles className="size-4" />
                  </span>
                  AI-curated steps
                </CardTitle>
                <CardDescription>
                  From fundamentals to projects—organized so you always know
                  what’s next.
                </CardDescription>
              </CardHeader>
              </Card>
            </Motion.div>

            <Motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Card className="bg-white/60 backdrop-blur transition-shadow hover:shadow-md">
              <CardHeader className="gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="inline-flex size-9 items-center justify-center rounded-md border bg-white">
                    <Wand2 className="size-4" />
                  </span>
                  Regenerate anytime
                </CardTitle>
                <CardDescription>
                  Iterate quickly: refine your goal and instantly get a fresh,
                  improved roadmap.
                </CardDescription>
              </CardHeader>
              </Card>
            </Motion.div>

            <Motion.div
              whileHover={prefersReducedMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 420, damping: 28 }}
            >
              <Card className="bg-white/60 backdrop-blur transition-shadow hover:shadow-md">
              <CardHeader className="gap-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <span className="inline-flex size-9 items-center justify-center rounded-md border bg-white">
                    <FileDown className="size-4" />
                  </span>
                  Save & export
                </CardTitle>
                <CardDescription>
                  Bookmark your roadmaps and download them when you’re ready to
                  share or print.
                </CardDescription>
              </CardHeader>
              </Card>
            </Motion.div>
          </section>

          <section className="mt-12">
            <div className="rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur">
              <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                How it works
              </h2>
              <p className="mt-1 text-sm text-zinc-600">
                A simple flow designed for fast clarity.
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-white/70 p-4">
                  <div className="text-sm font-semibold text-zinc-900">
                    01. Choose a role
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">
                    e.g., “Frontend Developer”, “Data Analyst”, “DevOps”
                  </div>
                </div>
                <div className="rounded-xl border bg-white/70 p-4">
                  <div className="text-sm font-semibold text-zinc-900">
                    02. Generate roadmap
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">
                    Get a structured plan with topics and progression.
                  </div>
                </div>
                <div className="rounded-xl border bg-white/70 p-4">
                  <div className="text-sm font-semibold text-zinc-900">
                    03. Save & export
                  </div>
                  <div className="mt-1 text-sm text-zinc-600">
                    Keep it for later and download a PDF when needed.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="mt-10 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} justRoadmap
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Start;
