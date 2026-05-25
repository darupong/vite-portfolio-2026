import { cn } from "@/lib/utils";
import type { Lang } from "@/store/useStore";

const labels: Record<Lang, string> = {
  en: "EN",
  th: "TH",
  zh: "中文",
  ja: "日本語",
};

export function LangToggle({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  return (
    <div className="glass-control flex items-center gap-0.5 p-0.5 rounded-lg">
      {(["en", "th", "zh", "ja"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "min-w-8 px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200",
            lang === l
              ? "bg-white/12 text-white shadow-sm"
              : "text-white/50 hover:text-white"
          )}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}
