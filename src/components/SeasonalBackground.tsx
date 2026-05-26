import { useEffect, useRef } from "react";
import { useStore, getSeasonalPreset } from "@/store/useStore";

export function SeasonalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themePreset = useStore((state) => state.themePreset);

  // Determine active preset (if auto, resolve it seasonal-wise)
  const activePreset = themePreset === "auto" ? getSeasonalPreset() : themePreset;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // 1. BACKGROUND FLOATING PARTICLES (Only for holiday themes)
    const isHolidayPreset =
      activePreset === "christmas" ||
      activePreset === "halloween" ||
      activePreset === "valentine" ||
      activePreset === "songkran" ||
      activePreset === "newyear";

    const numParticles = 70;
    const bgParticles: Array<{
      x: number;
      y: number;
      r: number;
      speed: number;
      opacity: number;
      angle?: number;
      spin?: number;
    }> = [];

    const createBgParticle = (initY = false) => {
      const pY = initY ? Math.random() * height : -10;
      let size = Math.random() * 2.5 + 0.8;
      let speed = Math.random() * 1.2 + 0.4;
      let opacity = Math.random() * 0.5 + 0.15;

      if (activePreset === "halloween") {
        size = Math.random() * 3 + 1;
        speed = -(Math.random() * 0.8 + 0.3); // moving up
        opacity = Math.random() * 0.4 + 0.2;
      } else if (activePreset === "valentine") {
        size = Math.random() * 5 + 3; // hearts are larger
        speed = Math.random() * 0.7 + 0.3;
        opacity = Math.random() * 0.45 + 0.2;
      } else if (activePreset === "songkran") {
        size = Math.random() * 5 + 2;
        speed = -(Math.random() * 1.0 + 0.3); // rising
        opacity = Math.random() * 0.3 + 0.15;
      } else if (activePreset === "newyear") {
        size = Math.random() * 3 + 1;
        speed = Math.random() * 0.5 - 0.25;
        opacity = Math.random() * 0.8 + 0.2;
      }

      return {
        x: Math.random() * width,
        y: initY ? pY : (speed < 0 ? height + 10 : -10),
        r: size,
        speed: speed,
        opacity: opacity,
        angle: Math.random() * Math.PI * 2,
        spin: Math.random() * 0.02 - 0.01,
      };
    };

    if (isHolidayPreset) {
      for (let i = 0; i < numParticles; i++) {
        bgParticles.push(createBgParticle(true));
      }
    }

    // 2. CONFETTI BLAST PARTICLES
    const confettiParticles: Array<{
      x: number;
      y: number;
      w: number;
      h: number;
      vx: number;
      vy: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      gravity: number;
      friction: number;
    }> = [];

    const handleTriggerConfetti = () => {
      const colors = getConfettiColors(activePreset);
      const confettiCount = 130;
      
      // Shoot from bottom-left and bottom-right
      for (let i = 0; i < confettiCount; i++) {
        const isLeft = Math.random() < 0.5;
        const startX = isLeft ? 30 : width - 30;
        const startY = height + 10;
        
        // Target angle: shooting upwards and towards center
        const angle = isLeft 
          ? -Math.PI / 4 - Math.random() * Math.PI / 8 
          : -Math.PI * 3 / 4 + Math.random() * Math.PI / 8;
        
        const speed = Math.random() * 14 + 7;

        confettiParticles.push({
          x: startX,
          y: startY,
          w: Math.random() * 8 + 5,
          h: Math.random() * 12 + 6,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 8 - 4,
          opacity: 1.0,
          gravity: 0.18,
          friction: 0.985,
        });
      }
    };
    window.addEventListener("trigger-confetti", handleTriggerConfetti);

    const getConfettiColors = (preset: string | null) => {
      switch (preset) {
        case "christmas":
          return ["#dc2626", "#10b981", "#eab308", "#ffffff"];
        case "halloween":
          return ["#f97316", "#a855f7", "#a3e635", "#1e1b4b"];
        case "valentine":
          return ["#f43f5e", "#ec4899", "#fda4af", "#ffffff"];
        case "songkran":
          return ["#06b6d4", "#22d3ee", "#f97316", "#ffffff"];
        case "newyear":
          return ["#fbbf24", "#fef08a", "#f472b6", "#e2e8f0"];
        default:
          return ["#3b82f6", "#6366f1", "#10b981", "#f59e0b"];
      }
    };

    // Drawing Helpers
    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      c.moveTo(x, y + r / 4);
      c.quadraticCurveTo(x, y, x + r / 2, y);
      c.quadraticCurveTo(x + r, y, x + r, y + r / 3);
      c.quadraticCurveTo(x + r, y + (r * 2) / 3, x + r / 2, y + r);
      c.quadraticCurveTo(x, y + (r * 2) / 3, x, y + r / 3);
      c.quadraticCurveTo(x, y, x - r / 2, y);
    };

    const drawStar = (c: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(cx, cy - outerRadius);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // A. DRAW BACKGROUND FLOATING FESTIVAL PARTICLES
      if (isHolidayPreset) {
        for (let i = 0; i < bgParticles.length; i++) {
          const p = bgParticles[i];
          ctx.beginPath();

          if (activePreset === "christmas") {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            ctx.fill();

            p.y += p.speed;
            p.x += Math.sin(p.y / 30) * 0.4;
            if (p.y > height + 10) bgParticles[i] = createBgParticle(false);
          } 
          else if (activePreset === "halloween") {
            const isOrange = i % 2 === 0;
            ctx.fillStyle = isOrange ? `rgba(249, 115, 22, ${p.opacity})` : `rgba(168, 85, 247, ${p.opacity})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = isOrange ? "rgba(249, 115, 22, 0.4)" : "rgba(168, 85, 247, 0.4)";
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.shadowBlur = 0;

            p.y += p.speed;
            p.x += Math.sin(p.y / 20) * 0.3;
            if (p.y < -10) bgParticles[i] = createBgParticle(false);
          } 
          else if (activePreset === "valentine") {
            ctx.fillStyle = i % 3 === 0 ? `rgba(244, 63, 94, ${p.opacity})` : `rgba(236, 72, 153, ${p.opacity})`;
            drawHeart(ctx, p.x, p.y, p.r);
            ctx.fill();

            p.y += p.speed;
            p.x += Math.sin(p.y / 25) * 0.35;
            if (p.y > height + 15) bgParticles[i] = createBgParticle(false);
          } 
          else if (activePreset === "songkran") {
            ctx.strokeStyle = `rgba(34, 211, 238, ${p.opacity})`;
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.15})`;
            ctx.lineWidth = 1;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fill();

            p.y += p.speed;
            p.x += Math.sin(p.y / 15) * 0.45;
            if (p.y < -15) bgParticles[i] = createBgParticle(false);
          } 
          else if (activePreset === "newyear") {
            const isGold = i % 2 === 0;
            ctx.fillStyle = isGold ? `rgba(251, 191, 36, ${p.opacity})` : `rgba(255, 255, 255, ${p.opacity})`;
            if (p.angle !== undefined && p.spin !== undefined) p.angle += p.spin;
            ctx.shadowBlur = 6;
            ctx.shadowColor = "rgba(251, 191, 36, 0.4)";
            drawStar(ctx, p.x, p.y, 4, p.r * 1.6, p.r * 0.6);
            ctx.fill();
            ctx.shadowBlur = 0;

            p.y += p.speed;
            p.x += Math.sin(p.y / 20) * 0.25;
            p.opacity += Math.sin(p.y / 8) * 0.02;
            p.opacity = Math.max(0.1, Math.min(0.9, p.opacity));
            if (p.y > height + 10 || p.y < -10) bgParticles[i] = createBgParticle(false);
          }
        }
      }



      // C. DRAW CONFETTI EXPLOSIONS
      for (let i = confettiParticles.length - 1; i >= 0; i--) {
        const p = confettiParticles[i];
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;

        // Draw rectangle confetti pieces
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= p.friction;
        p.vy *= p.friction;
        p.vy += p.gravity; // apply gravity

        p.rotation += p.rotationSpeed;
        p.opacity -= 0.012; // slow fadeout

        if (p.opacity <= 0 || p.y > height + 20) {
          confettiParticles.splice(i, 1);
        }
      }
      ctx.globalAlpha = 1.0; // reset global alpha

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("trigger-confetti", handleTriggerConfetti);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activePreset]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
