import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { skills } from "@/data/portfolio";
import { SectionHeader } from "./SectionHeader";
import { useInView } from "@/hooks/useInView";

export function Skills() {
  const [ref, inView] = useInView(0.1);
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 px-6 bg-[#0d0d0d]">
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
              className="bg-[#111] border border-[#1e1e1e] rounded-xl p-5"
            >
              <h3 className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest mb-4">
                {t(`skills.categories.${group.categoryKey}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1 rounded-lg bg-[#1a1a1a] text-[#ccc] border border-[#222] hover:border-[#6366f1]/40 hover:text-white transition-colors cursor-default"
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
