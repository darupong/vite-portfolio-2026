import { motion } from "framer-motion";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore, getSeasonalPreset } from "@/store/useStore";
import { playKeyboardClick, playHolidayChime } from "@/lib/sounds";

type TerminalEntry =
  | { type: "command"; text: string }
  | { type: "output"; text: string; format?: "text" | "pre" | "error"; typewriter?: boolean }
  | { type: "actions"; actions: Array<{ label: string; href: string }> }
  | { type: "loading"; text: string };

function TypewriterText({ text, speed = 10 }: { text: string; speed?: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText((current) => current + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className="whitespace-pre-line">{displayedText}</span>;
}

function getAIResponse(query: string, preset: string): { text: string; avatar: string } {
  const q = query.toLowerCase();
  let persona = "standard";
  let avatar = "[neung-gpt 🤖]";

  if (preset === "christmas") {
    persona = "christmas";
    avatar = "[santa 🎅🎄]";
  } else if (preset === "halloween") {
    persona = "halloween";
    avatar = "[spooky-ghost 👻🎃]";
  } else if (preset === "valentine") {
    persona = "valentine";
    avatar = "[cupid 💖🏹]";
  } else if (preset === "songkran") {
    persona = "songkran";
    avatar = "[water-buddy 💦🌊]";
  } else if (preset === "newyear") {
    persona = "newyear";
    avatar = "[party-master 🎆✨]";
  }

  let topic = "unknown";
  if (q.includes("skill") || q.includes("tech") || q.includes("language") || q.includes("code")) {
    topic = "skills";
  } else if (q.includes("experience") || q.includes("work") || q.includes("job") || q.includes("career") || q.includes("company")) {
    topic = "experience";
  } else if (q.includes("project") || q.includes("portfolio") || q.includes("product")) {
    topic = "projects";
  } else if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("git") || q.includes("social")) {
    topic = "contact";
  } else if (q.includes("who") || q.includes("about") || q.includes("neung") || q.includes("darupong") || q.includes("profile")) {
    topic = "whoami";
  } else if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greet") || q.includes("sup")) {
    topic = "hello";
  }

  const responses: Record<string, Record<string, string>> = {
    standard: {
      hello: "Hello there! I am Neung-GPT 🤖, your automated senior AI full-stack guide. Ask me anything about Neung's background, skills, experience, or projects!",
      whoami: "Neung (Darupong Chouypu) is a highly skilled Full Stack Engineer based in Bangkok, Thailand. He has 4+ years of professional engineering craft bridging pixel-perfect frontend layouts with advanced distributed API backend engines.",
      skills: "Neung is proficient in modern web stacks:\n• Frontend: Next.js, React, Astro, TypeScript, Tailwind CSS\n• Backend: FastAPI, NestJS, Python, Node.js\n• AI & Creative: Stable Diffusion, ComfyUI, Unity Game Engine, WebGL, Three.js\n• Data/Cloud: PostgreSQL, MongoDB, AWS, Docker.",
      experience: "Neung has over 4 years of industry experience:\n• IMAI GROUP (2025-Present): Building Next.js & FastAPI AI products.\n• Virtual Reality Co. (2023-2025): Developing advanced Stable Diffusion workflow microsites and web structures.\n• Pi R Square (2023): Senior Next.js/React frontend development.\n• VIZ STUDIO (2021-2023): Designing Unity 3D WebGL tours and Spark AR features.",
      projects: "Here are some of Neung's creations:\n• Looklike.ai: Fast consumer AI portrait generation.\n• Lay's Valentines: Custom high-traffic interactive AI wallpaper campaign.\n• Sathumart: AI-powered wallpaper platform.\n• Kooboon Dating App: Published React Native mobile dating app.",
      contact: "You can hire or contact Neung directly via:\n• Email: darupong000@gmail.com\n• GitHub: github.com/darupong\n• CLI: Try typing 'contact' to open direct social actions!",
      unknown: "I understand! But I'm limited to Neung's profile data. Ask me about: 'skills', 'experience', 'projects', 'contact', or 'who is Neung'!",
    },
    christmas: {
      hello: "Ho ho ho! 🎅🎄 Merry Christmas! I am Santa's helper. Ask me what digital holiday gifts Neung has crafted this year!",
      whoami: "Ho ho ho! Neung is a wonderful developer who has been very good this year! He is a Full Stack Engineer in Bangkok who designs lightning-fast code toys and AI creations like clockwork!",
      skills: "Santa's checklist says Neung's bag is full of amazing tech toys:\n• Frontend: Next.js & React (crafted like wooden toys)\n• Backend: FastAPI & Python (flowing like hot cocoa)\n• AI & Game: Stable Diffusion, ComfyUI, and Unity (magical as Christmas elves)!",
      experience: "Neung has worked in many wonderful workshop factories over 4+ years:\n• IMAI GROUP: Coding AI apps in Ladprao.\n• Virtual Reality Co.: Building Stable Diffusion photo booths.\n• Pi R Square: Packaging Next.js microsites.\n• VIZ STUDIO: Building virtual 3D tour experiences!",
      projects: "Look at these amazing gifts Neung has wrapped under the tree:\n• Looklike.ai: Holiday portrait generation!\n• Lay's Valentines: Warm romantic wallpapers!\n• Sathumart: Generative AI templates!\n• Kooboon: A dating app to find love during winter!",
      contact: "Want to send Neung a letter like writing to the North Pole? ✉️🎄\n• Email: darupong000@gmail.com\n• GitHub: github.com/darupong\nLet's collaborate on some holiday magic!",
      unknown: "Ho ho ho! 🎅 My reindeer couldn't resolve that path! Try asking me about 'skills', 'experience', 'projects', or 'who is Neung' under the holiday tree!",
    },
    halloween: {
      hello: "Boooo! 👻🎃 Hahaha... I am the Ghost of Neung's Debugging Past! Ask me about the magical code sorcery Neung brews in his cauldron!",
      whoami: "Ahhh! Neung is a mysterious code wizard from Bangkok who casts powerful spells using Next.js and FastAPI to bring dead code back to life! He has been practicing this dark art for over 4 years!",
      skills: "In Neung's cauldron, you will find these glowing ingredients:\n• Ghostly Lights: Next.js, React, WebGL (Three.js)\n• Cauldron Brew: Python, FastAPI, Node.js\n• Ghoulish Spells: Stable Diffusion, ComfyUI, Unity Game Engine!",
      experience: "Neung's ghoulish journey through haunted engineering chambers:\n• IMAI GROUP: Brewing AI potions.\n• Virtual Reality Co.: Manifesting Stable Diffusion portals.\n• Pi R Square: Constructing Next.js frontend cages.\n• VIZ STUDIO: Summoning 3D WebGL phantom worlds!",
      projects: "Behold Neung's monstrously successful creations:\n• Looklike.ai: Shapeshifting AI portrait generator.\n• Lay's Valentines: Eerie love spell generators.\n• Sathumart: Mystical wallpaper summoning platforms.\n• Kooboon: Matching lonely souls in the dark night!",
      contact: "Send a phantom message through the void to hire Neung:\n• Email: darupong000@gmail.com\n• GitHub: github.com/darupong\nSpeak before the full moon rises!",
      unknown: "Eeeeek! 👻 The spelling failed! Ask me about 'skills', 'experience', 'projects', or 'who is Neung' before the bats fly away!",
    },
    valentine: {
      hello: "Happy Valentine's! 💖🏹 I am Cupid. Ask me how Neung pours his heart and soul into crafting beautiful, pixel-perfect software with pure love!",
      whoami: "Neung is a romantic software artisan who believes coding is a form of poetry. Based in Bangkok, he has been building passionate web and mobile experiences for over 4 years.",
      skills: "Neung crafts his code with elegant harmony:\n• Sweet Presentations: Next.js, React, Tailwind CSS\n• Warm Core Logic: FastAPI, Python, NestJS\n• Creative Connections: Stable Diffusion, Unity, WebGL, Three.js.",
      experience: "Neung's engineering romance across beautiful locations:\n• IMAI GROUP: Developing heartwarming AI applications.\n• Virtual Reality Co.: Designing custom Stable Diffusion photo flows.\n• Pi R Square: Formatting beautiful Next.js UI systems.\n• VIZ STUDIO: Engineering interactive 3D WebGL tour experiences.",
      projects: "Here are Neung's love letters written in code:\n• Looklike.ai: Creating beautiful AI-assisted portraits.\n• Lay's Valentines: A massive romantic generative campaign!\n• Sathumart: Heartfelt AI cultural wallpapers.\n• Kooboon: The ultimate dating platform built to connect hearts!",
      contact: "Let's connect our hearts and write beautiful code together: 💖\n• Email: darupong000@gmail.com\n• GitHub: github.com/darupong\nI'm ready to fall in love with your project!",
      unknown: "Love is patient, but I couldn't match that topic! 💘 Ask me about Neung's 'skills', 'experience', 'projects', or 'who is Neung'!",
    },
    songkran: {
      hello: "Sawasdee Krub! Splasssh! 💦🌊 I am your cool Water Buddy. Ask me how Neung splashes bugs away and keeps the servers refreshed!",
      whoami: "Neung is a super cool Full Stack Engineer from Bangkok. He has 4+ years of experience washing away spaghetti code and keeping frontend/backend systems incredibly fluid!",
      skills: "Neung's cool water arsenal contains top-tier tech:\n• Water Jet (Frontend): Next.js, React, TypeScript, Tailwind CSS\n• Water Pump (Backend): FastAPI, Python, NestJS, Node.js\n• Splash effects (AI/Creative): Stable Diffusion, ComfyUI, Unity, WebGL!",
      experience: "Neung has made a splash at several top companies:\n• IMAI GROUP: Raining down FastAPI AI creations.\n• Virtual Reality Co.: Washing bugs off Stable Diffusion pipelines.\n• Pi R Square: Smoothing out Next.js page flows.\n• VIZ STUDIO: Building highly fluid WebGL interactive structures.",
      projects: "Dive into Neung's refreshing portfolio creations:\n• Looklike.ai: Fluid AI portrait generators.\n• Lay's Valentines: Highly interactive generative events.\n• Sathumart: Cool cultural AI wallpapers.\n• Kooboon: Splashing joy into mobile dating maps!",
      contact: "Want to splash some ideas together? Get in touch! 💦\n• Email: darupong000@gmail.com\n• GitHub: github.com/darupong\nLet's make a big splash!",
      unknown: "Oops! 💦 That question got washed away by the water gun! Ask me about 'skills', 'experience', 'projects', or 'who is Neung'!",
    },
    newyear: {
      hello: "Happy 2026! 🎆✨ I am your New Year Party Planner. Ask me about Neung's code countdown, achievements, and roadmap for success!",
      whoami: "Neung is a high-achieving Full Stack Engineer in Bangkok. He starts every year with new goals, bringing 4+ years of professional engineering growth to make your product hit #1!",
      skills: "Neung is fully loaded for a stellar 2026:\n• Launchpad: Next.js, React, TypeScript, Tailwind CSS\n• Rocket Engines: FastAPI, Python, NestJS, Node.js\n• Sparklers: Stable Diffusion, Unity, Three.js, WebGL!",
      experience: "Neung's stellar timeline of professional achievements:\n• IMAI GROUP (2025-Present): Powering future-proof Next.js AI tools.\n• Virtual Reality Co. (2023-2025): Developing advanced Stable Diffusion workflow platforms.\n• Pi R Square (2023): Launching Next.js layouts.\n• VIZ STUDIO (2021-2023): Directing Unity WebGL deployments.",
      projects: "Outstanding projects to kick off the new year:\n• Looklike.ai: Next-gen AI portrait creation.\n• Lay's Valentines: A massive brand-campaign AI success story.\n• Sathumart: Multi-style AI wallpaper creations.\n• Kooboon: Re-engineering social mobile dating matching.",
      contact: "Let's toast to a successful year and hire Neung! 🥂🎆\n• Email: darupong000@gmail.com\n• GitHub: github.com/darupong\nLet's build the future together!",
      unknown: "The countdown missed a beat! 🎉 Ask me about Neung's 'skills', 'experience', 'projects', or 'who is Neung' to start the fireworks!",
    },
  };

  const selectedResponse =
    responses[persona]?.[topic] || responses[persona]?.unknown || responses.standard.unknown;

  return {
    text: selectedResponse,
    avatar,
  };
}

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

const guideCommands = [
  "fastfetch",
  "snake",
  "projects",
  "skills",
  "experience",
  "resume",
  "contact",
  "help",
  "clear",
  "matrix",
  "ai",
  "guestbook",
  "easter-egg",
];

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
    shellClass: "text-white/80",
    accentClass: "text-emerald-400 font-bold",
    bodyClass: "bg-[#07080d]/90 font-mono text-emerald-300",
    buttonClass: "hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20",
    inputCaret: "caret-emerald-400 text-emerald-300",
  },
  powershell: {
    title: "PowerShell",
    promptUser: "PS C:\\Users\\neung",
    promptSuffix: ">",
    shellClass: "text-white/80",
    accentClass: "text-sky-400 font-bold",
    bodyClass: "bg-[#0b132b]/95 font-mono text-sky-200",
    buttonClass: "hover:bg-sky-500/10 hover:text-sky-400 hover:border-sky-500/20",
    inputCaret: "caret-sky-400 text-sky-200",
  },
};

function MatrixRain({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 400;
      height = canvas.height = canvas.parentElement?.clientHeight || 400;
    };
    window.addEventListener("resize", handleResize);

    const alphabet =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    const fontSize = 11;
    const columns = Math.floor(width / fontSize);

    const rainDrops: number[] = Array.from({ length: columns }).map(() => Math.random() * -100);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.055)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#0f0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const char = alphabet[Math.floor(Math.random() * alphabet.length)];
        const x = i * fontSize;
        const y = rainDrops[i] * fontSize;

        const dist = Math.hypot(x - mouseX, y - mouseY);
        if (dist < 42) {
          ctx.fillStyle = "#fff";
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#0f0";
        } else {
          ctx.fillStyle = "rgba(0, 255, 0, 0.82)";
          ctx.shadowBlur = 0;
        }

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        } else {
          rainDrops[i]++;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block bg-black rounded-lg" />
      <button
        type="button"
        onClick={onExit}
        className="absolute top-3 right-3 z-20 rounded-md border border-[#0f0]/30 bg-black/60 hover:bg-[#0f0]/20 px-3 py-1.5 text-xs text-[#0f0] font-bold tracking-widest transition-colors cursor-pointer select-none"
      >
        EXIT MATRIX
      </button>
    </div>
  );
}

export function HeroTerminal() {
  const { t } = useTranslation();
  const terminalThemeMode = useStore((state) => state.terminalThemeMode);
  const themePreset = useStore((state) => state.themePreset);
  const soundEnabled = useStore((state) => state.soundEnabled);

  const activePreset = themePreset === "auto" ? getSeasonalPreset() : themePreset;

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<TerminalTheme>("bash");
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentTheme = themeConfig[theme];

  const [geoData, setGeoData] = useState<{
    countryCode?: string;
    countryName?: string;
    cityName?: string;
    ipAddress?: string;
  } | null>(null);

  useEffect(() => {
    fetch("https://freeipapi.com/api/json")
      .then((res) => res.json())
      .then((data) => {
        setGeoData({
          countryCode: data.countryCode,
          countryName: data.countryName,
          cityName: data.cityName,
          ipAddress: data.ipAddress,
        });
        if (data.countryCode) {
          localStorage.setItem("visitor_country", data.countryCode);
        }
      })
      .catch(() => {});
  }, []);

  // Snake Game State
  const [gameActive, setGameActive] = useState(false);
  const [snake, setSnake] = useState<Array<[number, number]>>([
    [6, 6],
    [6, 7],
    [6, 8],
  ]);
  const [snakeDir, setSnakeDir] = useState<[number, number]>([0, -1]); // moving up
  const [food, setFood] = useState<[number, number]>([3, 3]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const val = localStorage.getItem("snake_high_score");
    return val ? parseInt(val, 10) : 0;
  });
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [matrixActive, setMatrixActive] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);

  const getNewFoodPosition = (currentSnake: Array<[number, number]>): [number, number] => {
    let newFood: [number, number];
    let attempts = 0;
    do {
      newFood = [Math.floor(Math.random() * 12), Math.floor(Math.random() * 12)];
      attempts++;
    } while (currentSnake.some(([x, y]) => x === newFood[0] && y === newFood[1]) && attempts < 100);
    return newFood;
  };

  useEffect(() => {
    if (gameState !== "playing" || !gameActive) return;

    const tick = () => {
      setSnake((currentSnake) => {
        const head = currentSnake[0];
        const nextHead: [number, number] = [head[0] + snakeDir[0], head[1] + snakeDir[1]];

        // Wall collision
        if (nextHead[0] < 0 || nextHead[0] >= 12 || nextHead[1] < 0 || nextHead[1] >= 12) {
          setGameState("gameover");
          if (soundEnabled) playHolidayChime("halloween"); // spooky crash sound
          return currentSnake;
        }

        // Tail collision
        if (currentSnake.some(([x, y]) => x === nextHead[0] && y === nextHead[1])) {
          setGameState("gameover");
          if (soundEnabled) playHolidayChime("halloween");
          return currentSnake;
        }

        const newSnake = [nextHead, ...currentSnake];

        // Eat food
        if (nextHead[0] === food[0] && nextHead[1] === food[1]) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem("snake_high_score", String(nextScore));
            }
            return nextScore;
          });
          setFood(getNewFoodPosition(newSnake));
          if (soundEnabled) playHolidayChime(activePreset ?? "standard");
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(tick, 150);
    return () => clearInterval(interval);
  }, [gameState, gameActive, snakeDir, food, soundEnabled, activePreset, highScore]);

  // Bind key listeners for Snake Game
  useEffect(() => {
    if (!gameActive || gameState !== "playing") return;

    const handleGameKeys = (e: KeyboardEvent | any) => {
      const key = e.key.toLowerCase();
      if ((key === "arrowup" || key === "w") && snakeDir[1] !== 1) {
        setSnakeDir([0, -1]);
      } else if ((key === "arrowdown" || key === "s") && snakeDir[1] !== -1) {
        setSnakeDir([0, 1]);
      } else if ((key === "arrowleft" || key === "a") && snakeDir[0] !== 1) {
        setSnakeDir([-1, 0]);
      } else if ((key === "arrowright" || key === "d") && snakeDir[0] !== -1) {
        setSnakeDir([1, 0]);
      }
    };

    window.addEventListener("keydown", handleGameKeys);
    return () => window.removeEventListener("keydown", handleGameKeys);
  }, [gameActive, gameState, snakeDir]);

  // Command History helper
  useEffect(() => {
    setHistory([
      {
        type: "output",
        text: `Welcome to Darupong Chouypu's interactive CLI portfolio terminal.\nActive Preset theme: ${activePreset ? activePreset.toUpperCase() : "STANDARD"}\n\nType 'help' to view all available commands.`,
      },
    ]);
  }, [t, activePreset]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [history]);

  const getClientStatsText = () => {
    const os = navigator.userAgent.includes("Mac") ? "macOS" : navigator.userAgent.includes("Win") ? "Windows" : "Linux";
    const browser = navigator.userAgent.includes("Chrome") ? "Chrome" : navigator.userAgent.includes("Firefox") ? "Firefox" : navigator.userAgent.includes("Safari") ? "Safari" : "Browser";
    const resolution = `${window.screen.width}x${window.screen.height}`;
    const location = geoData ? `${geoData.cityName || "Bangkok"}, ${geoData.countryName || "Thailand"}` : "Bangkok, Thailand";
    const ip = geoData ? geoData.ipAddress || "127.0.0.1" : "127.0.0.1";
    const holidayPresetName = activePreset ? activePreset.charAt(0).toUpperCase() + activePreset.slice(1) : "Standard Presets 🌌";
    
    return `
      .---.         neung@darupong-portfolio
     /     \\        ------------------------
    | () () |       OS: ${os}
     \\  ^  /        Browser: ${browser}
      |||||         Resolution: ${resolution}
     /     \\        Timezone: UTC+7 (ICT)
    |       |       Active Preset: ${holidayPresetName}
    |   *   |       Location: ${location}
     \\_____/        IP Address: ${ip}
    `;
  };

  const holidayEasterEggs = useMemo(
    () => ({
      christmas: {
        cmds: ["snow", "santa"],
        art: `
         *
        / \\
       /   \\
      /     \\
     /       \\
    /_________\\
        |||
  Merry Christmas! 🎄❄️`,
      },
      halloween: {
        cmds: ["spook", "ghost"],
        art: `
     .-.
    (o o)
    | O \\
     \\   \\
     \`"""\`
  Happy Halloween! 🎃👻`,
      },
      songkran: {
        cmds: ["splash", "water"],
        art: `
     ~.~.~.~.~.~.~
   ~~  💦 🔫 💦  ~~
   ~~  Splasssh! ~~
     ~.~.~.~.~.~.~
  Happy Songkran! 💦🌊`,
      },
      newyear: {
        cmds: ["fireworks", "countdown"],
        art: `
      \\  |  /
    -- *🎆* --
      /  |  \\
   ✨ 2026 ✨
  Happy New Year! 🎆✨`,
      },
      valentine: {
        cmds: ["love", "heart"],
        art: `
     .-''-.  .-''-.
    /  _   \\/   _  \\
   |  / \\      / \\  |
   |  |  '    '  |  |
    \\  \\        /  /
     \\  \\      /  /
      \\  '    '  /
       \\   ''   /
        \\      /
         \\    /
          \\  /
           \\/
   Happy Valentine's Day! 💖🌹`,
      }
    }),
    []
  );

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

  const runCommand = (rawCommand: string) => {
    const command = rawCommand.trim().toLowerCase();
    if (!command || loading) return;

    if (command === "clear") {
      setHistory([]);
      setInput("");
      setHistoryIndex(null);
      return;
    }

    if (command === "easter-egg") {
      setCommandHistory((current) => [...current, command].slice(-20));
      setHistoryIndex(null);
      setHistory((current) => [
        ...current,
        { type: "command", text: command },
        {
          type: "output",
          text: "🎁 Tip: Try switching to one of the seasonal themes (e.g. Christmas, New Year, Halloween, Valentine, Songkran) in the settings menu (top right) to unlock special terminal commands!"
        }
      ]);
      setInput("");
      return;
    }

    if (command === "fastfetch") {
      setCommandHistory((current) => [...current, command].slice(-20));
      setHistoryIndex(null);
      setHistory((current) => [
        ...current,
        { type: "command", text: rawCommand },
        { type: "loading", text: t("hero.terminal.loading") },
      ]);
      setInput("");
      setLoading(true);

      window.setTimeout(() => {
        setHistory((current) => [
          ...current.filter((entry) => entry.type !== "loading"),
          {
            type: "output",
            text: getClientStatsText(),
            format: "pre",
          },
        ]);
        setLoading(false);
      }, 520);
      return;
    }

    if (command === "snake") {
      setCommandHistory((current) => [...current, command].slice(-20));
      setHistoryIndex(null);
      setInput("");
      setGameActive(true);
      setGameState("playing");
      setSnake([[6, 6], [6, 7], [6, 8]]);
      setSnakeDir([0, -1]);
      setScore(0);
      const rf = getNewFoodPosition([[6, 6], [6, 7], [6, 8]]);
      setFood(rf);

      setHistory((current) => [
        ...current,
        { type: "command", text: rawCommand },
        { type: "output", text: "🐍 Snake Game started! Use WASD or Arrow Keys to move." }
      ]);
      return;
    }

    if (command === "matrix") {
      setCommandHistory((current) => [...current, command].slice(-20));
      setHistoryIndex(null);
      setInput("");
      setMatrixActive(true);
      setHistory((current) => [
        ...current,
        { type: "command", text: rawCommand },
        { type: "output", text: "🟢 Matrix digital rain code activated! Enjoy the rain." }
      ]);
      return;
    }

    if (command === "ai" || command.startsWith("ai ")) {
      setCommandHistory((current) => [...current, rawCommand].slice(-20));
      setHistoryIndex(null);
      setInput("");

      const query = rawCommand.substring(2).trim();
      const { text: responseText, avatar: botAvatar } = getAIResponse(query, activePreset ?? "midnight");

      setHistory((current) => [
        ...current,
        { type: "command", text: rawCommand },
        { type: "loading", text: "AI is thinking..." }
      ]);
      setLoading(true);

      window.setTimeout(() => {
        setHistory((current) => [
          ...current.filter((entry) => entry.type !== "loading"),
          {
            type: "output",
            text: `${botAvatar}:\n${responseText}`,
            typewriter: true,
          }
        ]);
        setLoading(false);
      }, 550);
      return;
    }

    if (command === "guestbook" || command.startsWith("guestbook ")) {
      setCommandHistory((current) => [...current, rawCommand].slice(-20));
      setHistoryIndex(null);
      setInput("");

      const parts = rawCommand.trim().split(" ");
      const action = parts[1]?.toLowerCase();

      if (action === "sign") {
        const message = rawCommand.substring(rawCommand.indexOf("sign") + 4).trim().replace(/^["']|["']$/g, "");
        if (!message) {
          setHistory((current) => [
            ...current,
            { type: "command", text: rawCommand },
            { type: "output", text: "❌ Error: Please specify a message! Example: guestbook sign \"Hello from Thailand!\"", format: "error" }
          ]);
          return;
        }

        const locationName = geoData ? `${geoData.cityName || "Bangkok"}, ${geoData.countryName || "Thailand"}` : "Bangkok, Thailand";
        const countryCode = geoData?.countryCode || "TH";
        
        const flags: Record<string, string> = {
          TH: "🇹🇭", US: "🇺🇸", JP: "🇯🇵", GB: "🇬🇧", SG: "🇸🇬", DE: "🇩🇪", FR: "🇫🇷", IN: "🇮🇳", CN: "🇨🇳", CA: "🇨🇦"
        };
        const flag = flags[countryCode] || "🌐";

        const newSignature = {
          message,
          location: `${flag} ${locationName}`,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          countryCode
        };

        const existingStr = localStorage.getItem("guestbook_signatures") || "[]";
        const existing = JSON.parse(existingStr);
        existing.unshift(newSignature);
        localStorage.setItem("guestbook_signatures", JSON.stringify(existing));

        window.dispatchEvent(new Event("guestbook_updated"));

        setHistory((current) => [
          ...current,
          { type: "command", text: rawCommand },
          { type: "output", text: `✍️ Signature recorded! Thank you for visiting Neung's portfolio.\nMessage: "${message}"\nLocation: ${flag} ${locationName}` }
        ]);
        return;
      }

      const existingStr = localStorage.getItem("guestbook_signatures") || "[]";
      const existing = JSON.parse(existingStr);
      let outputText = "📖 === Neung's Portfolio Guestbook === 📖\n\n";
      
      if (existing.length === 0) {
        outputText += "No signatures yet. Be the first to sign the guestbook! ✍️\n";
      } else {
        existing.slice(0, 5).forEach((sig: any, i: number) => {
          outputText += `[${i + 1}] "${sig.message}"\n   — Left by visitor from ${sig.location} on ${sig.date}\n\n`;
        });
      }

      outputText += "💡 To leave your signature, type:\n   guestbook sign \"[Your message]\"";

      setHistory((current) => [
        ...current,
        { type: "command", text: rawCommand },
        { type: "output", text: outputText }
      ]);
      return;
    }

    // Intercept Holiday Easter Eggs
    let isHolidayEasterEgg = false;
    let holidayOutput = "";
    
    for (const [holidayKey, value] of Object.entries(holidayEasterEggs)) {
      if (value.cmds.includes(command)) {
        isHolidayEasterEgg = true;
        if (activePreset === holidayKey) {
          holidayOutput = value.art;
        } else {
          const holidayName = holidayKey.charAt(0).toUpperCase() + holidayKey.slice(1);
          holidayOutput = `⚠️ This command is only active during the [${holidayName}] theme preset!\nTry switching your theme preset in the settings (top right) first.`;
        }
        break;
      }
    }

    const isKnownCommand = isHolidayEasterEgg || (command in commandMap);
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
          text: isHolidayEasterEgg
            ? holidayOutput
            : isKnownCommand
              ? commandMap[command as keyof typeof commandMap]
              : `command not found: ${command}\nType 'help' to see all valid commands.`,
          format: (command === "fastfetch" || isHolidayEasterEgg) ? "pre" : "text",
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

  const activeGuideCommands = useMemo(() => {
    const list = [...guideCommands];
    if (activePreset === "christmas") {
      list.push("snow 🎄");
    } else if (activePreset === "halloween") {
      list.push("ghost 👻");
    } else if (activePreset === "valentine") {
      list.push("love 💖");
    } else if (activePreset === "songkran") {
      list.push("splash 💦");
    } else if (activePreset === "newyear") {
      list.push("fireworks 🎆");
    } else {
      list.push("easter-egg 🎁");
    }
    return list;
  }, [activePreset]);

  const cleanCommand = (cmd: string) => {
    return cmd.replace(/[^\w-]/g, "").trim().toLowerCase();
  };

  return (
    <div className="font-mono">
      <div className="glass-card overflow-hidden rounded-2xl p-0 flex flex-col">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.055] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-xs text-white/40">{currentTheme.title}</span>
          <div className="ml-auto flex rounded-md border border-white/10 bg-black/10 p-0.5">
            {(["bash", "powershell"] as const).map((terminalTheme) => (
              <button
                key={terminalTheme}
                type="button"
                onClick={() => setTheme(terminalTheme)}
                className={`rounded px-2 py-0.5 text-[10px] transition-colors cursor-pointer ${
                  theme === terminalTheme ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
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
          {gameActive ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="flex items-center justify-between w-full max-w-xs px-2">
                <div className="text-emerald-400 font-bold text-sm select-none">🐍 Retro Snake Game</div>
                <div className="text-white/60 text-xs flex gap-3 select-none">
                  <span>Score: <b className="text-white">{score}</b></span>
                  <span>High: <b className="text-white">{highScore}</b></span>
                </div>
              </div>

              <div className="border border-white/10 bg-black/60 font-mono text-[10px] leading-[1.0] p-3 rounded-lg shadow-inner select-none tracking-[0.2em] text-center">
                {Array.from({ length: 12 }).map((_, y) => {
                  let rowStr = "";
                  for (let x = 0; x < 12; x++) {
                    const isSnake = snake.some(([sx, sy]) => sx === x && sy === y);
                    const isFood = food[0] === x && food[1] === y;
                    rowStr += isSnake ? "■" : isFood ? "🍎" : "·";
                  }
                  return (
                    <div key={y} className="text-white/50 font-mono h-[14px]">
                      {rowStr}
                    </div>
                  );
                })}
              </div>

              {gameState === "gameover" ? (
                <div className="text-center space-y-2 select-none">
                  <p className="text-red-400 font-bold text-sm">💥 GAME OVER!</p>
                  <div className="flex gap-2 justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        setSnake([[6, 6], [6, 7], [6, 8]]);
                        setSnakeDir([0, -1]);
                        setScore(0);
                        const rf = getNewFoodPosition([[6, 6], [6, 7], [6, 8]]);
                        setFood(rf);
                        setGameState("playing");
                      }}
                      className="rounded bg-emerald-500 hover:bg-emerald-600 px-3 py-1 text-xs text-black font-bold transition-colors cursor-pointer"
                    >
                      Play Again
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGameActive(false);
                        setGameState("idle");
                        setHistory((current) => [
                          ...current,
                          { type: "output", text: `Game exited. Final score: ${score}` },
                        ]);
                      }}
                      className="rounded border border-white/20 bg-white/5 hover:bg-white/10 px-3 py-1 text-xs text-white/80 transition-colors cursor-pointer"
                    >
                      Exit Game
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center select-none">
                  <p className="text-white/40 text-[10px] animate-pulse">Use WASD or Arrows to Navigate</p>
                  <button
                    type="button"
                    onClick={() => {
                      setGameActive(false);
                      setGameState("idle");
                      setHistory((current) => [
                        ...current,
                        { type: "output", text: `Game exited. Score: ${score}` },
                      ]);
                    }}
                    className="mt-2 rounded border border-white/20 bg-white/5 hover:bg-white/10 px-2 py-0.5 text-[10px] text-white/50 transition-colors cursor-pointer"
                  >
                    Quit Game
                  </button>
                </div>
              )}
            </div>
          ) : matrixActive ? (
            <MatrixRain onExit={() => {
              setMatrixActive(false);
              setHistory((current) => [
                ...current,
                { type: "output", text: "Matrix rain mode deactivated. Welcome back!" }
              ]);
            }} />
          ) : (
            <>
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

                  const isTypewriter = (entry as any).typewriter === true;
                  return (
                    <motion.p
                      key={`${entry.text}-${index}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className="whitespace-pre-line leading-relaxed text-white/64"
                    >
                      {isTypewriter ? <TypewriterText text={entry.text} /> : entry.text}
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
                  onChange={(event) => {
                    setInput(event.target.value);
                    if (soundEnabled) playKeyboardClick();
                  }}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                  aria-label={t("hero.terminal.inputLabel")}
                  autoComplete="off"
                  spellCheck={false}
                  className={`min-w-0 flex-1 border-none bg-transparent text-white/78 outline-none placeholder:text-white/28 disabled:cursor-wait ${currentTheme.inputCaret}`}
                  placeholder={t("hero.terminal.placeholder")}
                />
              </form>
            </>
          )}
        </div>

        {/* Integrated Quick Guides Bar inside the Console footprint! */}
        <div className="border-t border-white/10 bg-white/[0.02] px-4 py-2.5 rounded-b-2xl relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-white/30 tracking-wider font-semibold select-none">Console Command Guides</span>
            <div className="relative">
              <button
                type="button"
                onClick={() => setGuidesOpen(!guidesOpen)}
                className={`rounded border border-white/10 bg-white/5 hover:bg-white/10 px-2 py-0.5 text-[10px] text-white/60 transition-colors flex items-center gap-1 cursor-pointer select-none`}
              >
                Guides Menu ▾
              </button>

              {/* Floating Menu overlay */}
              {guidesOpen && (
                <div className="absolute right-0 bottom-7 z-30 w-44 rounded-xl border border-white/10 bg-[#07080d]/95 p-1.5 shadow-2xl space-y-0.5 max-h-48 overflow-y-auto no-scrollbar">
                  {activeGuideCommands.map((command) => {
                    let label = command;
                    if (command === "ai") label = "ai 🤖";
                    else if (command === "guestbook") label = "guestbook 📖";
                    else if (command === "matrix") label = "matrix 🟢";
                    else if (command === "snake") label = "snake 🐍";
                    else if (command === "fastfetch") label = "fastfetch 🚀";
                    return (
                      <button
                        key={command}
                        type="button"
                        onClick={() => {
                          const cleaned = cleanCommand(command);
                          if (cleaned === "ai") {
                            setInput("ai ");
                            window.setTimeout(() => {
                              document.getElementById("hero-terminal-input")?.focus();
                            }, 20);
                          } else if (cleaned === "guestbook") {
                            setInput("guestbook sign ");
                            window.setTimeout(() => {
                              document.getElementById("hero-terminal-input")?.focus();
                            }, 20);
                          } else {
                            runCommand(cleaned);
                          }
                          setGuidesOpen(false);
                          if (soundEnabled) playKeyboardClick();
                        }}
                        disabled={loading}
                        className={`w-full text-left rounded-md px-2 py-1 text-[11px] text-white/60 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-40 cursor-pointer`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
