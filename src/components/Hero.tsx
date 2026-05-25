import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { lazy, Suspense, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { personal } from "@/data/portfolio";

const HeroTerminal = lazy(() =>
  import("@/components/HeroTerminal").then((module) => ({ default: module.HeroTerminal }))
);

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Hero() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.3 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.3 });
  const orbX = useTransform(springX, [0, 1], ["-14%", "14%"]);
  const orbY = useTransform(springY, [0, 1], ["-10%", "10%"]);
  const gridX = useTransform(springX, [0, 1], ["-18px", "18px"]);
  const gridY = useTransform(springY, [0, 1], ["-18px", "18px"]);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <section
      id="about"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden px-6 pt-20"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          x: reduceMotion ? 0 : gridX,
          y: reduceMotion ? 0 : gridY,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "84px 84px",
          maskImage: "radial-gradient(circle at 50% 35%, black 0%, transparent 68%)",
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          x: reduceMotion ? 0 : orbX,
          y: reduceMotion ? 0 : orbY,
          background:
            "radial-gradient(circle at 35% 30%, rgba(124,140,255,0.34), transparent 36%), radial-gradient(circle at 70% 62%, rgba(34,211,238,0.2), transparent 32%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="glass-panel grid w-full gap-10 rounded-3xl p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10"
        >
          <div className="min-w-0">
            <motion.div variants={item} className="mb-6">
              <span className="status-badge inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs text-emerald-100">
                <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-300" />
                {t("hero.available")}
              </span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-balance mb-5 text-5xl font-bold leading-[1.02] text-white sm:text-6xl md:text-7xl"
            >
              {personal.name.split(" ").map((word, i) => (
                <span key={word} className={i === 1 ? "text-accent-secondary" : undefined}>
                  {word}{" "}
                </span>
              ))}
            </motion.h1>

            <motion.p variants={item} className="mb-6 text-xl font-light text-white/70 sm:text-2xl">
              {t("hero.title")} <span className="text-white/30">/</span> {t("hero.location")}
            </motion.p>

            <motion.p
              variants={item}
              className="mb-10 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg"
            >
              {t("hero.bio")}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#080a11] transition-transform duration-200 hover:-translate-y-0.5"
              >
                {t("hero.viewProjects")}
              </a>
              <a
                href={`mailto:${personal.email}`}
                className="glass-control inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/12"
              >
                <Mail size={15} />
                {t("hero.getInTouch")}
              </a>
              <a
                href="/Darupong-Chouypu-CV.pdf"
                download
                className="glass-control inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/12"
              >
                <Download size={15} />
                {t("hero.downloadCv")}
              </a>

              <div className="flex items-center gap-2 sm:ml-1">
                <a
                  href="https://github.com/darupong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-control rounded-xl p-3 text-white/68 transition-colors hover:text-white"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-control rounded-xl p-3 text-white/68 transition-colors hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div variants={item} className="hidden content-center lg:grid lg:pl-4">
            <Suspense fallback={<div className="glass-card h-[28.4rem] rounded-2xl" />}>
              <HeroTerminal />
            </Suspense>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/35"
      >
        <span className="text-xs uppercase">{t("hero.scroll")}</span>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
