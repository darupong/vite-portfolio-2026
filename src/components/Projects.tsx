import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects, type ProjectCategory } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  "AI / Web App":  "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "AI Campaign":   "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "Web Platform":  "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Mobile App":    "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "3D / VR":       "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Web / Game":    "text-rose-400 bg-rose-400/10 border-rose-400/20",
  "Unity Game":    "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "AR Filter":     "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20",
  "Creative":      "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

type FilterKey = "all" | ProjectCategory;

export function Projects() {
  const [ref, inView] = useInView(0.05);
  const [active, setActive] = useState<FilterKey>("all");
  const { t } = useTranslation();

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all",    label: t("projects.filterAll") },
    { key: "web",    label: t("projects.filterWeb") },
    { key: "mobile", label: t("projects.filterMobile") },
    { key: "game",   label: t("projects.filterGame") },
    { key: "ar",     label: t("projects.filterAr") },
    { key: "other",  label: t("projects.filterOther") },
  ];

  const visible =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={t("projects.label")}
          title={t("projects.title")}
          subtitle={t("projects.subtitle")}
        />

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={cn(
                "text-xs px-4 py-1.5 rounded-full border transition-all duration-200",
                active === f.key
                  ? "bg-[#6366f1] border-[#6366f1] text-white"
                  : "border-[#2a2a2a] text-[#666] hover:border-[#444] hover:text-[#aaa]"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={ref} className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <Link
                  to={`/projects/${project.id}`}
                  className="group relative bg-[#111] border border-[#1e1e1e] rounded-xl overflow-hidden flex flex-col hover:border-[#2a2a2a] transition-all duration-200 hover:-translate-y-1 block h-full"
                >
                  {/* Project image */}
                  {project.image && (
                    <div className="w-full h-40 bg-[#0d0d0d] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  )}

                  <div className="p-5 flex flex-col flex-1">
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <Sparkles size={13} className="text-[#6366f1] opacity-70" />
                      </div>
                    )}

                    <div className="mb-3">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-md border",
                          typeColors[project.type] ?? "text-[#666] bg-[#1a1a1a] border-[#2a2a2a]"
                        )}
                      >
                        {project.type}
                      </span>
                    </div>

                    <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-[#6366f1] transition-colors flex items-center gap-1.5">
                      {project.name}
                      <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-60 transition-opacity -mt-0.5" />
                    </h3>

                    <p className="text-xs text-[#777] leading-relaxed flex-1 mb-3">
                      {t(`projects.items.${project.descKey}.description`)}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-md bg-[#1a1a1a] text-[#555] border border-[#242424]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
