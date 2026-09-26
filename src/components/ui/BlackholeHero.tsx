"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Activity, 
  CloudSun, 
  TrendingUp, 
  Scan,
  Compass 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLocationLanguage } from "@/lib/context/LocationLanguageContext";

export function BlackholeHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isAuthenticated, demoLogin } = useAuth();
  const { activeHub, t } = useLocationLanguage();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || 650;
    };
    window.addEventListener("resize", handleResize);

    // Particle system for the accretion disk & event horizon
    const PARTICLE_COUNT = 380;
    interface Particle {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      color: string;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    }

    const colors = [
      "rgba(16, 185, 129, ", // Emerald Green
      "rgba(52, 211, 153, ", // Mint Emerald
      "rgba(245, 158, 11, ",  // Amber Gold
      "rgba(251, 191, 36, ",  // Warm Gold
      "rgba(255, 255, 255, ", // Brilliant Starlight
      "rgba(6, 95, 70, ",    // Deep Forest
    ];

    const particles: Particle[] = [];
    const minRadius = Math.min(width, height) * 0.12;
    const maxRadius = Math.min(width, height) * 0.48;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const radius = minRadius + Math.pow(Math.random(), 1.5) * (maxRadius - minRadius);
      particles.push({
        angle: Math.random() * Math.PI * 2,
        radius: radius,
        // Relativistic physics: particles closer to singularity orbit faster
        speed: (0.008 + (1 - radius / maxRadius) * 0.025) * (Math.random() > 0.1 ? 1 : -1),
        size: Math.random() * 2.2 + 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.7 + 0.3,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.02 + Math.random() * 0.04,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.fillStyle = "#030712"; // Deep space singularity black
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2 + 10;

      // 1. Distant Starfield Background with subtle twinkle
      ctx.save();
      for (let s = 0; s < 40; s++) {
        const sx = ((s * 197) % width);
        const sy = ((s * 277) % height);
        const sAlpha = 0.15 + 0.15 * Math.sin(time * 2 + s);
        ctx.fillStyle = `rgba(255, 255, 255, ${sAlpha})`;
        ctx.fillRect(sx, sy, 1.2, 1.2);
      }
      ctx.restore();

      // 2. Outer Accretion Glow (Emerald & Amber Nebular Aura)
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        minRadius * 0.8,
        centerX,
        centerY,
        maxRadius * 1.15
      );
      outerGlow.addColorStop(0, "rgba(5, 46, 22, 0.45)"); // Deep emerald
      outerGlow.addColorStop(0.35, "rgba(16, 185, 129, 0.12)"); // Radiant emerald
      outerGlow.addColorStop(0.7, "rgba(245, 158, 11, 0.06)"); // Soft amber horizon
      outerGlow.addColorStop(1, "rgba(3, 7, 18, 0)");
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // 3. Render Particles in Accretion Disk (with elliptical tilt for 3D depth)
      const tiltAngle = 0.38; // Tilted accretion plane

      particles.forEach((p) => {
        p.angle += p.speed;
        p.pulse += p.pulseSpeed;

        // Inward spiral gravitational pull
        p.radius -= 0.06;
        if (p.radius < minRadius) {
          p.radius = maxRadius - Math.random() * 30;
        }

        const effectiveX = Math.cos(p.angle) * p.radius;
        const effectiveY = Math.sin(p.angle) * (p.radius * Math.cos(tiltAngle));

        // Doppler effect: particles approaching (right side) are brighter
        const isApproaching = Math.cos(p.angle) > 0;
        const dopplerBoost = isApproaching ? 1.3 : 0.7;
        const currentAlpha = Math.min(1, p.alpha * (0.8 + 0.3 * Math.sin(p.pulse)) * dopplerBoost);

        ctx.fillStyle = `${p.color}${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(centerX + effectiveX, centerY + effectiveY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // High-energy particle tail / trail
        if (p.size > 1.6 && Math.random() > 0.4) {
          ctx.strokeStyle = `${p.color}${currentAlpha * 0.35})`;
          ctx.lineWidth = p.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(centerX + effectiveX, centerY + effectiveY);
          const tailX = Math.cos(p.angle - p.speed * 3.5) * p.radius;
          const tailY = Math.sin(p.angle - p.speed * 3.5) * (p.radius * Math.cos(tiltAngle));
          ctx.lineTo(centerX + tailX, centerY + tailY);
          ctx.stroke();
        }
      });

      // 4. Photon Ring (Relativistic light bending at event horizon)
      ctx.save();
      ctx.shadowBlur = 24;
      ctx.shadowColor = "#34d399";
      ctx.strokeStyle = "rgba(52, 211, 153, 0.85)";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, minRadius * 0.98, 0, Math.PI * 2);
      ctx.stroke();

      // Secondary Golden Photon Ring
      ctx.shadowColor = "#fbbf24";
      ctx.strokeStyle = "rgba(251, 191, 36, 0.65)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, minRadius * 1.04, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 5. Gravitational Singularity (The Event Horizon Void)
      const singularityGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        minRadius * 0.96
      );
      singularityGradient.addColorStop(0, "#000000");
      singularityGradient.addColorStop(0.85, "#010409");
      singularityGradient.addColorStop(1, "rgba(2, 6, 23, 0.98)");
      ctx.fillStyle = singularityGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, minRadius * 0.95, 0, Math.PI * 2);
      ctx.fill();

      // Subtle gravitational edge glow
      ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[640px] md:min-h-[720px] bg-slate-950 text-white overflow-hidden flex items-center justify-center border-b border-slate-800"
    >
      {/* 1. Silky High-Performance Canvas Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* 2. Top-down Vignette & Contrast Overlay */}
      <div 
        className="absolute inset-0 bg-radial from-transparent via-slate-950/40 to-slate-950/90 pointer-events-none" 
        aria-hidden="true"
      />

      {/* 3. Foreground Hero Typography & Interactive Controls */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center space-y-6">
        {/* Architectural Live Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-semibold shadow-lg backdrop-blur-md animate-in fade-in duration-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{t("hero.badge")}</span>
        </div>

        {/* Hero Title with Subtle Gradient */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
          {t("hero.title")}
        </h1>

        {/* Concrete Value Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed drop-shadow-xs">
          {t("hero.subtitle")}
        </p>

        {/* Real-time Agricultural Telemetry Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-1 text-xs">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-300 backdrop-blur-xs">
            <CloudSun className="w-3.5 h-3.5 text-amber-400" />
            <span>{activeHub.district} Spray Window: </span>
            <strong className="text-emerald-400 font-bold">FAVORABLE</strong>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-300 backdrop-blur-xs">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeHub.primaryCrop} Mandi Modal: </span>
            <strong className="text-white font-mono font-bold">₹2,250/Q</strong>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-slate-300 backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Agmarknet Verified: </span>
            <strong className="text-blue-300 font-mono">100% Truth</strong>
          </div>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          {isAuthenticated ? (
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8">
                <span>{t("hero.cta_dashboard")}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <Link href="/auth/login?redirect=/dashboard" className="w-full sm:w-auto">
                <Button size="lg" variant="primary" className="w-full sm:w-auto shadow-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7">
                  <span>Sign In & Open Dashboard</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <button
                type="button"
                onClick={demoLogin}
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-slate-100 text-xs font-semibold border border-slate-700 backdrop-blur-xs transition-colors shadow-md"
              >
                ⚡ Instant Evaluator Demo Access
              </button>
            </div>
          )}

          <a href="#how-it-works" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-slate-700 text-slate-200 hover:bg-slate-800/80 backdrop-blur-xs">
              <Compass className="w-4 h-4 mr-2 text-emerald-400" />
              <span>{t("hero.cta_explore")}</span>
            </Button>
          </a>
        </div>

        {/* Bottom Trust Guarantee */}
        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>{t("hero.trust_badge")}</span>
        </div>
      </div>
    </section>
  );
}
