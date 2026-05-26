import { useEffect, useMemo, useState, useRef, ReactNode, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Layers, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projectCaseStudies, projects, type ProjectCategory } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

const typeColors: Record<string, string> = {
  "AI / Web App": "text-violet-300 bg-violet-300/10 border-violet-300/20",
  "AI Campaign": "text-pink-300 bg-pink-300/10 border-pink-300/20",
  "Web Platform": "text-blue-300 bg-blue-300/10 border-blue-300/20",
  "Mobile App": "text-emerald-300 bg-emerald-300/10 border-emerald-300/20",
  "3D / VR": "text-amber-300 bg-amber-300/10 border-amber-300/20",
  "Web / Game": "text-rose-300 bg-rose-300/10 border-rose-300/20",
  "Unity Game": "text-cyan-300 bg-cyan-300/10 border-cyan-300/20",
  "AR Filter": "text-fuchsia-300 bg-fuchsia-300/10 border-fuchsia-300/20",
  "Creative": "text-orange-300 bg-orange-300/10 border-orange-300/20",
};

type FilterKey = "all" | ProjectCategory;
type TechFilter = "all" | string;

const archiveInitialCount = 9;
const archivePageSize = 6;

function ProjectSkeleton({ featured = false }: { featured?: boolean }) {
  return (
    <div className={cn("glass-card overflow-hidden rounded-2xl", featured ? "min-h-[26rem]" : "min-h-[20rem]")}>
      <div className={cn("animate-pulse bg-white/[0.07]", featured ? "h-56" : "h-40")} />
      <div className="space-y-3 p-5">
        <div className="h-4 w-24 animate-pulse rounded bg-white/[0.08]" />
        <div className="h-5 w-2/3 animate-pulse rounded bg-white/[0.08]" />
        <div className="h-3 w-full animate-pulse rounded bg-white/[0.07]" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-white/[0.07]" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-16 animate-pulse rounded bg-white/[0.08]" />
          <div className="h-5 w-20 animate-pulse rounded bg-white/[0.08]" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  to,
  ariaLabel,
  children,
}: {
  to: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [spotlightX, setSpotlightX] = useState(50);
  const [spotlightY, setSpotlightY] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rX = -(y - yc) / 14; // Max 12 deg
    const rY = (x - xc) / 20;  // Max 18 deg

    setRotateX(rX);
    setRotateY(rY);
    setSpotlightX((x / rect.width) * 100);
    setSpotlightY((y / rect.height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Link
      ref={cardRef}
      to={to}
      aria-label={ariaLabel}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
      }}
      className="glass-card group relative flex h-full flex-col overflow-hidden rounded-2xl shadow-lg border border-white/10"
    >
      {/* Glossy radial light reflection spotlight layer */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: `radial-gradient(circle 220px at ${spotlightX}% ${spotlightY}%, rgba(255, 255, 255, 0.085), transparent 75%)`,
          mixBlendMode: "overlay",
        }}
      />
      {children}
    </Link>
  );
}

export function Projects() {
  const [ref, inView] = useInView(0.05);
  const [active, setActive] = useState<FilterKey>("all");
  const [techFilter, setTechFilter] = useState<TechFilter>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [visibleArchiveCount, setVisibleArchiveCount] = useState(archiveInitialCount);
  const { t } = useTranslation();

  const filters: { key: FilterKey; label: string }[] = [
    { key: "all", label: t("projects.filterAll") },
    { key: "web", label: t("projects.filterWeb") },
    { key: "mobile", label: t("projects.filterMobile") },
    { key: "game", label: t("projects.filterGame") },
    { key: "ar", label: t("projects.filterAr") },
    { key: "other", label: t("projects.filterOther") },
  ];

  const techOptions = useMemo(() => {
    const priority = ["Next.js", "FastAPI", "React", "Stable Diffusion", "ComfyUI", "Unity", "Spark AR"];
    const allTech = Array.from(new Set(projects.flatMap((project) => project.tech)));
    return priority.filter((tech) => allTech.includes(tech));
  }, []);

  const filtered = useMemo(
    () =>
      projects.filter((project) => {
        const categoryMatch = active === "all" || project.category === active;
        const techMatch = techFilter === "all" || project.tech.includes(techFilter);
        return categoryMatch && techMatch;
      }),
    [active, techFilter]
  );

  const featured = filtered.filter((project) => project.featured).slice(0, 4);
  const archive = filtered.filter((project) => !featured.some((item) => item.id === project.id));
  const visibleArchive = archive.slice(0, visibleArchiveCount);
  const hasMore = visibleArchiveCount < archive.length;

  const filterCounts = useMemo(
    () =>
      filters.reduce<Record<FilterKey, number>>((acc, filter) => {
        acc[filter.key] =
          filter.key === "all" ? projects.length : projects.filter((project) => project.category === filter.key).length;
        return acc;
      }, {} as Record<FilterKey, number>),
    [filters]
  );

  const updateCategory = (key: FilterKey) => {
    setActive(key);
    setVisibleArchiveCount(archiveInitialCount);
    setIsLoading(true);
  };

  const updateTech = (tech: TechFilter) => {
    setTechFilter(tech);
    setVisibleArchiveCount(archiveInitialCount);
    setIsLoading(true);
  };

  const showMore = () => {
    setIsLoading(true);
    window.setTimeout(() => {
      setVisibleArchiveCount((count) => count + archivePageSize);
      setIsLoading(false);
    }, 420);
  };

  useEffect(() => {
    if (!isLoading) return;
    const timer = window.setTimeout(() => setIsLoading(false), 360);
    return () => window.clearTimeout(timer);
  }, [isLoading, active, techFilter]);

  return (
    <section id="projects" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeader label={t("projects.label")} title={t("projects.title")} subtitle={t("projects.subtitle")} />

        <div className="mt-10 space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => updateCategory(filter.key)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-xs transition-all duration-200",
                  active === filter.key
                    ? "border-white/20 bg-white text-[#080a11]"
                    : "glass-control text-white/58 hover:bg-white/10 hover:text-white"
                )}
              >
                {filter.label} <span className="ml-1 opacity-55">{filterCounts[filter.key]}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-white/42">
              <Layers size={13} />
              Tech Stack
            </span>
            {(["all", ...techOptions] as TechFilter[]).map((tech) => (
              <button
                key={tech}
                onClick={() => updateTech(tech)}
                className={cn(
                  "rounded-md border px-2.5 py-1 text-xs transition-colors",
                  techFilter === tech
                    ? "border-cyan-300/30 bg-cyan-300/12 text-cyan-100"
                    : "border-white/10 bg-white/[0.045] text-white/48 hover:text-white"
                )}
              >
                {tech === "all" ? t("projects.filterAll") : tech}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase text-accent-secondary">{t("projects.featuredTitle")}</p>
            <h3 className="mt-2 text-2xl font-bold text-white">{t("projects.featuredSubtitle")}</h3>
          </div>
        </div>

        <div ref={ref} className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {isLoading
              ? [0, 1, 2, 3].map((item) => <ProjectSkeleton key={item} featured />)
              : featured.map((project, index) => (
                  <motion.article
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                  >
                    <ProjectCard
                      to={`/projects/${project.id}`}
                      ariaLabel={`${t("projects.viewProject")}: ${project.name}`}
                    >
                      {project.image && (
                        <div className="h-56 w-full overflow-hidden bg-white/[0.04]">
                          <img
                            src={project.image}
                            alt={project.name}
                            width={672}
                            height={224}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={index === 0 ? "high" : "auto"}
                            className="h-full w-full object-cover opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                          />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span
                            className={cn(
                              "rounded-md border px-2 py-0.5 text-xs",
                              typeColors[project.type] ?? "border-white/10 bg-white/[0.055] text-white/50"
                            )}
                          >
                            {project.type}
                          </span>
                          <Sparkles size={14} className="text-accent-secondary" />
                        </div>

                        <h4 className="mb-3 flex items-center gap-2 text-xl font-semibold text-white transition-colors group-hover:text-accent-secondary">
                          {project.name}
                          <ArrowUpRight size={16} className="opacity-0 transition-opacity group-hover:opacity-70" />
                        </h4>
                        <p className="mb-5 flex-1 text-sm leading-relaxed text-white/58">
                          {t(`projects.items.${project.descKey}.description`)}
                        </p>

                        <div className="mb-5 grid grid-cols-2 gap-2 text-xs">
                          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                            <p className="mb-1 uppercase text-white/35">{t("projects.roleLabel")}</p>
                            <p className="text-white/70">
                              {projectCaseStudies[project.id]?.role ?? t("projects.roleMock")}
                            </p>
                          </div>
                          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                            <p className="mb-1 uppercase text-white/35">{t("projects.impactLabel")}</p>
                            <p className="text-white/70">
                              {projectCaseStudies[project.id]?.impact ?? t("projects.impactMock")}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-md border border-white/10 bg-white/[0.055] px-2 py-0.5 text-xs text-white/50"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </ProjectCard>
                  </motion.article>
                ))}
          </AnimatePresence>
        </div>

        <div className="mt-14">
          <p className="text-xs font-semibold uppercase text-accent-secondary">{t("projects.archiveTitle")}</p>
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {isLoading
                ? [0, 1, 2, 3, 4, 5].map((item) => <ProjectSkeleton key={item} />)
                : visibleArchive.map((project, index) => (
                    <motion.article
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <ProjectCard
                        to={`/projects/${project.id}`}
                        ariaLabel={`${t("projects.viewProject")}: ${project.name}`}
                      >
                        {project.image && (
                          <div className="h-40 w-full overflow-hidden bg-white/[0.04]">
                            <img
                              src={project.image}
                              alt={project.name}
                              width={416}
                              height={160}
                              loading="lazy"
                              decoding="async"
                              className="h-full w-full object-cover opacity-85 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                            />
                          </div>
                        )}

                        <div className="flex flex-1 flex-col p-5">
                          <div className="mb-3">
                            <span
                              className={cn(
                                "rounded-md border px-2 py-0.5 text-xs",
                                typeColors[project.type] ?? "border-white/10 bg-white/[0.055] text-white/50"
                              )}
                            >
                              {project.type}
                            </span>
                          </div>

                          <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-accent-secondary">
                            {project.name}
                            <ArrowUpRight size={13} className="opacity-0 transition-opacity group-hover:opacity-60" />
                          </h4>

                          <p className="mb-3 flex-1 text-xs leading-relaxed text-white/55">
                            {t(`projects.items.${project.descKey}.description`)}
                          </p>

                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="rounded-md border border-white/10 bg-white/[0.055] px-2 py-0.5 text-xs text-white/50"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </ProjectCard>
                    </motion.article>
                  ))}
            </AnimatePresence>
          </div>

          {hasMore && !isLoading && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={showMore}
                className="glass-control rounded-xl px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/12"
              >
                {t("projects.showMore", { count: Math.min(archivePageSize, archive.length - visibleArchiveCount) })}
              </button>
            </div>
          )}

          {hasMore && isLoading && (
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((item) => (
                <ProjectSkeleton key={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
