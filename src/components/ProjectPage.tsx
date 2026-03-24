import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Play,
  CalendarDays,
  Tag,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { LangToggle } from "@/components/LangToggle";
import { personal } from "@/data/portfolio";

// ─── Tech meta ────────────────────────────────────────────────────────────────

const techMeta: Record<string, { color: string; bg: string; label?: string }> = {
  "Next.js":          { color: "#fff",    bg: "#000" },
  "React":            { color: "#61dafb", bg: "#20232a" },
  "React Native":     { color: "#61dafb", bg: "#20232a" },
  "FastAPI":          { color: "#fff",    bg: "#059669" },
  "Python":           { color: "#ffd343", bg: "#3572A5" },
  "ComfyUI":          { color: "#c4b5fd", bg: "#2e1065" },
  "Stable Diffusion": { color: "#e0e7ff", bg: "#4338ca" },
  "NestJS":           { color: "#fff",    bg: "#e0234e" },
  "Node.js":          { color: "#fff",    bg: "#215732" },
  "TypeScript":       { color: "#fff",    bg: "#3178c6" },
  "Tailwind CSS":     { color: "#fff",    bg: "#0ea5e9" },
  "Unity":            { color: "#fff",    bg: "#222" },
  "WordPress":        { color: "#fff",    bg: "#21759b" },
  "VirtualTour":      { color: "#fff",    bg: "#92400e" },
  "PlayCanvas":       { color: "#fff",    bg: "#b91c1c" },
  "PostgreSQL":       { color: "#fff",    bg: "#336791" },
  "MongoDB":          { color: "#fff",    bg: "#13aa52" },
  "Stripe":           { color: "#fff",    bg: "#635bff" },
  "WebGL":            { color: "#fff",    bg: "#990000" },
  "Three.js":         { color: "#fff",    bg: "#333" },
  "C#":               { color: "#fff",    bg: "#512bd4" },
  "Spark AR":         { color: "#fff",    bg: "#0866ff" },
  "Photon":           { color: "#fff",    bg: "#0d6efd" },
  "Animation":        { color: "#fff",    bg: "#555" },
  "2D":               { color: "#fff",    bg: "#444" },
  "Ant Design":       { color: "#fff",    bg: "#1677ff" },
};

function TechBadge({ name }: { name: string }) {
  const meta = techMeta[name];
  if (meta) {
    return (
      <span
        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
        style={{ color: meta.color, backgroundColor: meta.bg }}
      >
        {name}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#1e1e1e] text-[#ccc] border border-[#2a2a2a]">
      {name}
    </span>
  );
}

const typeColors: Record<string, string> = {
  "AI / Web App": "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "AI Campaign":  "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "Web Platform": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Mobile App":   "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "3D / VR":      "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Web / Game":   "text-rose-400 bg-rose-400/10 border-rose-400/20",
  "Unity Game":   "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "AR Filter":    "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20",
  "Creative":     "text-orange-400 bg-orange-400/10 border-orange-400/20",
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang, setLang } = useStore();

  const project = projects.find((p) => p.id === id);
  const others = project
    ? projects.filter((p) => p.id !== id && p.category === project.category).slice(0, 3)
    : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4 text-[#666]">
        <p className="text-lg">Project not found</p>
        <Link to="/" className="text-[#6366f1] hover:underline text-sm">← Back to portfolio</Link>
      </div>
    );
  }

  const description = t(`projects.items.${project.descKey}.description`);
  const detail      = t(`projects.items.${project.descKey}.detail`);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5]">

      {/* ── Top bar ── */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1e1e1e]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-[#666] hover:text-white transition-colors"
          >
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">{t("projects.backToProjects")}</span>
          </button>

          <Link
            to="/"
            className="text-sm font-semibold tracking-wide text-white hover:text-[#6366f1] transition-colors"
          >
            {personal.name.split(" ")[0]}<span className="text-[#6366f1]">.</span>
          </Link>

          <div className="flex items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} />
          </div>
        </div>
      </header>

      {/* ── Hero image ── */}
      {project.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-[40vh] md:h-[55vh] bg-[#0d0d0d] overflow-hidden"
        >
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      {/* ── Article body ── */}
      <article className="max-w-3xl mx-auto px-6 py-12">

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-wrap items-center gap-3 mb-6 text-xs text-[#555]"
        >
          <span className={cn("px-2.5 py-1 rounded-md border font-medium", typeColors[project.type] ?? "text-[#666] bg-[#1a1a1a] border-[#2a2a2a]")}>
            <Tag size={10} className="inline mr-1 -mt-0.5" />
            {project.type}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays size={11} />
            {personal.name}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-5"
        >
          {project.name}
        </motion.h1>

        {/* Lead paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-lg text-[#999] leading-relaxed mb-10 font-light"
        >
          {description}
        </motion.p>

        {/* ── Info cards row ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12 not-prose"
        >
          {/* Built with */}
          <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
            <p className="text-xs text-[#555] uppercase tracking-widest font-semibold mb-4">
              {t("projects.builtWith")}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
            <p className="text-xs text-[#555] uppercase tracking-widest font-semibold mb-4">
              {t("projects.links")}
            </p>
            <div className="flex flex-col gap-2">
              {"link" in project && project.link && (
                <a
                  href={project.link as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white bg-[#6366f1] hover:bg-[#818cf8] transition-colors px-4 py-2.5 rounded-xl font-medium"
                >
                  <ExternalLink size={14} />
                  {t("projects.viewWebsite")}
                </a>
              )}
              {"youtubeId" in project && project.youtubeId && (
                <a
                  href={`https://youtu.be/${project.youtubeId as string}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white bg-[#dc2626] hover:bg-[#ef4444] transition-colors px-4 py-2.5 rounded-xl font-medium"
                >
                  <Play size={14} />
                  {t("projects.watchDemo")}
                </a>
              )}
              {"appStoreUrl" in project && project.appStoreUrl && (
                <a
                  href={project.appStoreUrl as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#444] transition-colors px-4 py-2.5 rounded-xl"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </a>
              )}
              {"playStoreUrl" in project && project.playStoreUrl && (
                <a
                  href={project.playStoreUrl as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white bg-[#1a1a1a] border border-[#2a2a2a] hover:border-[#444] transition-colors px-4 py-2.5 rounded-xl"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.2.12.43.18.65.18.27 0 .53-.08.76-.23l11.65-6.73-2.6-2.6-10.46 9.38zm-1.6-20.62C1.22 3.55 1 4 1 4.56v14.88c0 .56.22 1.01.58 1.28l.08.06 8.34-8.34v-.2L1.58 3.08zm16.54 6.36l-2.93-1.69-2.93 1.69 2.93 2.93zm-2.93 4.31L5.54 20.5l2.6 2.6 12.03-6.95c.68-.4 1.03-.92 1.03-1.44 0-.52-.36-1.03-1.01-1.43z"/></svg>
                  Google Play
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="h-px bg-[#1e1e1e] mb-12" />

        {/* ── Article body ── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
          className="space-y-6 mb-12"
        >
          <h2 className="text-lg font-semibold text-white">
            {t("projects.aboutProject")}
          </h2>
          <p className="text-[#999] leading-[1.85] text-base">
            {detail}
          </p>
        </motion.section>

        {/* ── YouTube video ── */}
        {"youtubeId" in project && project.youtubeId && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
            className="mb-12"
          >
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Play size={16} className="text-[#dc2626]" />
              {t("projects.watchDemo")}
            </h2>
            <div className="rounded-2xl overflow-hidden bg-black aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${project.youtubeId as string}`}
                title={`${project.name} demo`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.section>
        )}

        {/* ── Divider ── */}
        <div className="h-px bg-[#1e1e1e] mb-12" />

        {/* ── Other projects ── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-white mb-6">
            {t("projects.otherProjects")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {others.map((p) => (
              <Link
                key={p.id}
                to={`/projects/${p.id}`}
                className="group bg-[#111] border border-[#1e1e1e] rounded-xl overflow-hidden hover:border-[#2a2a2a] transition-all hover:-translate-y-0.5 duration-200"
              >
                {p.image && (
                  <div className="w-full h-28 bg-[#0d0d0d] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                )}
                <div className="p-3">
                  <p className="text-xs font-semibold text-white group-hover:text-[#6366f1] transition-colors leading-snug mb-1">
                    {p.name}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {p.tech.slice(0, 2).map((tech) => (
                      <span key={tech} className="text-[10px] text-[#555] bg-[#1a1a1a] px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* ── Back link ── */}
        <div className="mt-16 pb-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-[#555] hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            {t("projects.backToProjects")}
          </button>
        </div>
      </article>
    </div>
  );
}
