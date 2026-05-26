import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { Experience } from "@/components/sections/Experience";
import { AISandbox } from "@/features/ai-sandbox/AISandbox";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { SeasonalBackground } from "@/components/layout/SeasonalBackground";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useStore, getSeasonalPreset } from "@/store/useStore";
import { playHolidayChime } from "@/lib/sounds";

const ProjectPage = lazy(() =>
  import("@/components/sections/ProjectPage").then((module) => ({ default: module.ProjectPage }))
);

function PortfolioPage() {
  useActiveSection();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="page-shell min-h-screen bg-background text-foreground"
    >
      <SeasonalBackground />
      <Header />
      <main>
        <Hero />
        <TrustSignals />
        <AISandbox />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  );
}

function App() {
  const { themeMode, themePreset, accent, accessibleMode, soundEnabled } = useStore();
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("dark");
  const resolvedTheme = themeMode === "system" ? systemTheme : themeMode;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const updateSystemTheme = () => setSystemTheme(media.matches ? "light" : "dark");
    updateSystemTheme();
    media.addEventListener("change", updateSystemTheme);
    return () => media.removeEventListener("change", updateSystemTheme);
  }, []);

  // Play chime sound when preset resolves
  useEffect(() => {
    if (!soundEnabled) return;
    const resolvedPreset = themePreset === "auto" ? (getSeasonalPreset() ?? "midnight") : themePreset;
    playHolidayChime(resolvedPreset);
  }, [themePreset, soundEnabled]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-light", resolvedTheme === "light");
    root.classList.toggle("theme-dark", resolvedTheme === "dark");
    root.dataset.themeMode = themeMode;
    
    // Resolve "auto" preset dynamically to seasonal festival or midnight fallback
    const resolvedPreset = themePreset === "auto" ? (getSeasonalPreset() ?? "midnight") : themePreset;
    root.dataset.themePreset = resolvedPreset;
    
    root.dataset.accent = accent;
    root.dataset.accessible = String(accessibleMode);
    root.style.colorScheme = resolvedTheme;
  }, [accent, accessibleMode, resolvedTheme, themeMode, themePreset]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route
          path="/projects/:id"
          element={
            <Suspense fallback={<div className="min-h-screen bg-background" />}>
              <ProjectPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
