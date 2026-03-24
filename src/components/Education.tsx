import { motion } from "framer-motion";
import { GraduationCap, Languages } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "./SectionHeader";
import { useInView } from "@/hooks/useInView";

export function Education() {
  const [ref, inView] = useInView(0.08);
  const { t } = useTranslation();

  const eduItems = t("education.items", { returnObjects: true }) as Array<{
    institution: string;
    degree: string;
    field: string;
    period: string;
    highlights: string[];
  }>;

  const certs = t("education.certifications", { returnObjects: true }) as Array<{
    name: string;
    framework: string;
    issuer: string;
    description: string;
    year: string;
  }>;

  return (
    <section id="education" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={t("education.label")}
          title={t("education.title")}
          subtitle={t("education.subtitle")}
        />

        <div ref={ref} className="mt-16 space-y-12">
          {/* Degrees */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                <GraduationCap size={18} className="text-[#6366f1]" />
              </div>
              <div>
                <p className="text-xs text-[#555] uppercase tracking-widest font-semibold">
                  {t("education.universityLabel")}
                </p>
                <h3 className="text-sm font-semibold text-[#ccc]">
                  {t("education.universityName")}
                </h3>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:pl-14">
              {eduItems.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: "easeOut" }}
                  className="relative bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 overflow-hidden group hover:border-[#2a2a2a] transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at top left, rgba(99,102,241,0.06), transparent 60%)" }}
                  />

                  <div className="flex items-start justify-between gap-2 mb-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-[#1a1a1a] border border-[#2a2a2a] text-[#6366f1]">
                      {edu.period}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#6366f1]/10 text-[#818cf8] border border-[#6366f1]/20">
                      {edu.degree.split(" ")[0] === "Master" || edu.degree === "วิทยาศาสตรมหาบัณฑิต" ? "MSc" : "BSc"}
                    </span>
                  </div>

                  <h4 className="text-base font-semibold text-white mb-1 leading-snug">
                    {edu.degree}
                  </h4>
                  <p className="text-sm text-[#6366f1] font-medium mb-4">{edu.field}</p>

                  <ul className="space-y-1.5">
                    {edu.highlights.map((h, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -8 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.35, delay: 0.25 + i * 0.12 + j * 0.07 }}
                        className="flex items-start gap-2 text-xs text-[#666] leading-relaxed"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#444] flex-shrink-0" />
                        {h}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.35 + i * 0.12 }}
                    style={{ originX: 0 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#6366f1] to-transparent rounded-b-2xl"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                <Languages size={18} className="text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-[#555] uppercase tracking-widest font-semibold">
                  {t("education.certsLabel")}
                </p>
                <h3 className="text-sm font-semibold text-[#ccc]">
                  {t("education.certsTitle")}
                </h3>
              </div>
            </motion.div>

            <div className="md:pl-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {certs.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.45, delay: 0.42 + i * 0.1 }}
                  className="relative bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 overflow-hidden group hover:border-[#2a2a2a] transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at top left, rgba(251,191,36,0.05), transparent 60%)" }}
                  />

                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-[#555]">{cert.year}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-400/10 text-amber-400 border border-amber-400/20">
                      {cert.framework}
                    </span>
                  </div>

                  <p className="text-base font-bold text-white mb-1">{cert.name}</p>
                  <p className="text-xs text-[#777] leading-relaxed">{cert.description}</p>
                  <p className="text-xs text-[#555] mt-2">{cert.issuer}</p>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.55 + i * 0.1 }}
                    style={{ originX: 0 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 to-transparent rounded-b-2xl"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
