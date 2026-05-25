import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { experiences } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";
import { useInView } from "@/hooks/useInView";

function CompanyLogo({
  logo,
  initials,
  gradient,
  size = 56,
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
        className="absolute inset-0 rounded-full opacity-30 blur-sm"
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
              fontSize={initials.length > 2 ? "13" : "15"}
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
  const [ref, inView] = useInView(0.05);
  const { t } = useTranslation();

  return (
    <section id="experience" className="section-pad">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={t("experience.label")}
          title={t("experience.title")}
          subtitle={t("experience.subtitle")}
        />

        <div ref={ref} className="mt-16 space-y-6">
          {experiences.map((exp, i) => {
            const itemKey = `experience.items.${exp.id}` as const;
            const role = t(`${itemKey}.role`);
            const highlights = t(`${itemKey}.highlights`, { returnObjects: true }) as string[];

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.14, ease: "easeOut" }}
              >
                <div
                  className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 md:p-8"
                  style={{
                    boxShadow: "0 1px 0 0 #1e1e1e",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${exp.logoColor}33`;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 1px ${exp.logoColor}22, 0 8px 32px ${exp.logoColor}0d`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#1e1e1e";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 0 0 #1e1e1e";
                  }}
                >
                  {/* Left accent bar */}
                  <div
                    className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-60"
                    style={{
                      background: `linear-gradient(to bottom, ${exp.logoGradient[0]}, ${exp.logoGradient[1]})`,
                    }}
                  />

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                    <CompanyLogo
                      logo={exp.logo}
                      initials={exp.initials}
                      gradient={exp.logoGradient as [string, string]}
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                        <div>
                          <h3 className="text-base font-semibold text-white group-hover:text-white transition-colors leading-tight">
                            {role}
                          </h3>
                          <p className="text-sm font-medium mt-0.5" style={{ color: exp.logoColor }}>
                            {exp.company}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span
                            className="inline-block whitespace-nowrap rounded-md border bg-white/[0.055] px-2.5 py-1 font-mono text-xs text-white/70"
                            style={{ borderColor: `${exp.logoColor}22` }}
                          >
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-white/42">
                            <MapPin size={10} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="h-px mb-5"
                    style={{
                      background: `linear-gradient(to right, ${exp.logoColor}22, transparent)`,
                    }}
                  />

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-5">
                    {highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.14 + 0.2 + j * 0.07 }}
                        className="flex gap-3 text-sm leading-relaxed text-white/62"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: exp.logoColor, opacity: 0.7 }}
                        />
                        {h}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border bg-white/[0.045] px-2.5 py-1 text-xs text-white/48 transition-colors hover:text-white/80"
                        style={{ borderColor: `${exp.logoColor}22` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
