import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, Music } from "lucide-react";
import { useStore, getSeasonalPreset } from "@/store/useStore";

export function ProceduralSynth() {
  const themePreset = useStore((state) => state.themePreset);
  const activePreset = themePreset === "auto" ? getSeasonalPreset() : themePreset;

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [activePresetTitle, setActivePresetTitle] = useState("Midnight");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sequencerTimerRef = useRef<number | null>(null);
  const currentStepRef = useRef(0);

  const presetLabels: Record<string, string> = {
    midnight: "Midnight Bassline 🌌",
    pearl: "Pearl Ambience ⚪",
    ubuntu: "Ubuntu Arpeggio 🟠",
    cyber: "Cyber Chiptune ⚡",
    christmas: "Christmas Jingle Bells 🎄❄️",
    halloween: "Halloween Creepy Chords 🎃👻",
    valentine: "Valentine Sweet Scale 💖🌹",
    songkran: "Songkran Water Droplets 💦🌊",
    newyear: "New Year Celebration 🎆✨",
  };

  useEffect(() => {
    const preset = activePreset ?? "midnight";
    setActivePresetTitle(presetLabels[preset] || "Midnight Bassline 🌌");
  }, [activePreset]);

  // Adjust volume dynamically
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume * 0.15, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  const initAudio = () => {
    if (audioCtxRef.current) return;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    const analyser = ctx.createAnalyser();
    const gainNode = ctx.createGain();

    analyser.fftSize = 64;
    gainNode.gain.setValueAtTime(volume * 0.15, ctx.currentTime);

    gainNode.connect(analyser);
    analyser.connect(ctx.destination);

    audioCtxRef.current = ctx;
    analyserRef.current = analyser;
    gainNodeRef.current = gainNode;

    // Start Visualizer Canvas Draw loop
    drawVisualizer();
  };

  const playStep = (preset: string, time: number) => {
    const ctx = audioCtxRef.current;
    const gainNode = gainNodeRef.current;
    if (!ctx || !gainNode) return;

    const step = currentStepRef.current;

    // Synthesize notes depending on the active preset!
    if (preset === "christmas") {
      // Jingle Bells notes: E, E, E, E, E, E, E, G, C, D, E
      const notes = [659.25, 659.25, 659.25, 659.25, 659.25, 659.25, 659.25, 783.99, 523.25, 587.33, 659.25, 0, 0, 0, 0, 0];
      const freq = notes[step % notes.length];
      if (freq > 0) {
        // High-pitched chime bell sound
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        // Add ringing overtone
        const overtone = ctx.createOscillator();
        overtone.type = "triangle";
        overtone.frequency.setValueAtTime(freq * 2, time);

        noteGain.gain.setValueAtTime(0.3, time);
        noteGain.gain.exponentialRampToValueAtTime(0.01, time + 0.15);

        osc.connect(noteGain);
        overtone.connect(noteGain);
        noteGain.connect(gainNode);

        osc.start(time);
        overtone.start(time);
        osc.stop(time + 0.15);
        overtone.stop(time + 0.15);
      }
    } else if (preset === "halloween") {
      // Creepy minor-flat-five arpeggio
      const notes = [220.00, 233.08, 311.13, 440.00, 466.16, 622.25, 466.16, 440.00];
      const freq = notes[step % notes.length];
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, time);

      noteGain.gain.setValueAtTime(0.4, time);
      noteGain.gain.exponentialRampToValueAtTime(0.01, time + 0.35);

      osc.connect(noteGain);
      noteGain.connect(gainNode);

      osc.start(time);
      osc.stop(time + 0.35);
    } else if (preset === "valentine") {
      // Gentle romantic major arpeggios
      const notes = [261.63, 329.63, 392.00, 523.25, 329.63, 392.00, 523.25, 0];
      const freq = notes[step % notes.length];
      if (freq > 0) {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        noteGain.gain.setValueAtTime(0.3, time);
        noteGain.gain.exponentialRampToValueAtTime(0.01, time + 0.28);

        osc.connect(noteGain);
        noteGain.connect(gainNode);

        osc.start(time);
        osc.stop(time + 0.28);
      }
    } else if (preset === "songkran") {
      // Water droplet sounds (resonant filter swept short triggers)
      const notes = [440, 554.37, 659.25, 880, 554.37, 659.25, 880, 0];
      const freq = notes[step % notes.length];
      if (freq > 0 && step % 2 === 0) {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const noteGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        filter.type = "peaking";
        filter.frequency.setValueAtTime(freq * 1.5, time);
        filter.frequency.exponentialRampToValueAtTime(freq * 3, time + 0.08);
        filter.Q.setValueAtTime(12, time);

        noteGain.gain.setValueAtTime(0.5, time);
        noteGain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(gainNode);

        osc.start(time);
        osc.stop(time + 0.08);
      }
    } else if (preset === "newyear") {
      // Major upbeat synth loops
      const notes = [293.66, 329.63, 349.23, 392.00, 440.00, 392.00, 349.23, 329.63];
      const freq = notes[step % notes.length];
      const osc = ctx.createOscillator();
      const overtone = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, time);

      overtone.type = "sine";
      overtone.frequency.setValueAtTime(freq * 2, time);

      noteGain.gain.setValueAtTime(0.18, time);
      noteGain.gain.exponentialRampToValueAtTime(0.01, time + 0.22);

      osc.connect(noteGain);
      overtone.connect(noteGain);
      noteGain.connect(gainNode);

      osc.start(time);
      overtone.start(time);
      osc.stop(time + 0.22);
      overtone.stop(time + 0.22);
    } else {
      // standard presets: Retro midnight bassline (Cyberpunk bass synth)
      const bassline = [110.00, 110.00, 130.81, 110.00, 146.83, 110.00, 164.81, 110.00];
      const freq = bassline[step % bassline.length];
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const noteGain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, time);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(600, time);
      filter.frequency.exponentialRampToValueAtTime(150, time + 0.18);

      noteGain.gain.setValueAtTime(0.35, time);
      noteGain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(gainNode);

      osc.start(time);
      osc.stop(time + 0.18);
    }

    currentStepRef.current++;
  };

  const playSFX = (type: "sparkle" | "laser" | "pop" | "bell") => {
    initAudio();
    const ctx = audioCtxRef.current;
    const gainNode = gainNodeRef.current;
    if (!ctx || !gainNode) return;

    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    const time = ctx.currentTime;

    if (type === "sparkle") {
      // Sparkle Sweep: multiple fast ascending notes
      for (let i = 0; i < 6; i++) {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = "sine";
        const freq = 600 * Math.pow(1.2, i);
        osc.frequency.setValueAtTime(freq, time + i * 0.05);

        noteGain.gain.setValueAtTime(0.12 * volume, time + i * 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.001, time + i * 0.05 + 0.15);

        osc.connect(noteGain);
        noteGain.connect(gainNode);
        osc.start(time + i * 0.05);
        osc.stop(time + i * 0.05 + 0.15);
      }
    } else if (type === "laser") {
      // Cyber Laser: frequency sweep downwards
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1500, time);
      osc.frequency.exponentialRampToValueAtTime(150, time + 0.35);

      noteGain.gain.setValueAtTime(0.2 * volume, time);
      noteGain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      osc.connect(noteGain);
      noteGain.connect(gainNode);
      osc.start(time);
      osc.stop(time + 0.35);
    } else if (type === "pop") {
      // Water Pop: short resonant filter-swept bubble pop
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const noteGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(300, time);
      osc.frequency.exponentialRampToValueAtTime(1200, time + 0.08);

      filter.type = "peaking";
      filter.frequency.setValueAtTime(600, time);
      filter.Q.setValueAtTime(15, time);

      noteGain.gain.setValueAtTime(0.3 * volume, time);
      noteGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(gainNode);
      osc.start(time);
      osc.stop(time + 0.08);
    } else if (type === "bell") {
      // Crystal Bell: high chime with warm release
      const osc = ctx.createOscillator();
      const sub = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(987.77, time); // B5

      sub.type = "triangle";
      sub.frequency.setValueAtTime(493.88, time); // B4

      noteGain.gain.setValueAtTime(0.25 * volume, time);
      noteGain.gain.exponentialRampToValueAtTime(0.001, time + 0.8);

      osc.connect(noteGain);
      sub.connect(noteGain);
      noteGain.connect(gainNode);

      osc.start(time);
      sub.start(time);
      osc.stop(time + 0.8);
      sub.stop(time + 0.8);
    }
  };

  const startSynth = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    setIsPlaying(true);

    let nextNoteTime = ctx.currentTime;
    const scheduler = () => {
      // Schedule notes 100ms in advance
      while (nextNoteTime < ctx.currentTime + 0.1) {
        playStep(activePreset ?? "midnight", nextNoteTime);
        nextNoteTime += 0.22; // 220ms per step
      }
      sequencerTimerRef.current = window.setTimeout(scheduler, 25);
    };

    scheduler();
  };

  const stopSynth = () => {
    setIsPlaying(false);
    if (sequencerTimerRef.current) {
      clearTimeout(sequencerTimerRef.current);
      sequencerTimerRef.current = null;
    }
    currentStepRef.current = 0;
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopSynth();
    } else {
      startSynth();
    }
  };

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const width = (canvas.width = canvas.parentElement?.clientWidth || 250);
    const height = (canvas.height = 36);

    const draw = () => {
      if (!audioCtxRef.current) return;
      requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 1.6;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * height * 0.95;

        // Custom seasonal theme gradient bars
        const grad = ctx.createLinearGradient(0, height, 0, 0);
        if (activePreset === "christmas") {
          grad.addColorStop(0, "rgba(16, 185, 129, 0.4)");
          grad.addColorStop(1, "rgba(220, 38, 38, 0.85)");
        } else if (activePreset === "halloween") {
          grad.addColorStop(0, "rgba(168, 85, 247, 0.4)");
          grad.addColorStop(1, "rgba(249, 115, 22, 0.85)");
        } else if (activePreset === "valentine") {
          grad.addColorStop(0, "rgba(236, 72, 153, 0.4)");
          grad.addColorStop(1, "rgba(244, 63, 94, 0.85)");
        } else if (activePreset === "songkran") {
          grad.addColorStop(0, "rgba(34, 211, 238, 0.4)");
          grad.addColorStop(1, "rgba(6, 182, 212, 0.85)");
        } else if (activePreset === "newyear") {
          grad.addColorStop(0, "rgba(253, 224, 71, 0.4)");
          grad.addColorStop(1, "rgba(245, 158, 11, 0.85)");
        } else {
          grad.addColorStop(0, "rgba(99, 102, 241, 0.3)");
          grad.addColorStop(1, "rgba(34, 211, 238, 0.85)");
        }

        ctx.fillStyle = grad;
        ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    };

    draw();
  };

  return (
    <div className="glass-card flex flex-col justify-between h-[260px] p-4 rounded-2xl border border-white/10 relative overflow-hidden select-none">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes synthEqualizerBounce {
          0%, 100% { height: 4px; }
          50% { height: 26px; }
        }
        .equalizer-bar {
          animation: synthEqualizerBounce 0.8s ease-in-out infinite;
        }
      `}} />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handlePlayToggle}
          aria-label={isPlaying ? "Mute chiptune player" : "Play procedural chiptune player"}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all cursor-pointer ${
            isPlaying
              ? "bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 animate-pulse"
              : "bg-cyan-300/10 text-cyan-200 border border-cyan-300/20 hover:bg-cyan-300/20"
          }`}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/40 uppercase tracking-wider">
            <Music size={12} className={isPlaying ? "animate-spin text-accent-secondary" : ""} />
            <span>Theme Chiptune Synth</span>
          </div>
          <p className="truncate text-xs font-bold text-white/80">{activePresetTitle}</p>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2 px-1">
          <Volume2 size={13} className="text-white/40 shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Volume level"
            className="w-16 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-300"
          />
        </div>
      </div>

      {/* Analyzer frequency graph / standby Equalizer */}
      <div className="mt-3 w-full bg-black/20 rounded-lg p-1.5 h-10 flex items-center overflow-hidden border border-white/5 relative justify-center">
        {isPlaying ? (
          <canvas ref={canvasRef} className="w-full h-full block" />
        ) : (
          <div className="w-full h-full flex items-center justify-between px-2">
            <span className="text-[10px] text-white/45 font-mono tracking-widest font-bold uppercase select-none z-10">
              SYNTH STANDBY
            </span>
            <div className="flex items-end gap-1 h-7">
              {Array.from({ length: 15 }).map((_, i) => {
                const staticHeights = [6, 12, 18, 24, 20, 14, 8, 14, 20, 26, 20, 14, 8, 12, 6];
                const heightVal = staticHeights[i % staticHeights.length];
                return (
                  <div
                    key={i}
                    className="w-1 bg-cyan-400/30 rounded-full"
                    style={{
                      height: `${heightVal}px`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 4-Pad Retro Soundboard / SFX Launchpad */}
      <div className="mt-2.5 border-t border-white/5 pt-2.5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/35 font-semibold">
            Interactive Retro Soundboard
          </span>
          <span className="text-[10px] font-mono text-cyan-400/80 font-bold">
            SFX Pads
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: "sparkle" as const, name: "Sweep 🌌", color: "hover:bg-purple-500/10 hover:border-purple-500/30 text-purple-200 border-purple-500/20 active:bg-purple-500/20 active:border-purple-500/40" },
            { id: "laser" as const, name: "Laser ⚡", color: "hover:bg-amber-500/10 hover:border-amber-500/30 text-amber-200 border-amber-500/20 active:bg-amber-500/20 active:border-amber-500/40" },
            { id: "pop" as const, name: "Pop 💧", color: "hover:bg-cyan-500/10 hover:border-cyan-500/30 text-cyan-200 border-cyan-500/20 active:bg-cyan-500/20 active:border-cyan-500/40" },
            { id: "bell" as const, name: "Bell 🔔", color: "hover:bg-emerald-500/10 hover:border-emerald-500/30 text-emerald-200 border-emerald-500/20 active:bg-emerald-500/20 active:border-emerald-500/40" },
          ].map((pad) => (
            <button
              key={pad.id}
              type="button"
              onClick={() => playSFX(pad.id)}
              className={`flex flex-col items-center justify-center h-14 rounded-xl border bg-white/5 transition-all active:scale-95 cursor-pointer ${pad.color}`}
              aria-label={`Play ${pad.id} sound effect`}
            >
              <span className="text-[10px] font-mono font-bold tracking-tight">{pad.name}</span>
              <span className="text-[8px] font-mono text-white/30 uppercase mt-1">Trigger</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
