import { create } from "zustand";
import i18n from "@/i18n";

type Lang = "en" | "th";

interface PortfolioStore {
  activeSection: string;
  mobileMenuOpen: boolean;
  lang: Lang;
  setActiveSection: (section: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setLang: (lang: Lang) => void;
}

export const useStore = create<PortfolioStore>((set) => ({
  activeSection: "about",
  mobileMenuOpen: false,
  lang: (localStorage.getItem("lang") as Lang) ?? "en",
  setActiveSection: (section) => set({ activeSection: section }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setLang: (lang) => {
    localStorage.setItem("lang", lang);
    void i18n.changeLanguage(lang);
    set({ lang });
  },
}));
