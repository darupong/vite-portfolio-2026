import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase, Award } from "lucide-react";
import { useTranslation } from "react-i18next";
import { experiences } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";

function CompanyLogo({
  logo,
  initials,
  gradient,
  size = 50,
}: {
  logo?: string;
  initials: string;
  gradient: [string, string];
  size?: number;
}) {
  const id = `grad-${initials.replace(/[^a-z]/gi, "")}`;

  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-full opacity-35 blur-sm"
        style={{
          background: `conic-gradient(from 0deg, ${gradient[0]}, ${gradient[1]}, ${gradient[0]})`,
        }}
      />
      {/* Outer gradient border */}
      <div
        className="absolute inset-0 rounded-full p-[1.5px]"
        style={{
          background: `linear-gradient(135deg, ${gradient[0]}88, ${gradient[1]}44, ${gradient[0]}22)`,
        }}
      >
        <div className="w-full h-full rounded-full bg-[#111]" />
      </div>

      {/* Logo content */}
      <div className="absolute inset-[2px] rounded-full overflow-hidden bg-[#0e0e0e] flex items-center justify-center">
        {logo ? (
          <img
            src={logo}
            alt={initials}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg width={size - 8} height={size - 8} viewBox="0 0 48 48" fill="none">
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop stopColor={gradient[0]} />
                <stop offset="1" stopColor={gradient[1]} />
              </linearGradient>
            </defs>
            <text
              x="24"
              y="24"
              textAnchor="middle"
              dominantBaseline="central"
              fill={`url(#${id})`}
              fontSize={initials.length > 2 ? "12" : "14"}
              fontWeight="700"
              fontFamily="system-ui, sans-serif"
            >
              {initials}
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}

export function Experience() {
  const [ref, inView] = useInView(0.02);
  const { t } = useTranslation();

  return (
    <section id="experience" className="section-pad relative overflow-hidden">
      {/* Decorative vertical grid glow behind */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[35rem] h-[35rem] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none select-none" />

      <div className="max-w-6xl mx-auto px-4">
        <SectionHeader
          label={t("experience.label")}
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
        />

        {/* Career Timeline Area */}
        <div ref={ref} className="mt-20 relative">
          
          {/* Central Vertical Neon progress axis track (Desktop) */}
          <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/5 pointer-events-none">
            <motion.div
              initial={{ height: "0%" }}
              animate={inView ? { height: "100%" } : { height: "0%" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-cyan-400 via-purple-500 to-emerald-400 shadow-[0_0_8px_rgba(34,211,238,0.5)] rounded-full"
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const itemKey = `experience.items.${exp.id}` as const;
              const role = t(`${itemKey}.role`);
              const highlights = t(`${itemKey}.highlights`, { returnObjects: true }) as string[];

              const isEven = i % 2 === 0;

              // Customize company impact highlights (dynamic callouts)
              const impactLabels: Record<string, string> = {
                imai: "🚀 AI & Product Orchestration",
                vr: "🌌 Stable Diffusion Architectures",
                pirsquare: "⚡ High-Performance Next.js UIs",
                viz: "🎮 Interactive Unity & WebGL Spaces",
              };

              return (
                <div
                  key={exp.id}
                  className={`flex flex-col lg:flex-row items-stretch justify-start lg:justify-between relative ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Neon node timeline dot */}
                  <div className="absolute left-[25px] lg:left-1/2 lg:-translate-x-1/2 top-6 z-20">
                    <div className="relative flex items-center justify-center">
                      <div
                        className="absolute h-8 w-8 rounded-full opacity-20 animate-ping"
                        style={{ backgroundColor: exp.logoColor }}
                      />
                      <div
                        className="h-4 w-4 rounded-full border-2 border-background z-10 transition-transform duration-300 scale-100 group-hover:scale-125"
                        style={{ backgroundColor: exp.logoColor, boxShadow: `0 0 10px ${exp.logoColor}` }}
                      />
                    </div>
                  </div>

                  {/* Left / Right alternating glassmorphic card */}
                  <div className="w-full lg:w-[46%] pl-16 lg:pl-0">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 36 : -36, y: 15 }}
                      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                      transition={{ duration: 0.65, delay: i * 0.16, ease: "easeOut" }}
                      className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] bg-black/20"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = `${exp.logoColor}35`;
                        e.currentTarget.style.boxShadow = `0 0 15px ${exp.logoColor}18, inset 0 0 20px ${exp.logoColor}08`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Left glowing neon border bar */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-[4px]"
                        style={{
                          background: `linear-gradient(to bottom, ${exp.logoGradient[0]}, ${exp.logoGradient[1]})`,
                        }}
                      />

                      {/* Header Row */}
                      <div className="flex items-start gap-4">
                        <CompanyLogo
                          logo={exp.logo}
                          initials={exp.initials}
                          gradient={exp.logoGradient as [string, string]}
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold text-white group-hover:text-white leading-tight transition-colors">
                            {role}
                          </h3>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-xs font-semibold" style={{ color: exp.logoColor }}>
                              {exp.company}
                            </span>
                            <span className="text-white/20 text-xs">•</span>
                            <span className="text-[10px] text-white/40 font-mono inline-flex items-center gap-1">
                              <MapPin size={9} />
                              {exp.location.split(",")[0]}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Period Badge / Info Row */}
                      <div className="flex items-center gap-4 mt-4 bg-white/[0.02] border border-white/5 rounded-xl px-3 py-2">
                        <span className="text-[10px] font-mono font-bold text-white/60 inline-flex items-center gap-1">
                          <Calendar size={11} className="text-white/30" />
                          {exp.period}
                        </span>
                        <span className="h-3 w-[1px] bg-white/10" />
                        <span className="text-[10px] font-mono font-bold inline-flex items-center gap-1" style={{ color: exp.logoColor }}>
                          <Briefcase size={11} className="opacity-70" />
                          Full-Time
                        </span>
                      </div>

                      {/* Divider line */}
                      <div
                        className="h-[1px] my-4"
                        style={{
                          background: `linear-gradient(to right, ${exp.logoColor}25, transparent)`,
                        }}
                      />

                      {/* Corporate Impact Callout Box */}
                      <div
                        className="mb-4 p-2.5 rounded-xl border text-[11px] font-mono font-bold bg-white/[0.02] flex items-center gap-2"
                        style={{ borderColor: `${exp.logoColor}15`, color: exp.logoColor }}
                      >
                        <Award size={12} className="shrink-0" />
                        <span>{impactLabels[exp.id] || "Professional Achievement"}</span>
                      </div>

                      {/* Detailed Bullet Achievements */}
                      <ul className="space-y-2 mb-5">
                        {highlights.map((h, j) => (
                          <li
                            key={j}
                            className="flex gap-2.5 text-xs sm:text-sm leading-relaxed text-white/60"
                          >
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: exp.logoColor, opacity: 0.65 }}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Tags Container */}
                      <div className="flex flex-wrap gap-1.5 border-t border-white/5 pt-4">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border bg-white/[0.03] px-2.5 py-1 text-[10px] font-mono text-white/40 transition-all hover:text-white hover:bg-white/10 select-none cursor-pointer"
                            style={{ borderColor: "rgba(255,255,255,0.05)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = `${exp.logoColor}35`;
                              e.currentTarget.style.color = exp.logoColor;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                              e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Empty spacer block to maintain alternating layout balance on desktop */}
                  <div className="hidden lg:block lg:w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
