import { motion } from "framer-motion";
import { ExternalLink, FileText, GraduationCap, Languages } from "lucide-react";
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
    <section id="education" className="section-pad">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={t("education.label")}
          title={t("education.title")}
          subtitle={t("education.subtitle")}
        />

        <div ref={ref} className="mt-14 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-6 md:p-8"
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="glass-control flex h-11 w-11 items-center justify-center rounded-xl">
                <GraduationCap size={19} className="text-accent-secondary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-white/42">{t("education.universityLabel")}</p>
                <h3 className="text-base font-semibold text-white">{t("education.universityName")}</h3>
              </div>
            </div>

            <div className="relative space-y-8">
              <div className="absolute bottom-3 left-[0.62rem] top-3 w-px bg-gradient-to-b from-cyan-300/50 via-white/12 to-transparent" />
              {eduItems.map((edu, index) => {
                const isMaster =
                  edu.degree.split(" ")[0] === "Master" ||
                  edu.degree === "วิทยาศาสตรมหาบัณฑิต" ||
                  edu.degree === "信息科学硕士";

                return (
                  <motion.article
                    key={edu.period}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.12 + index * 0.12 }}
                    className="relative pl-10"
                  >
                    <span className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full border border-cyan-300/30 bg-[#0b0d14]">
                      <span className="h-2 w-2 rounded-full bg-cyan-300" />
                    </span>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded-lg border border-white/10 bg-white/[0.055] px-2.5 py-1 font-mono text-xs text-accent-secondary">
                          {edu.period}
                        </span>
                        <span className="degree-badge rounded-md border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-xs font-semibold text-cyan-100">
                          {isMaster ? "MSc" : "BSc"}
                        </span>
                      </div>

                      <h4 className="text-lg font-semibold leading-tight text-white">{edu.degree}</h4>
                      <p className="mt-1 text-sm font-medium text-accent-secondary">{edu.field}</p>
                      <p className="mt-1 text-xs text-white/42">{edu.institution}</p>

                      <ul className="mt-5 space-y-2">
                        {edu.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-white/56">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/35" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </motion.div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="glass-card rounded-3xl p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="glass-control flex h-10 w-10 items-center justify-center rounded-xl">
                  <Languages size={18} className="theme-amber-text text-amber-300" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-white/42">{t("education.certsLabel")}</p>
                  <h3 className="text-sm font-semibold text-white">{t("education.certsTitle")}</h3>
                </div>
              </div>

              <div className="space-y-3">
                {certs.map((cert) => (
                  <div key={cert.name} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <span className="font-mono text-xs text-white/42">{cert.year}</span>
                      <span className="cert-badge rounded-md border border-amber-300/20 bg-amber-300/10 px-2 py-0.5 text-xs font-bold text-amber-200">
                        {cert.framework}
                      </span>
                    </div>
                    <p className="text-base font-bold text-white">{cert.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/56">{cert.description}</p>
                    <p className="mt-2 text-xs text-white/42">{cert.issuer}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.28 }}
              className="glass-card rounded-3xl p-6"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="glass-control flex h-10 w-10 items-center justify-center rounded-xl">
                  <FileText size={18} className="text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-white/42">{t("education.publicationLabel")}</p>
                  <h3 className="text-sm font-semibold text-white">{t("education.publicationTitle")}</h3>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <p className="text-sm font-semibold leading-snug text-white">
                  {t("education.publication.name")}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  {t("education.publication.journal")}
                </p>
                <div className="tier-badge mt-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 p-4">
                  <p className="theme-amber-text text-xs font-semibold uppercase text-amber-100">
                    {t("education.publication.tierLabel")}
                  </p>
                  <p className="mt-1 text-2xl font-bold text-white">
                    {t("education.publication.tier")}
                  </p>
                  <p className="mt-1 text-xs text-white/58">
                    {t("education.publication.issue")}
                  </p>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
                    <p className="mb-1 uppercase text-white/35">{t("education.publication.modelLabel")}</p>
                    <p className="text-white/68">SEM / CFA</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.045] p-3">
                    <p className="mb-1 uppercase text-white/35">{t("education.publication.resultLabel")}</p>
                    <p className="text-white/68">R2 = 0.88</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-white/52">
                  {t("education.publication.summary")}
                </p>
                <a
                  href="https://so04.tci-thaijo.org/index.php/jmhs1_s/article/view/278925"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent-secondary transition-colors hover:text-white"
                >
                  {t("education.publication.viewArticle")}
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
