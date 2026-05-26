import { create } from "zustand";
import i18n from "@/i18n";

export type Lang = "en" | "th" | "zh" | "ja";
export type ThemeMode = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";
export type ThemePreset =
  | "midnight"
  | "pearl"
  | "ubuntu"
  | "cyber"
  | "christmas"
  | "halloween"
  | "valentine"
  | "songkran"
  | "newyear"
  | "auto";

export function getSeasonalPreset(): "christmas" | "halloween" | "valentine" | "songkran" | "newyear" | null {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const ictDate = new Date(utc + 3600000 * 7); // ICT (UTC+7)

  const month = ictDate.getMonth() + 1; // 1-12
  const date = ictDate.getDate(); // 1-31

  // New Year (Dec 31 - Jan 2)
  if ((month === 12 && date === 31) || (month === 1 && (date === 1 || date === 2))) {
    return "newyear";
  }
  // Valentine's Day (Feb 13 - Feb 15)
  if (month === 2 && (date >= 13 && date <= 15)) {
    return "valentine";
  }
  // Songkran (Apr 12 - Apr 16)
  if (month === 4 && (date >= 12 && date <= 16)) {
    return "songkran";
  }
  // Halloween (Oct 30 - Nov 1)
  if ((month === 10 && date === 31) || (month === 11 && date === 1)) {
    return "halloween";
  }
  // Christmas (Dec 24 - Dec 26)
  if (month === 12 && (date >= 24 && date <= 26)) {
    return "christmas";
  }

  return null;
}

export type Accent = "cyan" | "indigo" | "emerald" | "amber";
export type TerminalThemeMode = "sync" | "dark" | "light";

const isLang = (lang: string | null): lang is Lang =>
  lang === "en" || lang === "th" || lang === "zh" || lang === "ja";
const isThemeMode = (theme: string | null): theme is ThemeMode =>
  theme === "dark" || theme === "light" || theme === "system";
const isThemePreset = (preset: string | null): preset is ThemePreset =>
  preset === "midnight" ||
  preset === "pearl" ||
  preset === "ubuntu" ||
  preset === "cyber" ||
  preset === "christmas" ||
  preset === "halloween" ||
  preset === "valentine" ||
  preset === "songkran" ||
  preset === "newyear" ||
  preset === "auto";
const isAccent = (accent: string | null): accent is Accent =>
  accent === "cyan" || accent === "indigo" || accent === "emerald" || accent === "amber";
const isTerminalThemeMode = (mode: string | null): mode is TerminalThemeMode =>
  mode === "sync" || mode === "dark" || mode === "light";

const storedLang = localStorage.getItem("lang");
const storedThemeMode = localStorage.getItem("themeMode") ?? localStorage.getItem("theme");
const storedThemePreset = localStorage.getItem("themePreset");
const storedAccent = localStorage.getItem("accent");
const storedTerminalThemeMode = localStorage.getItem("terminalThemeMode");
const storedAccessibleMode = localStorage.getItem("accessibleMode");
const storedSoundEnabled = localStorage.getItem("soundEnabled");

interface PortfolioStore {
  activeSection: string;
  mobileMenuOpen: boolean;
  lang: Lang;
  themeMode: ThemeMode;
  themePreset: ThemePreset;
  accent: Accent;
  terminalThemeMode: TerminalThemeMode;
  accessibleMode: boolean;
  soundEnabled: boolean;
  setActiveSection: (section: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setLang: (lang: Lang) => void;
  setThemeMode: (theme: ThemeMode) => void;
  setThemePreset: (preset: ThemePreset) => void;
  setAccent: (accent: Accent) => void;
  setTerminalThemeMode: (mode: TerminalThemeMode) => void;
  toggleAccessibleMode: () => void;
  toggleThemeMode: () => void;
  toggleSoundEnabled: () => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  activeSection: "about",
  mobileMenuOpen: false,
  lang: isLang(storedLang) ? storedLang : "en",
  themeMode: isThemeMode(storedThemeMode) ? storedThemeMode : "dark",
  themePreset: isThemePreset(storedThemePreset) ? storedThemePreset : "auto",
  accent: isAccent(storedAccent) ? storedAccent : "cyan",
  terminalThemeMode: isTerminalThemeMode(storedTerminalThemeMode) ? storedTerminalThemeMode : "sync",
  accessibleMode: storedAccessibleMode === "true",
  soundEnabled: storedSoundEnabled === "true",
  setActiveSection: (section) => set({ activeSection: section }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setLang: (lang) => {
    localStorage.setItem("lang", lang);
    void i18n.changeLanguage(lang);
    set({ lang });
  },
  setThemeMode: (themeMode) => {
    localStorage.setItem("themeMode", themeMode);
    set({ themeMode });
  },
  setThemePreset: (themePreset) => {
    localStorage.setItem("themePreset", themePreset);
    set({ themePreset });
  },
  setAccent: (accent) => {
    localStorage.setItem("accent", accent);
    set({ accent });
  },
  setTerminalThemeMode: (terminalThemeMode) => {
    localStorage.setItem("terminalThemeMode", terminalThemeMode);
    set({ terminalThemeMode });
  },
  toggleAccessibleMode: () =>
    set((state) => {
      const accessibleMode = !state.accessibleMode;
      localStorage.setItem("accessibleMode", String(accessibleMode));
      return { accessibleMode };
    }),
  toggleThemeMode: () =>
    set((state) => {
      const themeMode = state.themeMode === "dark" ? "light" : "dark";
      localStorage.setItem("themeMode", themeMode);
      return { themeMode };
    }),
  toggleSoundEnabled: () =>
    set((state) => {
      const next = !state.soundEnabled;
      localStorage.setItem("soundEnabled", String(next));
      return { soundEnabled: next };
    }),
}));
