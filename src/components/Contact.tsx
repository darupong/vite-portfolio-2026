import { motion } from "framer-motion";
import { Mail, MapPin, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { personal } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

export function Contact() {
  const [ref, inView] = useInView(0.1);
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 px-6 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto">
        <div ref={ref} className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <div
              className="w-[500px] h-[300px] rounded-full opacity-30"
              style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative bg-[#111] border border-[#1e1e1e] rounded-2xl p-10 md:p-16 text-center max-w-2xl mx-auto"
          >
            <p className="text-xs font-semibold text-[#6366f1] uppercase tracking-widest mb-4">
              {t("contact.label")}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-[#777] text-base mb-10 leading-relaxed">
              {t("contact.subtitle")}
            </p>

            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#6366f1] text-white font-medium text-sm hover:bg-[#818cf8] transition-colors group"
            >
              <Mail size={16} />
              {personal.email}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#555]">
              <MapPin size={13} />
              {t("contact.location")}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
