import { useEffect, useState } from "react";
import { Globe, Users } from "lucide-react";
import { useStore, getSeasonalPreset } from "@/store/useStore";

interface Signature {
  message: string;
  location: string;
  date: string;
  countryCode: string;
}

// Map Country Codes to exact percentage coordinate offsets on our SVG projection
const countryCoords: Record<string, { x: number; y: number }> = {
  TH: { x: 71.5, y: 42.5 }, // Thailand
  US: { x: 19.5, y: 30.5 }, // USA
  JP: { x: 83.5, y: 32.5 }, // Japan
  GB: { x: 45.5, y: 24.8 }, // United Kingdom
  SG: { x: 71.8, y: 47.2 }, // Singapore
  DE: { x: 49.5, y: 24.5 }, // Germany
  FR: { x: 47.2, y: 27.2 }, // France
  IN: { x: 65.5, y: 38.5 }, // India
  CN: { x: 75.5, y: 32.5 }, // China
  AU: { x: 81.5, y: 74.5 }, // Australia
  CA: { x: 18.5, y: 22.5 }, // Canada
};

export function WorldVisitorMap({ visitorCountry }: { visitorCountry?: string }) {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const themePreset = useStore((state) => state.themePreset);
  const activePreset = themePreset === "auto" ? getSeasonalPreset() : themePreset;

  const loadSignatures = () => {
    try {
      const data = localStorage.getItem("guestbook_signatures") || "[]";
      setSignatures(JSON.parse(data));
    } catch {
      setSignatures([]);
    }
  };

  useEffect(() => {
    loadSignatures();
    // Listen for real-time guestbook updates from the terminal console
    window.addEventListener("guestbook_updated", loadSignatures);
    return () => window.removeEventListener("guestbook_updated", loadSignatures);
  }, []);

  // Consolidate signatures count by country code
  const countryCounts = signatures.reduce<Record<string, number>>((acc, sig) => {
    if (sig.countryCode) {
      acc[sig.countryCode] = (acc[sig.countryCode] || 0) + 1;
    }
    return acc;
  }, {});

  // Add the active visitor's country if not already there
  const activeCode = visitorCountry || "TH";

  // Pulse colors depending on presets
  const pulseColor =
    activePreset === "christmas"
      ? "bg-red-500 shadow-[0_0_8px_#ef4444]"
      : activePreset === "halloween"
        ? "bg-purple-500 shadow-[0_0_8px_#a855f7]"
        : activePreset === "valentine"
          ? "bg-pink-500 shadow-[0_0_8px_#ec4899]"
          : "bg-cyan-400 shadow-[0_0_8px_#22d3ee]";

  return (
    <div className="glass-card flex flex-col justify-between h-[260px] p-4 rounded-2xl border border-white/10 relative overflow-hidden select-none">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes radarPulse {
          0% { transform: scale(0.6); opacity: 0.85; }
          100% { transform: scale(3.2); opacity: 0; }
        }
        .radar-ring {
          animation: radarPulse 1.8s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }
      `}} />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Globe size={15} className="text-white/40 shrink-0" />
          <span className="text-[11px] font-mono uppercase tracking-wider text-white/50 font-bold">
            Live Global Visitor Map
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/40">
          <Users size={12} />
          <span>{signatures.length} Signatures</span>
        </div>
      </div>

      {/* SVG stylized outline World Map */}
      <div className="relative w-full h-[10rem] bg-black/25 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center p-1">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full opacity-20 text-white/60 pointer-events-none"
        >
          {/* North America & Greenland */}
          <path
            d="M 5,25 C 10,20 15,15 28,15 C 32,15 35,22 30,28 C 28,30 25,32 23,33 C 22,34 20,38 18,40 C 15,43 14,48 10,48 C 8,48 7,42 8,36 C 8,33 5,30 5,25 Z M 22,12 C 24,10 32,10 30,14 C 28,16 24,16 22,12 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.3"
          />
          {/* South America */}
          <path
            d="M 23,45 C 26,45 28,48 27,53 C 25,58 21,68 19,72 C 18,74 16,74 16,71 C 16,68 18,58 19,54 C 20,50 21,46 23,45 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.3"
          />
          {/* Africa */}
          <path
            d="M 43,45 C 47,40 55,42 54,48 C 53,52 50,58 50,62 C 50,65 47,72 45,74 C 43,75 42,72 42,68 C 42,65 41,58 40,54 C 39,50 40,46 43,45 Z M 53,68 C 54,66 56,66 55,69 C 54,72 53,72 53,68 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.3"
          />
          {/* Eurasia (Europe + Asia) */}
          <path
            d="M 42,28 C 46,20 54,16 68,16 C 75,16 85,20 85,28 C 85,32 80,36 78,38 C 76,40 73,43 73,46 C 73,48 70,54 68,54 C 65,54 62,48 60,46 C 58,44 54,42 50,42 C 46,42 43,36 42,28 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.3"
          />
          {/* Japan */}
          <path
            d="M 83,30 C 84,28 85,32 84,35 C 83,38 82,38 83,30 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.3"
          />
          {/* Australia */}
          <path
            d="M 76,68 C 82,65 85,67 86,72 C 87,76 84,81 80,83 C 78,84 76,82 76,78 C 76,74 74,70 76,68 Z M 80,86 C 81,85 82,85 81,87 Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.3"
          />
        </svg>

        {/* Pulsing Radar Pings of guestbook countries */}
        {Object.entries(countryCoords).map(([code, coords]) => {
          const isSigned = countryCounts[code] > 0;
          const isActiveVisitor = code === activeCode;
          if (!isSigned && !isActiveVisitor) return null;

          return (
            <div
              key={code}
              className="absolute group"
              style={{ left: `${coords.x}%`, top: `${coords.y}%`, transform: "translate(-50%, -50%)" }}
            >
              {/* Radar ring */}
              <div className={`absolute -inset-2.5 rounded-full radar-ring opacity-75 ${pulseColor}`} />
              
              {/* Core dot */}
              <div className={`h-2.5 w-2.5 rounded-full z-10 transition-all scale-100 group-hover:scale-125 border border-white/30 cursor-pointer ${
                isActiveVisitor ? "bg-emerald-400 shadow-[0_0_10px_#34d399]" : pulseColor
              }`} />
              
              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-7 scale-0 group-hover:scale-100 bg-black/80 border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-white/90 whitespace-nowrap transition-transform duration-200 z-30 select-none pointer-events-none">
                {code} {isSigned ? `(${countryCounts[code]} sigs)` : ""} {isActiveVisitor ? "[You]" : ""}
              </div>
            </div>
          );
        })}
      </div>

      {/* Visitor Countries List */}
      <div className="mt-3 overflow-hidden">
        <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap no-scrollbar pb-1">
          {signatures.length === 0 ? (
            <span className="text-[9px] font-mono text-white/25">
              💡 Type 'guestbook sign "[message]"' in terminal to plot your country ping!
            </span>
          ) : (
            signatures.slice(0, 4).map((sig, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 bg-white/5 border border-white/5 px-2 py-0.5 rounded text-[9px] text-white/50 font-mono"
              >
                <span>{sig.location.split(" ")[0]}</span>
                <span className="truncate max-w-[80px] font-bold text-white/70">"{sig.message}"</span>
              </span>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
