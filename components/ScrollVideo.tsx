"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

const OVERLAYS = [
  { from: 0.5,  to: 3.0, label: "Payment Infrastructure", heading: "Powering India's\nPayment Future",   sub: "Lemon + UPI + India — in one seamless platform" },
  { from: 3.5,  to: 6.0, label: "Secure & Instant",       heading: "Every Transaction.\nEvery Time.",    sub: "99.4% API uptime across all UPI rails" },
  { from: 6.5,  to: 9.5, label: "Growing India",          heading: "500+ Merchants.\nOne Network.",     sub: "From Pondicherry to Delhi — we power them all" },
];
const FADE_DUR = 0.4;
// How many seconds of video per 100px of scroll
const SCROLL_RATE = 0.012;

interface ScrollVideoProps { src: string; }

export default function ScrollVideo({ src }: ScrollVideoProps) {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const videoRef      = useRef<HTMLVideoElement>(null);
  const [srcLoaded,   setSrcLoaded]   = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(10);
  const [inView,      setInView]      = useState(false);

  // ── Lazy load when 400px away ────────────────────────────────────────────
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setSrcLoaded(true); io.disconnect(); } },
      { rootMargin: "400px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // ── Track whether section is in viewport (for scroll-control activation) ─
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !srcLoaded) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        const v = videoRef.current;
        if (!v) return;
        if (!e.isIntersecting) {
          // Auto-play when entering, pause when leaving
          v.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [srcLoaded]);

  // ── Autoplay once loaded and in view ────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !inView) return;
    // Start playing (scroll will override currentTime but autoplay fills gaps)
    v.play().catch(() => {});
  }, [inView]);

  // ── Scroll control: while section is visible, wheel advances video time ──
  const lastScrollY = useRef(0);
  const onWheel = useCallback((e: WheelEvent) => {
    if (!inView) return;
    const v = videoRef.current;
    if (!v) return;
    const delta = e.deltaY * SCROLL_RATE;
    const next  = Math.max(0, Math.min(v.duration, v.currentTime + delta));
    v.currentTime = next;
    // Pause when scrolling backward, play when scrolling forward
    if (delta < 0) v.pause();
    else            v.play().catch(() => {});
    setCurrentTime(next);
  }, [inView]);

  useEffect(() => {
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [onWheel]);

  // ── Touch scroll support (mobile) ────────────────────────────────────────
  const touchStartY = useRef(0);
  const onTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);
  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!inView) return;
    const v = videoRef.current;
    if (!v) return;
    const dy    = touchStartY.current - e.touches[0].clientY;
    const delta = dy * SCROLL_RATE;
    const next  = Math.max(0, Math.min(v.duration, v.currentTime + delta));
    v.currentTime = next;
    touchStartY.current = e.touches[0].clientY;
    setCurrentTime(next);
  }, [inView]);

  useEffect(() => {
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove",  onTouchMove,  { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove",  onTouchMove);
    };
  }, [onTouchStart, onTouchMove]);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (v) setCurrentTime(v.currentTime);
  };

  // ── Overlay opacity keyed to video seconds ───────────────────────────────
  function overlayOpacity(o: typeof OVERLAYS[0]) {
    const t = currentTime;
    if (t < o.from || t > o.to) return 0;
    if (t < o.from + FADE_DUR) return (t - o.from) / FADE_DUR;
    if (t > o.to   - FADE_DUR) return (o.to - t)   / FADE_DUR;
    return 1;
  }

  const progress   = duration > 0 ? Math.min(currentTime / duration, 1) : 0;
  const ctaOpacity = currentTime > duration - 2.5 ? Math.min(1, (currentTime - (duration - 2.5)) / 0.5) : 0;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden"
      style={{ height: "100svh" }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={srcLoaded ? src : undefined}
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={() => { const v = videoRef.current; if (v) setDuration(v.duration); }}
        onTimeUpdate={onTimeUpdate}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(13,14,16,0.55) 100%)" }}
      />

      {/* Bottom dissolve */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0d0e10)" }}
      />

      {/* Scroll hint — visible at start, fades as video progresses */}
      {currentTime < 0.5 && inView && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: Math.max(0, 1 - currentTime * 4) }}
        >
          <span className="text-xs text-white/50 uppercase tracking-widest">Scroll to explore</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-bounce" />
        </div>
      )}

      {/* Text overlays */}
      {OVERLAYS.map((o, i) => {
        const op = overlayOpacity(o);
        if (op <= 0.01) return null;
        return (
          <div key={i}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none select-none"
            style={{ opacity: op }}
          >
            <span className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{o.label}</span>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight whitespace-pre-line"
              style={{ textShadow: "0 0 80px rgba(245,200,66,0.3), 0 4px 32px rgba(0,0,0,0.85)" }}
            >
              {o.heading}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 font-medium max-w-xl"
              style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9)" }}
            >
              {o.sub}
            </p>
          </div>
        );
      })}

      {/* CTA */}
      {ctaOpacity > 0.01 && (
        <div className="absolute bottom-20 left-0 right-0 flex justify-center pointer-events-auto"
          style={{ opacity: ctaOpacity }}
        >
          <Link href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-background hover:bg-primary-hover transition-all shadow-2xl shadow-primary/30 text-base"
          >
            Get Started Free →
          </Link>
        </div>
      )}

      {/* Golden progress bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-primary/70 pointer-events-none"
        style={{ width: `${progress * 100}%`, transition: "width 0.06s linear" }}
      />

      {/* Loading spinner */}
      {srcLoaded && currentTime === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      )}
    </section>
  );
}
