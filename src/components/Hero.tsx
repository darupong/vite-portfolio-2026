import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { personal } from "@/data/portfolio";

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

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center relative px-6 pt-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto w-full">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          {/* Status badge */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-[#2a2a2a] bg-[#111] text-[#888]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {t("hero.available")}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-4"
          >
            {personal.name.split(" ").map((word, i) => (
              <span key={i} className={i === 1 ? "text-[#6366f1]" : "text-white"}>
                {word}{" "}
              </span>
            ))}
          </motion.h1>

          {/* Title + Location */}
          <motion.p variants={item} className="text-xl sm:text-2xl text-[#888] font-light mb-6">
            {t("hero.title")} &mdash; {t("hero.location")}
          </motion.p>

          {/* Bio */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed max-w-2xl mb-10"
          >
            {t("hero.bio")}
          </motion.p>

          {/* Actions */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#6366f1] text-white text-sm font-medium hover:bg-[#818cf8] transition-colors"
            >
              {t("hero.viewProjects")}
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#2a2a2a] text-[#f5f5f5] text-sm font-medium hover:border-[#6366f1] transition-colors"
            >
              <Mail size={15} />
              {t("hero.getInTouch")}
            </a>

            <div className="flex items-center gap-3 ml-auto sm:ml-2">
              <a
                href="https://github.com/darupong"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#444] transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-[#2a2a2a] text-[#888] hover:text-white hover:border-[#444] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-16 pt-8 border-t border-[#1a1a1a] flex flex-wrap gap-10"
          >
            {[
              { value: "3+", key: "hero.stats.years" },
              { value: "10+", key: "hero.stats.projects" },
              { value: "3", key: "hero.stats.companies" },
            ].map((stat) => (
              <div key={stat.key}>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-[#666] mt-0.5">{t(stat.key)}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#444]"
      >
        <span className="text-xs tracking-widest uppercase">{t("hero.scroll")}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
