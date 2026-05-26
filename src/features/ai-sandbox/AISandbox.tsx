import { useEffect, useRef, useState } from "react";
import { Sparkles, Terminal, Activity, FileImage, ArrowRight, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore, getSeasonalPreset } from "@/store/useStore";

interface PromptPreset {
  id: string;
  label: string;
  prompt: string;
  image: string;
  nodeLabel: string;
}

const promptPresets: PromptPreset[] = [
  {
    id: "portrait",
    label: "AI Portrait 👤",
    prompt: "High-quality professional AI portrait photo of a senior developer, soft studio light, ultra-realistic, 8k resolution, octane render",
    image: "/img/optimized/looklike.jpg",
    nodeLabel: "Looklike.ai Generator",
  },
  {
    id: "campaign",
    label: "Brand Campaign 💖",
    prompt: "Romantic AI couple enjoying snacks together, Valentine's day theme, cozy lighting, warm cinematic color grading",
    image: "/img/optimized/lays.jpg",
    nodeLabel: "Lay's Valentines Event",
  },
  {
    id: "wallpaper",
    label: "Sathumart Wallpaper 🌌",
    prompt: "A beautiful sci-fi cyberpunk illustration of a futuristic landscape, neon glowing symbols, mystical atmosphere",
    image: "/img/optimized/sathumart.jpg",
    nodeLabel: "Sathumart Canvas",
  },
  {
    id: "metaverse",
    label: "3D Virtual Tour 🌐",
    prompt: "Futuristic virtual 3D exposition hall, digital art, metaverse pavilion, modular architecture, Unreal Engine 5 render",
    image: "/img/optimized/gssd.jpg",
    nodeLabel: "GSSD Metaverse Pavilion",
  },
];

export function AISandbox() {
  const themePreset = useStore((state) => state.themePreset);
  const activePreset = themePreset === "auto" ? getSeasonalPreset() : themePreset;

  const [prompt, setPrompt] = useState(promptPresets[0].prompt);
  const [activeId, setActiveId] = useState(promptPresets[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [activeNode, setActiveNode] = useState<"prompt" | "sampler" | "vae" | "output" | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const neonText =
    activePreset === "christmas"
      ? "text-red-400"
      : activePreset === "halloween"
        ? "text-purple-400"
        : activePreset === "valentine"
          ? "text-pink-400"
          : "text-cyan-400";

  const neonBorder =
    activePreset === "christmas"
      ? "border-red-500/30"
      : activePreset === "halloween"
        ? "border-purple-500/30"
        : activePreset === "valentine"
          ? "border-pink-500/30"
          : "border-cyan-500/30";

  const neonGlow =
    activePreset === "christmas"
      ? "shadow-[0_0_20px_rgba(239,68,68,0.22)] border-red-500/40 bg-red-500/10 text-red-200"
      : activePreset === "halloween"
        ? "shadow-[0_0_20px_rgba(168,85,247,0.22)] border-purple-500/40 bg-purple-500/10 text-purple-200"
        : activePreset === "valentine"
          ? "shadow-[0_0_20px_rgba(236,72,153,0.22)] border-pink-500/40 bg-pink-500/10 text-pink-200"
          : "shadow-[0_0_20px_rgba(34,211,238,0.22)] border-cyan-500/40 bg-cyan-500/10 text-cyan-200";

  // Pre-load preset images
  useEffect(() => {
    promptPresets.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });
  }, []);

  const selectedPreset = promptPresets.find((p) => p.id === activeId) || promptPresets[0];

  const handlePresetSelect = (p: PromptPreset) => {
    if (isGenerating) return;
    setActiveId(p.id);
    setPrompt(p.prompt);
  };

  const handleGenerate = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setCurrentStep(0);
    setActiveNode("prompt");

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = selectedPreset.image;
    
    img.onload = () => {
      imageRef.current = img;
      runPipeline();
    };
  };

  const runPipeline = () => {
    let step = 0;
    const totalSteps = 20;

    const tick = () => {
      step++;
      setCurrentStep(step);

      // Distribute node lighting states based on step completion
      if (step < 4) {
        setActiveNode("prompt");
      } else if (step < 16) {
        setActiveNode("sampler");
      } else if (step < 19) {
        setActiveNode("vae");
      } else {
        setActiveNode("output");
      }

      // Draw Denoising Simulation on Canvas
      drawDenoise(step, totalSteps);

      if (step < totalSteps) {
        animationRef.current = window.setTimeout(tick, 140);
      } else {
        setIsGenerating(false);
      }
    };

    tick();
  };

  const drawDenoise = (step: number, total: number) => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = (canvas.width = 160);
    const h = (canvas.height = 110);

    ctx.clearRect(0, 0, w, h);

    // Calculate progression percentages
    const pct = step / total;
    
    // Simulate stable diffusion denoising grid blocks shrinking
    const maxBlockSize = 25;
    const minBlockSize = 1;
    const blockSize = Math.round(maxBlockSize * (1 - pct) + minBlockSize);

    // Temp canvas to resize image
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    tempCtx.drawImage(img, 0, 0, w, h);
    const imgData = tempCtx.getImageData(0, 0, w, h).data;

    // Draw pixelated blocks matching the block size
    for (let y = 0; y < h; y += blockSize) {
      for (let x = 0; x < w; x += blockSize) {
        const pixelIdx = (Math.min(y, h - 1) * w + Math.min(x, w - 1)) * 4;
        
        let r = imgData[pixelIdx];
        let g = imgData[pixelIdx + 1];
        let b = imgData[pixelIdx + 2];

        // Add random gray/color noise that decays as denoising proceeds
        const noiseFactor = (1 - pct) * 120;
        if (noiseFactor > 0) {
          r = Math.max(0, Math.min(255, r + (Math.random() - 0.5) * noiseFactor));
          g = Math.max(0, Math.min(255, g + (Math.random() - 0.5) * noiseFactor));
          b = Math.max(0, Math.min(255, b + (Math.random() - 0.5) * noiseFactor));
        }

        ctx.fillStyle = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        ctx.fillRect(x, y, blockSize, blockSize);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) clearTimeout(animationRef.current);
    };
  }, []);

  return (
    <section id="ai-sandbox" className="section-pad relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <span className="status-badge inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-xs text-cyan-200">
            <Sparkles size={13} className="animate-pulse" />
            AI Pipeline Sandbox
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 tracking-tight leading-tight">
            Mock-Live AI Generation Lab
          </h2>
          <p className="text-sm sm:text-base text-white/50 max-w-2xl mt-3 font-light">
            Experience a simulated client-side Stable Diffusion diffusion workflow mapping Neung's portfolio project assets through a node-graph generation sampler.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-stretch">
          
          {/* Prompt Controller */}
          <div className="glass-card flex flex-col justify-between p-6 rounded-2xl border border-white/10 relative overflow-hidden bg-black/20">
            <div>
              <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-wider text-white/40 font-bold">
                <Terminal size={14} className={neonText} />
                <span>Pipeline Prompt Injector</span>
              </div>

              {/* Prompt selection chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {promptPresets.map((p) => {
                  const isActive = activeId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePresetSelect(p)}
                      disabled={isGenerating}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all duration-200 cursor-pointer ${
                        isActive ? neonGlow : "bg-white/5 border-white/5 text-white/40 hover:text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>

              {/* Editable prompt textarea */}
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => !isGenerating && setPrompt(e.target.value)}
                  disabled={isGenerating}
                  rows={4}
                  placeholder="Enter a prompt to seed generative pipeline..."
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs font-mono text-white/80 placeholder:text-white/20 focus:outline-none focus:border-cyan-400/40 focus:ring-1 focus:ring-cyan-400/20 disabled:opacity-60 resize-none leading-relaxed transition-all"
                />
                <div className="absolute right-2.5 bottom-3.5 text-[9px] font-mono text-white/20 select-none">
                  Stable Diffusion SDXL
                </div>
              </div>
            </div>

            {/* Run Button */}
            <div className="mt-6 border-t border-white/5 pt-5 flex items-center justify-between">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                {isGenerating ? `Sampling: Step ${currentStep} / 20` : "Pipeline Idle"}
              </span>
              
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-xs font-bold font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                  isGenerating
                    ? "bg-white/5 border-white/10 text-white/30 cursor-wait animate-pulse"
                    : `bg-white text-black hover:-translate-y-0.5 shadow-lg active:scale-95 ${neonBorder}`
                }`}
              >
                {isGenerating ? (
                  <>
                    <Activity size={14} className="animate-spin text-cyan-400" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Play size={12} fill="currentColor" />
                    Generate AI Image ⚡
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Node Graph Visualizer */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 relative bg-black/20 flex flex-col justify-between overflow-hidden select-none">
            
            {/* SVG Glowing Connector lines */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="none">
                {/* Prompt Node to Sampler Node */}
                <path
                  d="M 170 110 C 230 110, 230 110, 290 110"
                  fill="none"
                  stroke={activeNode === "sampler" || activeNode === "prompt" ? "rgba(34, 211, 238, 0.45)" : "rgba(255,255,255,0.06)"}
                  strokeWidth={activeNode === "sampler" ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                />
                
                {/* Sampler Node to VAE Decode */}
                <path
                  d="M 430 110 C 490 110, 490 270, 430 270"
                  fill="none"
                  stroke={activeNode === "vae" || activeNode === "sampler" ? "rgba(34, 211, 238, 0.45)" : "rgba(255,255,255,0.06)"}
                  strokeWidth={activeNode === "vae" ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                />

                {/* VAE Decode to Output Preview */}
                <path
                  d="M 290 270 C 230 270, 230 270, 170 270"
                  fill="none"
                  stroke={activeNode === "output" || activeNode === "vae" ? "rgba(34, 211, 238, 0.45)" : "rgba(255,255,255,0.06)"}
                  strokeWidth={activeNode === "output" ? "2.5" : "1.5"}
                  className="transition-all duration-300"
                />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-2 gap-x-12 gap-y-10 items-center justify-center">
              
              {/* NODE 1: Prompt Input Node */}
              <div className={`glass-card p-3 rounded-xl border flex flex-col justify-between h-[156px] transition-all duration-300 ${
                activeNode === "prompt" ? neonGlow : "border-white/10"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-semibold">CLIP Text Encode</span>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeNode === "prompt" ? "bg-cyan-400 animate-ping" : "bg-white/10"}`} />
                </div>
                <div className="my-auto py-2">
                  <p className="text-[10px] font-mono text-white/70 line-clamp-3 bg-black/40 p-2 rounded-lg leading-relaxed">
                    "{prompt}"
                  </p>
                </div>
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-wider">Node 01 // Input</span>
              </div>

              {/* NODE 2: K-Sampler Node (The core simulation) */}
              <div className={`glass-card p-3 rounded-xl border flex flex-col justify-between h-[156px] transition-all duration-300 ${
                activeNode === "sampler" ? neonGlow : "border-white/10"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-semibold">KSampler (Denoise)</span>
                  <span className="text-[9px] font-mono font-bold text-cyan-300/80">
                    {isGenerating && activeNode === "sampler" ? `Steps: ${currentStep}/20` : "Ready"}
                  </span>
                </div>
                
                <div className="my-auto flex items-center justify-center">
                  <div className="relative w-[110px] h-[76px] rounded-lg overflow-hidden bg-black/50 border border-white/5 flex items-center justify-center">
                    {/* Live Denoise Canvas */}
                    <canvas
                      ref={canvasRef}
                      className="w-full h-full block"
                      style={{ imageRendering: "pixelated" }}
                    />
                    
                    {/* Bouncy progress overlay on rendering */}
                    {isGenerating && activeNode === "sampler" && (
                      <div className="absolute inset-0 bg-cyan-400/5 flex flex-col items-center justify-center gap-1 select-none pointer-events-none">
                        <Activity size={15} className="animate-spin text-cyan-400/80" />
                        <span className="text-[8px] font-mono text-cyan-300 uppercase tracking-widest font-black">Sampling</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-wider">Node 02 // Denoise</span>
              </div>

              {/* NODE 3: VAE Decode Node */}
              <div className={`glass-card p-3 rounded-xl border flex flex-col justify-between h-[156px] transition-all duration-300 ${
                activeNode === "vae" ? neonGlow : "border-white/10"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-semibold">VAE Decode</span>
                  <div className={`h-1.5 w-1.5 rounded-full ${activeNode === "vae" ? "bg-cyan-400 animate-ping" : "bg-white/10"}`} />
                </div>
                
                <div className="my-auto py-2 flex flex-col items-center text-center">
                  <div className={`p-2.5 rounded-full bg-white/5 border border-white/5 transition-transform duration-300 ${
                    activeNode === "vae" ? "rotate-180 scale-110 border-cyan-400/20 text-cyan-400 bg-cyan-400/5" : "text-white/30"
                  }`}>
                    <Activity size={20} className={activeNode === "vae" ? "animate-pulse" : ""} />
                  </div>
                  <span className="text-[9px] font-mono text-white/50 mt-1">Latent ➔ Pixels</span>
                </div>
                
                <span className="text-[8px] font-mono text-white/20 uppercase tracking-wider">Node 03 // VAE</span>
              </div>

              {/* NODE 4: Output Preview Node */}
              <div className={`glass-card p-3 rounded-xl border flex flex-col justify-between h-[156px] transition-all duration-300 ${
                activeNode === "output" || (!isGenerating && currentStep === 20) ? neonGlow : "border-white/10"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest font-semibold">Output Preview</span>
                  <span className="text-[8.5px] font-mono font-black text-cyan-300/80">1024x1024</span>
                </div>
                
                <div className="my-auto flex items-center justify-center">
                  <div className="relative w-[110px] h-[76px] rounded-lg overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center p-0.5 group">
                    <AnimatePresence mode="wait">
                      {currentStep === 20 ? (
                        <motion.img
                          key={selectedPreset.id}
                          src={selectedPreset.image}
                          alt={selectedPreset.nodeLabel}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-white/15 gap-1 font-mono text-[8px] uppercase select-none">
                          <FileImage size={15} />
                          <span>Standby</span>
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Target project title overlay */}
                    {currentStep === 20 && (
                      <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-1 text-center text-white select-none">
                        <p className="text-[8.5px] font-bold font-mono">{selectedPreset.nodeLabel}</p>
                        <a
                          href="#projects"
                          className="mt-1.5 flex items-center gap-0.5 text-[7px] uppercase font-black text-cyan-300 hover:text-white transition-colors"
                        >
                          Showcase <ArrowRight size={8} />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <span className="text-[8px] font-mono text-white/20 uppercase tracking-wider">Node 04 // Result</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
