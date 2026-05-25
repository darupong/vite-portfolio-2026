import { Moon, Settings2, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { Accent, TerminalThemeMode, ThemeMode, ThemePreset } from "@/store/useStore";

const modes: ThemeMode[] = ["dark", "light", "system"];
const presets: ThemePreset[] = ["midnight", "pearl", "ubuntu", "cyber"];
const accents: Accent[] = ["cyan", "indigo", "emerald", "amber"];
const terminalModes: TerminalThemeMode[] = ["sync", "dark", "light"];
const presetLabels: Record<ThemePreset, string> = {
  midnight: "Midnight",
  pearl: "Pearl",
  ubuntu: "Ubuntu",
  cyber: "Cyber",
};
const accentColors: Record<Accent, string> = {
  cyan: "bg-cyan-300",
  indigo: "bg-indigo-400",
  emerald: "bg-emerald-400",
  amber: "bg-amber-400",
};

export function ThemeControls({
  themeMode,
  resolvedTheme,
  themePreset,
  accent,
  terminalThemeMode,
  accessibleMode,
  setThemeMode,
  setThemePreset,
  setAccent,
  setTerminalThemeMode,
  toggleAccessibleMode,
  toggleThemeMode,
}: {
  themeMode: ThemeMode;
  resolvedTheme: "dark" | "light";
  themePreset: ThemePreset;
  accent: Accent;
  terminalThemeMode: TerminalThemeMode;
  accessibleMode: boolean;
  setThemeMode: (theme: ThemeMode) => void;
  setThemePreset: (preset: ThemePreset) => void;
  setAccent: (accent: Accent) => void;
  setTerminalThemeMode: (mode: TerminalThemeMode) => void;
  toggleAccessibleMode: () => void;
  toggleThemeMode: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const isLight = resolvedTheme === "light";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={toggleThemeMode}
          className="glass-control inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/12 hover:text-white"
          aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
        >
          {isLight ? <Moon size={16} /> : <Sun size={16} />}
        </button>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="glass-control inline-flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/12 hover:text-white"
          aria-label="Open theme settings"
        >
          <Settings2 size={16} />
        </button>
      </div>

      {open && (
        <div className="glass-panel absolute right-0 top-11 z-50 w-72 rounded-2xl p-4 shadow-xl">
          <div className="space-y-4">
            <ThemeGroup label="Mode">
              {modes.map((mode) => (
                <Choice key={mode} active={themeMode === mode} onClick={() => setThemeMode(mode)}>
                  {mode}
                </Choice>
              ))}
            </ThemeGroup>

            <ThemeGroup label="Preset">
              {presets.map((preset) => (
                <Choice key={preset} active={themePreset === preset} onClick={() => setThemePreset(preset)}>
                  <span
                    className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                      preset === "midnight"
                        ? "bg-slate-500"
                        : preset === "pearl"
                          ? "bg-blue-300"
                          : preset === "ubuntu"
                            ? "bg-orange-400"
                            : "bg-cyan-300"
                    }`}
                  />
                  {presetLabels[preset]}
                </Choice>
              ))}
            </ThemeGroup>

            <ThemeGroup label="Accent">
              {accents.map((item) => (
                <Choice key={item} active={accent === item} onClick={() => setAccent(item)}>
                  <span className={`mr-1.5 inline-block h-2 w-2 rounded-full ${accentColors[item]}`} />
                  {item}
                </Choice>
              ))}
            </ThemeGroup>

            <ThemeGroup label="Terminal">
              {terminalModes.map((mode) => (
                <Choice key={mode} active={terminalThemeMode === mode} onClick={() => setTerminalThemeMode(mode)}>
                  {mode}
                </Choice>
              ))}
            </ThemeGroup>

            <button
              type="button"
              onClick={toggleAccessibleMode}
              className={`w-full rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-colors ${
                accessibleMode
                  ? "border-cyan-300/30 bg-cyan-300/12 text-white"
                  : "border-white/10 bg-white/[0.055] text-white/60 hover:text-white"
              }`}
            >
              Accessibility mode {accessibleMode ? "on" : "off"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ThemeGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase text-white/42">{label}</p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs capitalize transition-colors ${
        active
          ? "border-cyan-300/30 bg-cyan-300/12 text-white"
          : "border-white/10 bg-white/[0.055] text-white/56 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
