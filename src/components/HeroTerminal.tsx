import { motion } from "framer-motion";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store/useStore";

type TerminalEntry =
  | { type: "command"; text: string }
  | { type: "output"; text: string; format?: "text" | "pre" | "error" }
  | { type: "actions"; actions: Array<{ label: string; href: string }> }
  | { type: "loading"; text: string };

type TerminalTheme = "bash" | "powershell";

const commandKeys = {
  help: "hero.terminal.commands.help",
  whoami: "hero.terminal.identity",
  location: "hero.terminal.location",
  focus: "hero.terminal.focus",
  stack: "hero.terminal.stack",
  shipping: "hero.terminal.shipping",
  projects: "hero.terminal.commands.projects",
  skills: "hero.terminal.commands.skills",
  experience: "hero.terminal.commands.experience",
  resume: "hero.terminal.commands.resume",
  fastfetch: "hero.terminal.commands.fastfetch",
  contact: "hero.terminal.commands.contact",
  clear: "hero.terminal.commands.clear",
  sudo: "hero.terminal.commands.sudo",
  coffee: "hero.terminal.commands.coffee",
} as const;

const guideCommands = ["fastfetch", "projects", "skills", "experience", "resume", "contact", "help", "clear"];

const themeConfig: Record<
  TerminalTheme,
  {
    title: string;
    promptUser: string;
    promptSuffix: string;
    shellClass: string;
    accentClass: string;
    bodyClass: string;
    buttonClass: string;
    inputCaret: string;
  }
> = {
  bash: {
    title: "profile.sh",
    promptUser: "neung@ubuntu",
    promptSuffix: ":~$",
    shellClass: "text-emerald-300",
    accentClass: "text-cyan-300",
    bodyClass: "bg-[#0d1117]/70",
    buttonClass: "hover:border-cyan-300/30",
    inputCaret: "caret-cyan-300",
  },
  powershell: {
    title: "Windows PowerShell",
    promptUser: "PS C:\\Users\\Neung",
    promptSuffix: ">",
    shellClass: "text-blue-200",
    accentClass: "text-sky-300",
    bodyClass: "bg-[#061a3a]/72",
    buttonClass: "hover:border-sky-300/35",
    inputCaret: "caret-sky-300",
  },
};

export function HeroTerminal() {
  const { t } = useTranslation();
  const terminalThemeMode = useStore((state) => state.terminalThemeMode);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<TerminalTheme>("bash");
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentTheme = themeConfig[theme];

  const commandMap = useMemo(
    () => ({
      help: t(commandKeys.help),
      whoami: t(commandKeys.whoami),
      location: t(commandKeys.location),
      focus: t(commandKeys.focus),
      stack: t(commandKeys.stack),
      shipping: t(commandKeys.shipping),
      projects: t(commandKeys.projects),
      skills: t(commandKeys.skills),
      experience: t(commandKeys.experience),
      resume: t(commandKeys.resume),
      fastfetch: t(commandKeys.fastfetch),
      contact: t(commandKeys.contact),
      clear: t(commandKeys.clear),
      sudo: t(commandKeys.sudo),
      "sudo hire neung": t(commandKeys.sudo),
      coffee: t(commandKeys.coffee),
      "brew coffee": t(commandKeys.coffee),
      ls: t(commandKeys.projects),
      "cat resume.txt": t(commandKeys.resume),
      "open github": t(commandKeys.contact),
      email: t(commandKeys.contact),
      "get-childitem": t(commandKeys.projects),
      "get-content resume.txt": t(commandKeys.resume),
      "start-process github": t(commandKeys.contact),
    }),
    [t]
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command || loading) return;

    if (command === "clear") {
      setHistory([]);
      setInput("");
      setHistoryIndex(null);
      return;
    }

    const isKnownCommand = command in commandMap;
    setCommandHistory((current) => [...current, command].slice(-20));
    setHistoryIndex(null);

    setHistory((current) => [
      ...current,
      { type: "command", text: command },
      { type: "loading", text: t("hero.terminal.loading") },
    ]);
    setInput("");
    setLoading(true);

    window.setTimeout(() => {
      setHistory((current) => [
        ...current.filter((entry) => entry.type !== "loading"),
        {
          type: "output",
          text: isKnownCommand
            ? commandMap[command as keyof typeof commandMap]
            : t("hero.terminal.permissionDenied", { command }),
          format: command === "fastfetch" ? "pre" : "text",
          ...(isKnownCommand ? {} : { format: "error" as const }),
        },
        ...getActions(command),
      ]);
      setLoading(false);
    }, 520);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const match = guideCommands.find((command) => command.startsWith(input.toLowerCase()));
      if (match) setInput(match);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (commandHistory.length === 0 || historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(null);
        setInput("");
        return;
      }
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex]);
    }
  };

  const getActions = (command: string): TerminalEntry[] => {
    const actionMap: Record<string, Array<{ label: string; href: string }>> = {
      projects: [{ label: t("hero.terminal.actions.projects"), href: "#projects" }],
      ls: [{ label: t("hero.terminal.actions.projects"), href: "#projects" }],
      skills: [{ label: t("hero.terminal.actions.skills"), href: "#skills" }],
      experience: [{ label: t("hero.terminal.actions.experience"), href: "#experience" }],
      "get-childitem": [{ label: t("hero.terminal.actions.projects"), href: "#projects" }],
      resume: [{ label: t("hero.terminal.actions.resume"), href: "/Darupong-Chouypu-CV.pdf" }],
      "cat resume.txt": [{ label: t("hero.terminal.actions.resume"), href: "/Darupong-Chouypu-CV.pdf" }],
      "get-content resume.txt": [{ label: t("hero.terminal.actions.resume"), href: "/Darupong-Chouypu-CV.pdf" }],
      contact: [{ label: t("hero.terminal.actions.email"), href: "mailto:darupong000@gmail.com" }],
      email: [{ label: t("hero.terminal.actions.email"), href: "mailto:darupong000@gmail.com" }],
      "open github": [{ label: "GitHub", href: "https://github.com/darupong" }],
      "start-process github": [{ label: "GitHub", href: "https://github.com/darupong" }],
    };
    const actions = actionMap[command];
    return actions ? [{ type: "actions", actions }] : [];
  };

  return (
    <div className="space-y-3 font-mono">
      <div className="glass-card overflow-hidden rounded-2xl p-0">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.055] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-white/42">{currentTheme.title}</span>
          <div className="ml-auto flex rounded-md border border-white/10 bg-black/10 p-0.5">
            {(["bash", "powershell"] as const).map((terminalTheme) => (
              <button
                key={terminalTheme}
                type="button"
                onClick={() => setTheme(terminalTheme)}
                className={`rounded px-2 py-0.5 text-[10px] transition-colors ${
                  theme === terminalTheme ? "bg-white/14 text-white" : "text-white/42 hover:text-white"
                }`}
              >
                {terminalTheme === "bash" ? "Bash" : "PowerShell"}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={scrollRef}
          className={`h-[25rem] overflow-y-auto p-5 text-sm ${currentTheme.bodyClass} ${
            terminalThemeMode === "dark"
              ? "terminal-force-dark"
              : terminalThemeMode === "light"
                ? "terminal-force-light"
                : ""
          }`}
        >
          <div className="space-y-4">
            {history.map((entry, index) => {
              if (entry.type === "command") {
                return (
                  <p key={`${entry.text}-${index}`} className={currentTheme.shellClass}>
                    <span className={currentTheme.accentClass}>{currentTheme.promptUser}</span>
                    <span className="text-white/35">{currentTheme.promptSuffix} </span>
                    {entry.text}
                  </p>
                );
              }

              if (entry.type === "loading") {
                return (
                  <motion.p
                    key={`${entry.text}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.35, 1, 0.35] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-white/45"
                  >
                    {entry.text}
                  </motion.p>
                );
              }

              if (entry.type === "actions") {
                return (
                  <motion.div
                    key={`actions-${index}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-wrap gap-2"
                  >
                    {entry.actions.map((action) => (
                      <a
                        key={action.href}
                        href={action.href}
                        target={action.href.startsWith("http") ? "_blank" : undefined}
                        rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className={`rounded-md border border-white/10 bg-white/[0.075] px-2.5 py-1 text-xs text-white/70 transition-colors hover:text-white ${currentTheme.buttonClass}`}
                      >
                        {action.label}
                      </a>
                    ))}
                  </motion.div>
                );
              }

              if (entry.format === "pre") {
                return (
                  <motion.pre
                    key={`${entry.text}-${index}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="max-w-full overflow-x-auto whitespace-pre text-[11px] leading-[1.45] text-white/70 sm:text-xs"
                  >
                    {entry.text}
                  </motion.pre>
                );
              }

              if (entry.format === "error") {
                return (
                  <motion.p
                    key={`${entry.text}-${index}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="whitespace-pre-line leading-relaxed text-red-300"
                  >
                    {entry.text}
                  </motion.p>
                );
              }

              return (
                <motion.p
                  key={`${entry.text}-${index}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="whitespace-pre-line leading-relaxed text-white/64"
                >
                  {entry.text}
                </motion.p>
              );
            })}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 flex items-center gap-2 text-sm">
            <label htmlFor="hero-terminal-input" className={`shrink-0 ${currentTheme.shellClass}`}>
              <span className={currentTheme.accentClass}>{currentTheme.promptUser}</span>
              <span className="text-white/35">{currentTheme.promptSuffix}</span>
            </label>
            <input
              id="hero-terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label={t("hero.terminal.inputLabel")}
              autoComplete="off"
              spellCheck={false}
              className={`min-w-0 flex-1 border-none bg-transparent text-white/78 outline-none placeholder:text-white/28 disabled:cursor-wait ${currentTheme.inputCaret}`}
              placeholder={t("hero.terminal.placeholder")}
            />
          </form>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {guideCommands.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => runCommand(command)}
            disabled={loading}
            className={`rounded-md border border-white/10 bg-white/[0.055] px-2.5 py-1 text-xs text-white/55 transition-colors hover:text-white disabled:cursor-wait disabled:opacity-45 ${currentTheme.buttonClass}`}
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}
