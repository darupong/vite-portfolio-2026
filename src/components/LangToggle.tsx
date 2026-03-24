import { cn } from "@/lib/utils";

export function LangToggle({
  lang,
  setLang,
}: {
  lang: "en" | "th";
  setLang: (l: "en" | "th") => void;
}) {
  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-[#161616] border border-[#2a2a2a]">
      {(["en", "th"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "px-2.5 py-1 text-xs font-semibold rounded-md transition-all duration-200 uppercase tracking-wide",
            lang === l
              ? "bg-[#6366f1] text-white"
              : "text-[#666] hover:text-[#aaa]"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
