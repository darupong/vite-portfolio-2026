import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustSignals } from "@/components/TrustSignals";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useStore } from "@/store/useStore";

const ProjectPage = lazy(() =>
  import("@/components/ProjectPage").then((module) => ({ default: module.ProjectPage }))
);

function PortfolioPage() {
  useActiveSection();
  return (
    <div className="page-shell min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <TrustSignals />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const { themeMode, themePreset, accent, accessibleMode } = useStore();
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">("dark");
  const resolvedTheme = themeMode === "system" ? systemTheme : themeMode;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const updateSystemTheme = () => setSystemTheme(media.matches ? "light" : "dark");
    updateSystemTheme();
    media.addEventListener("change", updateSystemTheme);
    return () => media.removeEventListener("change", updateSystemTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("theme-light", resolvedTheme === "light");
    root.classList.toggle("theme-dark", resolvedTheme === "dark");
    root.dataset.themeMode = themeMode;
    root.dataset.themePreset = themePreset;
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
