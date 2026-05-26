import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { personal } from "@/data/portfolio";
import { useStore } from "@/store/useStore";
import { LangToggle } from "@/components/LangToggle";
import { ThemeControls } from "@/components/ThemeControls";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const {
    activeSection,
    mobileMenuOpen,
    setMobileMenuOpen,
    lang,
    setLang,
    themeMode,
    themePreset,
    accent,
    terminalThemeMode,
    accessibleMode,
    soundEnabled,
    setThemeMode,
    setThemePreset,
    setAccent,
    setTerminalThemeMode,
    toggleAccessibleMode,
    toggleThemeMode,
    toggleSoundEnabled,
  } = useStore();
  const { t } = useTranslation();
  const resolvedTheme =
    themeMode === "system" && typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"
      : themeMode === "light"
        ? "light"
        : "dark";

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
          ? "border-b border-white/10 bg-[#07080d]/76 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#about"
          className="text-sm font-semibold text-white transition-colors hover:text-accent-secondary"
        >
          {personal.name.split(" ")[0]}
          <span className="text-accent-secondary">.</span>
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
                  isActive ? "text-white" : "text-white/52 hover:text-white"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent-secondary"
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
          
          {/* Sound toggle */}
          <button
            type="button"
            onClick={toggleSoundEnabled}
            className="glass-control inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/12 hover:text-white"
            aria-label={soundEnabled ? "Mute sound effects" : "Unmute sound effects"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <ThemeControls
            themeMode={themeMode}
            resolvedTheme={resolvedTheme}
            themePreset={themePreset}
            accent={accent}
            terminalThemeMode={terminalThemeMode}
            accessibleMode={accessibleMode}
            setThemeMode={setThemeMode}
            setThemePreset={setThemePreset}
            setAccent={setAccent}
            setTerminalThemeMode={setTerminalThemeMode}
            toggleAccessibleMode={toggleAccessibleMode}
            toggleThemeMode={toggleThemeMode}
          />

          <a
            href={`mailto:${personal.email}`}
            className="glass-control rounded-lg px-4 py-2 text-sm text-white transition-colors hover:bg-white/12"
          >
            {t("header.hireMe")}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-3">
          <LangToggle lang={lang} setLang={setLang} />
          
          {/* Sound toggle */}
          <button
            type="button"
            onClick={toggleSoundEnabled}
            className="glass-control inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/12 hover:text-white"
            aria-label={soundEnabled ? "Mute sound effects" : "Unmute sound effects"}
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <ThemeControls
            themeMode={themeMode}
            resolvedTheme={resolvedTheme}
            themePreset={themePreset}
            accent={accent}
            terminalThemeMode={terminalThemeMode}
            accessibleMode={accessibleMode}
            setThemeMode={setThemeMode}
            setThemePreset={setThemePreset}
            setAccent={setAccent}
            setTerminalThemeMode={setTerminalThemeMode}
            toggleAccessibleMode={toggleAccessibleMode}
            toggleThemeMode={toggleThemeMode}
          />
          <button
            className="text-white transition-colors hover:text-accent-secondary"
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
            className="overflow-hidden border-b border-white/10 bg-[#07080d]/94 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {navItems.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-1 text-sm text-white/58 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`mailto:${personal.email}`}
                className="border-t border-white/10 pt-2 text-sm text-accent-secondary"
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
