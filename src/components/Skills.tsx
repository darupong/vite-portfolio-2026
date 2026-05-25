import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { skills } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";
import { useInView } from "@/hooks/useInView";

export function Skills() {
  const [ref, inView] = useInView(0.1);
  const { t } = useTranslation();

  return (
    <section id="skills" className="section-pad bg-white/[0.025]">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label={t("skills.label")}
          title={t("skills.title")}
          subtitle={t("skills.subtitle")}
        />

        <div
          ref={ref}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.map((group, i) => (
            <motion.div
              key={group.categoryKey}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-5"
            >
              <h3 className="mb-4 text-xs font-semibold uppercase text-accent-secondary">
                {t(`skills.categories.${group.categoryKey}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="cursor-default rounded-lg border border-white/10 bg-white/[0.055] px-3 py-1 text-sm text-white/72 transition-colors hover:border-cyan-300/30 hover:text-white"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
