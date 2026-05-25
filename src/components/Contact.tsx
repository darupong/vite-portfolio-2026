import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Mail, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { personal } from "@/data/portfolio";
import { useInView } from "@/hooks/useInView";

export function Contact() {
  const [ref, inView] = useInView(0.1);
  const { t } = useTranslation();

  return (
    <section id="contact" className="section-pad bg-white/[0.025]">
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
            className="glass-panel relative mx-auto max-w-2xl rounded-3xl p-8 text-center md:p-14"
          >
            <p className="mb-4 text-xs font-semibold uppercase text-accent-secondary">
              {t("contact.label")}
            </p>
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              {t("contact.title")}
            </h2>
            <p className="mb-10 text-base leading-relaxed text-white/60">
              {t("contact.subtitle")}
            </p>

            <div className="mb-8 grid gap-3 text-left sm:grid-cols-3">
              {[
                { label: t("contact.availabilityLabel"), value: t("contact.availabilityValue") },
                { label: t("contact.rolesLabel"), value: t("contact.rolesValue") },
                { label: t("contact.responseLabel"), value: t("contact.responseValue") },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                  <p className="mb-1 text-xs font-semibold uppercase text-white/35">{item.label}</p>
                  <p className="text-sm leading-relaxed text-white/70">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${personal.email}`}
                className="group inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#080a11] transition-transform hover:-translate-y-0.5"
              >
                <Mail size={16} />
                {personal.email}
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="https://github.com/darupong"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-control inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/12"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href="/Darupong-Chouypu-CV.pdf"
                download
                className="glass-control inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/12"
              >
                <Download size={16} />
                {t("contact.cv")}
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/45">
              <MapPin size={13} />
              {t("contact.location")}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
