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
  size = 48,
}: {
  logo?: string;
  initials: string;
  gradient: [string, string];
  size?: number;
}) {
  if (logo) {
    return (
      <div
        className="flex-shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <img
          src={logo}
          alt={initials}
          className="w-full h-full object-contain p-1.5"
        />
      </div>
    );
  }

  const id = `grad-${initials.replace(/[^a-z]/gi, "")}`;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor={gradient[0]} />
          <stop offset="1" stopColor={gradient[1]} />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="12" fill={`url(#${id})`} opacity="0.15" />
      <rect width="48" height="48" rx="12" fill="none" stroke={`url(#${id})`} strokeWidth="1" opacity="0.4" />
      <text
        x="24"
        y="24"
        textAnchor="middle"
        dominantBaseline="central"
        fill={gradient[0]}
        fontSize={initials.length > 2 ? "13" : "15"}
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
}

export function Experience() {
  const [ref, inView] = useInView(0.05);
  const { t } = useTranslation();

  return (
    <section id="experience" className="py-24 px-6">
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
                <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 md:p-8 hover:border-[#2a2a2a] transition-all duration-300 group">
                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                    <div className="flex-shrink-0">
                      <CompanyLogo
                        logo={exp.logo}
                        initials={exp.initials}
                        gradient={exp.logoGradient as [string, string]}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                        <div>
                          <h3 className="text-base font-semibold text-white group-hover:text-[#818cf8] transition-colors leading-tight">
                            {role}
                          </h3>
                          <p className="text-sm font-medium mt-0.5" style={{ color: exp.logoColor }}>
                            {exp.company}
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="inline-block text-xs font-mono px-2.5 py-1 rounded-md bg-[#1a1a1a] border border-[#2a2a2a] text-[#aaa] whitespace-nowrap">
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-[#555]">
                            <MapPin size={10} />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-[#1a1a1a] mb-5" />

                  {/* Highlights */}
                  <ul className="space-y-2.5 mb-5">
                    {highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: i * 0.14 + 0.2 + j * 0.07 }}
                        className="flex gap-3 text-sm text-[#888] leading-relaxed"
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
                        className="text-xs px-2.5 py-1 rounded-lg bg-[#161616] text-[#666] border border-[#232323] hover:text-[#aaa] transition-colors"
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
