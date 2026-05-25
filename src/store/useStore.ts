import { create } from "zustand";
import i18n from "@/i18n";

export type Lang = "en" | "th" | "zh" | "ja";
export type ThemeMode = "dark" | "light" | "system";
export type ResolvedTheme = "dark" | "light";
export type ThemePreset = "midnight" | "pearl" | "ubuntu" | "cyber";
export type Accent = "cyan" | "indigo" | "emerald" | "amber";
export type TerminalThemeMode = "sync" | "dark" | "light";

const isLang = (lang: string | null): lang is Lang =>
  lang === "en" || lang === "th" || lang === "zh" || lang === "ja";
const isThemeMode = (theme: string | null): theme is ThemeMode =>
  theme === "dark" || theme === "light" || theme === "system";
const isThemePreset = (preset: string | null): preset is ThemePreset =>
  preset === "midnight" || preset === "pearl" || preset === "ubuntu" || preset === "cyber";
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

interface PortfolioStore {
  activeSection: string;
  mobileMenuOpen: boolean;
  lang: Lang;
  themeMode: ThemeMode;
  themePreset: ThemePreset;
  accent: Accent;
  terminalThemeMode: TerminalThemeMode;
  accessibleMode: boolean;
  setActiveSection: (section: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setLang: (lang: Lang) => void;
  setThemeMode: (theme: ThemeMode) => void;
  setThemePreset: (preset: ThemePreset) => void;
  setAccent: (accent: Accent) => void;
  setTerminalThemeMode: (mode: TerminalThemeMode) => void;
  toggleAccessibleMode: () => void;
  toggleThemeMode: () => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  activeSection: "about",
  mobileMenuOpen: false,
  lang: isLang(storedLang) ? storedLang : "en",
  themeMode: isThemeMode(storedThemeMode) ? storedThemeMode : "dark",
  themePreset: isThemePreset(storedThemePreset) ? storedThemePreset : "midnight",
  accent: isAccent(storedAccent) ? storedAccent : "cyan",
  terminalThemeMode: isTerminalThemeMode(storedTerminalThemeMode) ? storedTerminalThemeMode : "sync",
  accessibleMode: storedAccessibleMode === "true",
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
}));
