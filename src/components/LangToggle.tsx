import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import type { Lang } from "@/store/useStore";

const labels: Record<Lang, string> = {
  en: "English (EN)",
  th: "ไทย (TH)",
  zh: "简体中文 (ZH)",
  ja: "日本語 (JA)",
};

const shortLabels: Record<Lang, string> = {
  en: "EN",
  th: "TH",
  zh: "ZH",
  ja: "JA",
};

export function LangToggle({
  lang,
  setLang,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  
  const themeMode = useStore((state) => state.themeMode);
  const resolvedTheme =
    themeMode === "system" && typeof window !== "undefined"
      ? window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark"
      : themeMode === "light"
        ? "light"
        : "dark";
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "glass-control inline-flex h-9 items-center gap-1.5 rounded-lg px-3 text-xs font-bold transition-all cursor-pointer",
          isLight
            ? "text-slate-900 hover:bg-black/6 hover:text-slate-950 border-slate-300"
            : "text-white/70 hover:bg-white/12 hover:text-white"
        )}
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe size={14} className={isLight ? "text-slate-900" : "text-white/60"} />
        <span>{shortLabels[lang]}</span>
        <ChevronDown
          size={12}
          className={cn(
            "transition-transform duration-200", 
            open && "rotate-180",
            isLight ? "text-slate-900" : "text-white/65"
          )}
        />
      </button>

      {open && (
        <div className="glass-panel absolute right-0 top-11 z-50 w-40 overflow-hidden rounded-xl p-1.5 shadow-xl">
          <div className="flex flex-col gap-0.5">
            {(["en", "th", "zh", "ja"] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  setLang(l);
                  setOpen(false);
                }}
                className={cn(
                  "w-full text-left rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer",
                  lang === l
                    ? isLight
                      ? "bg-black/8 text-slate-950 font-bold"
                      : "bg-white/12 text-white"
                    : isLight
                      ? "text-slate-800 hover:bg-black/4 hover:text-slate-950"
                      : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                {labels[l]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
