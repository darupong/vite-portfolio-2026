import { useTranslation } from "react-i18next";
import { personal } from "@/data/portfolio";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1a1a1a] py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#444]">
        <p>© {year} {personal.name}. All rights reserved.</p>
        <p>{t("footer.built")}</p>
      </div>
    </footer>
  );
}
