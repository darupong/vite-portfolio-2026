import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { experiences, personal, projects } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useInView } from "@/hooks/useInView";

const featuredBrands = [
  "Lay's",
  "GAMA Thailand",
  "Kooboon",
  "GSSD Expo",
  "Jaspal",
  "Lazada",
];

export function TrustSignals() {
  const [ref, inView] = useInView(0.08);
  const { t } = useTranslation();
  const featuredProjects = projects.filter((project) => project.featured).length;

  return (
    <section className="section-pad bg-white/[0.025]" aria-labelledby="trust-title">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          label={t("trust.label")}
          title={t("trust.title")}
          subtitle={t("trust.subtitle")}
        />

        <div ref={ref} className="mt-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="glass-card rounded-2xl p-5"
          >
            <p className="mb-5 text-xs font-semibold uppercase text-white/45">{t("trust.metricsLabel")}</p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: `${featuredProjects}+`, label: t("trust.metrics.featured") },
                { value: personal.experienceDuration, label: t("trust.metrics.experience") },
                { value: "4", label: t("trust.metrics.companies") },
              ].map((metric) => (
                <div key={metric.label} className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="mt-1 text-xs leading-snug text-white/50">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="glass-card rounded-2xl p-5"
          >
            <p className="mb-5 text-xs font-semibold uppercase text-white/45">{t("trust.brandsLabel")}</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {featuredBrands.map((brand) => (
                <div key={brand} className="rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3">
                  <p className="text-sm font-semibold text-white/76">{brand}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.14 + index * 0.05 }}
              className="glass-card flex items-center gap-3 rounded-2xl p-4"
            >
              <img
                src={experience.logo}
                alt=""
                width={36}
                height={36}
                loading="lazy"
                decoding="async"
                className="h-9 w-9 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{experience.company}</p>
                <p className="text-xs text-white/42">{experience.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
