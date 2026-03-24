import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { personal } from "@/data/portfolio";
import { useStore } from "@/store/useStore";
import { LangToggle } from "@/components/LangToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { activeSection, mobileMenuOpen, setMobileMenuOpen, lang, setLang } = useStore();
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "about",      label: t("nav.about") },
    { id: "experience", label: t("nav.experience") },
    { id: "projects",   label: t("nav.projects") },
    { id: "skills",     label: t("nav.skills") },
    { id: "contact",    label: t("nav.contact") },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#about"
          className="text-sm font-semibold tracking-wide text-white hover:text-[#6366f1] transition-colors"
        >
          {personal.name.split(" ")[0]}
          <span className="text-[#6366f1]">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "text-sm transition-colors relative",
                  isActive ? "text-white" : "text-[#888888] hover:text-white"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-[#6366f1]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <LangToggle lang={lang} setLang={setLang} />

          <a
            href={`mailto:${personal.email}`}
            className="text-sm px-4 py-2 rounded-lg border border-[#2a2a2a] text-[#f5f5f5] hover:border-[#6366f1] hover:text-[#6366f1] transition-all duration-200"
          >
            {t("header.hireMe")}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} />
          <button
            className="text-[#f5f5f5] hover:text-[#6366f1] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-[#2a2a2a] overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-[#888888] hover:text-white transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`mailto:${personal.email}`}
                className="text-sm text-[#6366f1] pt-2 border-t border-[#2a2a2a]"
              >
                {personal.email}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

