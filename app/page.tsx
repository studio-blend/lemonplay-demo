"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import ScrollVideo from "@/components/ScrollVideo";
import {
  ArrowRight,
  Zap,
  Smartphone,
  QrCode,
} from "lucide-react";

// ─── Partner logos (6 from live site, locally hosted) ───────────────────────
const PARTNER_LOGOS = [
  { src: "/partner-1.png", alt: "Partner 1" },
  { src: "/partner-2.png", alt: "Partner 2" },
  { src: "/partner-3.png", alt: "Partner 3" },
  { src: "/partner-4.png", alt: "Partner 4" },
  { src: "/make.png",      alt: "Make Partner" },
  { src: "/partner-6.png", alt: "Partner 6" },
];

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCounter(target: number, duration = 1500, started = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return value;
}

// ─── 3D card mouse-tracking component ────────────────────────────────────────
function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 10;
    const rotY =  (x / rect.width)  * 10;
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
    el.style.boxShadow = `0 20px 50px rgba(245,200,66,0.12)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
    el.style.boxShadow = "";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-shadow duration-300 ${className}`}
      style={{ willChange: "transform", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  // Typewriter
  const [typedText, setTypedText]     = useState("");
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);
  const taglines    = ["INNOVATION", "TECH", "COMMITMENT"];
  const typingSpeed = 150, deletingSpeed = 75, pauseDuration = 2000;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const cur = taglines[taglineIndex];
    if (isDeleting) {
      timer = setTimeout(() => setTypedText(cur.substring(0, typedText.length - 1)), deletingSpeed);
    } else {
      timer = setTimeout(() => setTypedText(cur.substring(0, typedText.length + 1)), typingSpeed);
    }
    if (!isDeleting && typedText === cur) timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setTaglineIndex(p => (p + 1) % taglines.length);
    }
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, taglineIndex]);

  // (Parallax removed — was causing dashboard to scroll over pinned hero)

  // Scroll-reveal IntersectionObserver
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("is-visible"); }),
      { threshold: 0.12 }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Metric counter trigger
  const metricsRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  useEffect(() => {
    const el = metricsRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setCountersStarted(true); io.disconnect(); } },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const c1 = useCounter(500, 1200, countersStarted);
  const c2 = useCounter(500000, 1400, countersStarted);
  const c3 = useCounter(994, 1600, countersStarted);
  const c4 = useCounter(75, 1000, countersStarted);

  // FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is LemonPay?", "acceptedAnswer": { "@type": "Answer", "text": "LemonPay is a high-success payment technology suite designed for Indian startups and SMEs. We provide integrated UPI collections, dynamic QR codes, API payouts, and automated KYC verification through our unified platform." } },
      { "@type": "Question", "name": "Is LemonPay regulated by the RBI?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, LemonPay Software Private Limited operates in strict accordance with the Payment Aggregator guidelines established by the Reserve Bank of India (RBI). All funds are secured in node banking escrow accounts and routed via NPCI UPI rails." } },
      { "@type": "Question", "name": "Which payment modes are supported by LemonPay?", "acceptedAnswer": { "@type": "Answer", "text": "We primarily focus on high-speed UPI collections, dynamic intent UPI links, retail QR codes, and automated payouts. We also support net banking and credit/debit card collections via our partner aggregator integrations." } },
      { "@type": "Question", "name": "How long does KYC and onboarding take?", "acceptedAnswer": { "@type": "Answer", "text": "Through our AI-powered KYC Verification Suite, merchant accounts can be scanned, verified, and approved in-principle within 15 minutes of document submission." } },
    ]
  };

  return (
    <div className="relative overflow-hidden bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── ANIMATED ORB MESH BACKGROUND ──────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="orb-1 absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(245,200,66,0.13)_0%,transparent_70%)] blur-3xl" />
        <div className="orb-2 absolute top-1/3 -right-48 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(77,217,192,0.10)_0%,transparent_70%)] blur-3xl" />
        <div className="orb-3 absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,200,66,0.08)_0%,transparent_70%)] blur-2xl" />
        {/* subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
        {/* floating particles */}
        <div className="float-particle fp-1" />
        <div className="float-particle fp-2" />
        <div className="float-particle fp-3" />
        <div className="float-particle fp-4" />
        <div className="float-particle fp-5" />
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary">
            <Zap className="h-3 w-3" /> Payment Infrastructure for Growing India
          </div>
          <h1 className="reveal reveal-delay-1 max-w-5xl text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            <span className="inline-block min-w-[200px] sm:min-w-[400px] text-left sm:text-center">
              {typedText}
              <span className="text-primary typewriter-cursor">|</span>
            </span>{" "}
            for the future
          </h1>
          <p className="reveal reveal-delay-2 max-w-2xl text-lg text-muted-custom sm:text-xl">
            At LemonPay, we believe today's innovations, tech, and commitment are shaping the future of finance. Accept UPI, QRs, and API payments securely.
          </p>
          <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-bold text-background hover:bg-primary-hover transition-all shadow-xl shadow-primary/20 group"
            >
              Get Started Free <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/products/cube"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border-custom bg-surface/80 backdrop-blur-sm px-8 py-4 font-bold text-foreground hover:bg-surface-hover transition-colors"
            >
              Explore Dashboard
            </Link>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="reveal reveal-delay-4 mt-16 sm:mt-24 rounded-2xl border border-border-custom bg-surface/50 p-3 sm:p-4 backdrop-blur-sm shadow-2xl shadow-primary/5">
          <div className="rounded-xl border border-border-custom bg-[#0d0e10] overflow-hidden flex flex-col md:flex-row h-[420px]">
            {/* Sidebar — always a vertical column */}
            <div className="hidden md:flex flex-col w-52 shrink-0 border-r border-border-custom bg-surface">
              {/* Brand row */}
              <div className="flex items-center gap-2 px-4 py-4 border-b border-border-custom/50">
                <div className="h-6 w-6 rounded-md bg-primary flex items-center justify-center text-xs font-bold text-background shrink-0">L</div>
                <span className="font-bold text-sm text-foreground truncate">LemonCube</span>
              </div>
              {/* Nav items */}
              <div className="flex flex-col gap-1 p-3 mt-1">
                <div className="rounded-lg bg-surface-hover px-3 py-2 text-xs font-semibold text-primary">Overview</div>
                {["Payments","KYC Suite","Settlements","Developer APIs"].map(t => (
                  <div key={t} className="rounded-lg px-3 py-2 text-xs font-medium text-muted-custom hover:text-foreground hover:bg-surface-hover transition-colors cursor-pointer">{t}</div>
                ))}
              </div>
            </div>
            <div className="flex-1 p-4 sm:p-6 flex flex-col gap-6 overflow-y-auto">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-semibold text-muted-custom">Dashboard</h3>
                  <h2 className="text-lg font-bold text-foreground">Welcome back, Senthil</h2>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-border-custom bg-surface px-3 py-1 text-xs">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span> RBI Nodes Connected
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Net Collections",  val: "₹24,59,200.00", color: "text-foreground", sub: "▲ +12.4% this week",  subColor: "text-green-500" },
                  { label: "Success Rate",      val: "99.42%",        color: "text-primary",    sub: "▲ +0.15% call health",subColor: "text-green-500" },
                  { label: "Settled Balance",   val: "₹18,24,150.00", color: "text-secondary",  sub: "T+1 Auto-Payout",    subColor: "text-muted-custom" },
                ].map(s => (
                  <div key={s.label} className="rounded-xl border border-border-custom/80 bg-surface p-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-muted-custom">{s.label}</span>
                    <div className={`text-xl font-bold mt-1 ${s.color}`}>{s.val}</div>
                    <span className={`text-[10px] font-medium ${s.subColor}`}>{s.sub}</span>
                  </div>
                ))}
              </div>
              <div className="flex-grow rounded-xl border border-border-custom/80 bg-surface p-4 flex flex-col gap-2 min-h-[140px]">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-muted-custom">Collections Trend (Last 7 Days)</span>
                  <span className="text-xs font-bold text-foreground">Avg: ₹3.5L/day</span>
                </div>
                <div className="flex-grow flex items-end gap-2 pt-4">
                  {[40,55,50,75,65,90,95].map((h, i) => (
                    <div key={i} className={`w-full rounded-t-md transition-all ${i===6?"bg-primary":"bg-border-custom/60 hover:bg-primary"}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCROLL-JACKED VIDEO SECTION ───────────────────────────────────── */}
      <ScrollVideo src="/scroll-hero.mp4" />

      {/* ── METRICS with animated counters ───────────────────────────────── */}
      <section className="relative z-10 border-t border-b border-border-custom bg-surface/30 py-10">
        <div className="glow-line absolute top-0 left-0 right-0" />
        <div ref={metricsRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="reveal">
              <div className={`text-3xl font-extrabold text-foreground ${countersStarted ? "counter-pop" : ""}`}>
                {countersStarted ? `${c1}+` : "500+"}
              </div>
              <div className="text-xs text-muted-custom mt-1 uppercase tracking-wider font-semibold">Active Merchants</div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className={`text-3xl font-extrabold text-primary ${countersStarted ? "counter-pop" : ""}`}>
                {countersStarted ? `${(c2/100000).toFixed(1)}L+` : "5L+"}
              </div>
              <div className="text-xs text-muted-custom mt-1 uppercase tracking-wider font-semibold">Daily Transactions</div>
            </div>
            <div className="reveal reveal-delay-2">
              <div className={`text-3xl font-extrabold text-secondary ${countersStarted ? "counter-pop" : ""}`}>
                {countersStarted ? `${(c3/10).toFixed(1)}%` : "99.4%"}
              </div>
              <div className="text-xs text-muted-custom mt-1 uppercase tracking-wider font-semibold">API Uptime</div>
            </div>
            <div className="reveal reveal-delay-3">
              <div className={`text-3xl font-extrabold text-foreground ${countersStarted ? "counter-pop" : ""}`}>
                {countersStarted ? `${c4}%` : "75%"}
              </div>
              <div className="text-xs text-muted-custom mt-1 uppercase tracking-wider font-semibold">Friction Reduction</div>
            </div>
          </div>
        </div>
        <div className="glow-line absolute bottom-0 left-0 right-0" />
      </section>

      {/* ── WHY LEMONPAY — 3D mouse-tracking benefit cards ───────────────── */}
      <section className="relative z-10 py-24 bg-[linear-gradient(135deg,#0d0e10_0%,#111517_50%,#0d0e10_100%)] border-b border-border-custom">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-5xl flex items-center justify-center gap-3">
              Why <img src="/logo.svg" alt="Lemonpay Logo" className="h-10 sm:h-12 w-auto filter brightness-110" />?
            </h2>
            <p className="text-muted-custom mt-4 sm:text-lg">
              LemonPay offers streamlined, efficient, and secure solutions to various challenges in the financial and payment ecosystem for businesses of all sizes.
            </p>
          </div>

          {/* SVG network (desktop only) */}
          <div className="relative min-h-[720px] max-w-[1200px] mx-auto z-10">
            <div className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block">
              <svg width="100%" height="100%" viewBox="0 0 1200 800" fill="none" className="w-full h-full">
                {[
                  "M260 200 Q450 150 640 200","M720 200 Q850 160 980 200",
                  "M1100 320 Q1150 375 1100 430","M980 550 Q850 590 720 550",
                  "M640 550 Q450 600 260 550","M200 430 Q150 375 200 320"
                ].map((d,i) => (
                  <path key={i} d={d} stroke="rgba(245,200,66,0.12)" strokeWidth="2" fill="none" />
                ))}
                {[
                  "M260 200 Q450 150 640 200","M720 200 Q850 160 980 200",
                  "M1100 320 Q1150 375 1100 430","M980 550 Q850 590 720 550",
                  "M640 550 Q450 600 260 550","M200 430 Q150 375 200 320"
                ].map((d,i) => (
                  <path key={`p${i}`} d={d} stroke="#f5c842" strokeWidth="3" fill="none"
                    className={`energy-pulse pulse-${i+1}`} strokeDasharray="40 200" strokeDashoffset="240" />
                ))}
                {[[200,200],[650,200],[1100,200],[200,550],[650,550],[1100,550]].map(([cx,cy],i) => (
                  <circle key={i} cx={cx} cy={cy} r="6" fill="#f5c842" className={`connection-dot dot-${i+1}`} />
                ))}
              </svg>
            </div>

            {/* 3D benefit cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-20">
              {[
                { title: "Low Transaction Fees",      body: "LemonPay has lower overhead costs, which directly reduces transaction fees for business operations of all sizes.", delay: "1" },
                { title: "Fast Payment Processing",   body: "Real-time transactions and lightning-fast settlements eliminate delays, providing merchants with instant capital access.", delay: "2" },
                { title: "SME Accessibility",         body: "LemonPay delivers stable payment integrations to underbanked areas, allowing small enterprises to deploy premium software.", delay: "3" },
                { title: "Security in Transactions",  body: "End-to-end tokenization secures merchant details. ML-driven audits monitor nodes to detect and block suspicious payments.", delay: "4" },
                { title: "Easy Payment Management",   body: "Cube's intuitive analytics dashboard tracks metrics, logs chargebacks, and automates payouts to avoid accounting errors.", delay: "5" },
                { title: "Streamlined Compliance",    body: "LemonPay simplifies compliance guidelines with automated onboarding KYCs, minimizing administrative bottlenecks.", delay: "6" },
              ].map((card) => (
                <div key={card.title} className={`reveal reveal-delay-${card.delay}`}>
                  <Card3D className="rounded-2xl border border-border-custom bg-surface/85 backdrop-blur-md p-8 flex flex-col justify-center min-h-[220px] lg:min-h-[260px] hover:border-primary/50">
                    <h3 className="text-xl font-bold text-foreground text-center mb-3">{card.title}</h3>
                    <p className="text-sm text-muted-custom leading-relaxed text-center">{card.body}</p>
                  </Card3D>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE PRODUCTS ─────────────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Payment channels built for execution
          </h2>
          <p className="text-muted-custom mt-4">
            Deploy secure checkout links, dynamic QR billing systems, and payment payout interfaces with absolute uptime.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: <Smartphone className="h-6 w-6" />,
              color: "text-primary", bg: "bg-primary/10", border: "hover:border-primary/30",
              title: "UPI Collections & API Payouts",
              body: "Create instant UPI handles and automated API payout hooks. Route payments dynamically through multiple node banks to guarantee a 99%+ success rate.",
              link: "/products/cube", linkText: "Learn about API Gateway",
            },
            {
              icon: <QrCode className="h-6 w-6" />,
              color: "text-secondary", bg: "bg-secondary/10", border: "hover:border-secondary/30",
              title: "Retail Dynamic QR Codes",
              body: "Deploy dynamic QR codes that change on each invoice or checkout session. Fulfills offline merchant tracking requirements with built-in instant callback sound box APIs.",
              link: "/products/cube", linkText: "Explore Retail QRs",
            },
          ].map((p, i) => (
            <div key={i} className={`reveal reveal-delay-${i+1}`}>
              <Card3D className={`rounded-2xl border border-border-custom bg-surface p-6 sm:p-8 flex flex-col gap-4 ${p.border} transition-colors h-full`}>
                <div className={`h-12 w-12 rounded-xl ${p.bg} flex items-center justify-center ${p.color}`}>
                  {p.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-custom leading-relaxed">{p.body}</p>
                <Link href={p.link} className={`${p.color} text-sm font-semibold hover:underline flex items-center gap-1 mt-auto pt-4`}>
                  {p.linkText} <ArrowRight className="h-4 w-4" />
                </Link>
              </Card3D>
            </div>
          ))}
        </div>
      </section>

      {/* ── BUILT FOR THE DIGITAL AGE — media showcase ────────────────────── */}
      <section className="relative z-10 border-t border-border-custom bg-surface/20 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 reveal">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Experience First</span>
            <h2 className="text-3xl font-extrabold text-foreground sm:text-5xl mt-2">
              Built for the digital age
            </h2>
            <p className="text-muted-custom mt-4 sm:text-lg">
              Interact with payment flows designed to optimize merchant conversions and verify transactions in real time.
            </p>
          </div>

          <div className="flex flex-col gap-24">
            {[
              { label: "Onboarding",     color: "text-primary",   title: "Seamless merchant onboarding",   body: "Submit business profiles, PAN records, and banking nodes. Our automated AI scan validates merchant parameters in-principle within 15 minutes, allowing you to bypass institutional delays.", media: <video src="/lap-mock.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />, reverse: false },
              { label: "Reconciliation", color: "text-secondary", title: "Statements at your fingertips",  body: "Track collections on your mobile browser. Inspect settlements, audit payouts, download transaction receipts, and trigger manual payout confirmations on the go.", media: <video src="/mob-view.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />, reverse: true },
              { label: "Control",        color: "text-primary",   title: "Complete application controls",  body: "Fine-tune payment routing parameters. Toggle collection hooks, authorize sub-merchant payout API keys, and allocate sound box alerts from the Cube console.", media: <img src="/handlap.png" alt="Dashboard controls" className="w-full h-full object-cover" />, reverse: false },
              { label: "Security",       color: "text-secondary", title: "Protecting transaction data",    body: "Complete isolation layers protect sensitive client details. PCI-DSS compliant setups run alongside ML fraud engines to monitor transaction velocity and block rogue intents.", media: <img src="/finger.png" alt="Security verification" className="w-full h-full object-cover" />, reverse: true },
            ].map((s, i) => (
              <div key={i} className={`reveal flex flex-col ${s.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 lg:gap-20`}>
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                  <span className={`text-xs font-bold ${s.color} uppercase tracking-wider`}>{s.label}</span>
                  <h3 className="text-2xl font-bold text-foreground sm:text-4xl">{s.title}</h3>
                  <p className="text-sm text-muted-custom leading-relaxed">{s.body}</p>
                </div>
                <div className="w-full lg:w-1/2 aspect-video rounded-2xl border border-border-custom bg-[#0d0e10] overflow-hidden shadow-2xl shadow-primary/5">
                  {s.media}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNER LOGOS MARQUEE ─────────────────────────────────────────── */}
      <section className="relative z-10 border-t border-border-custom bg-surface/30 py-12 overflow-hidden">
        <div className="glow-line absolute top-0 left-0 right-0" />
        <div className="text-center mb-8 reveal">
          <span className="text-xs font-bold text-muted-custom uppercase tracking-widest">Trusted by our Partners</span>
        </div>
        {/* Infinite scroll marquee — duplicate set for seamless loop */}
        <div className="relative overflow-hidden">
          <div className="flex gap-16 marquee-track" style={{ width: "max-content" }}>
            {[...PARTNER_LOGOS, ...PARTNER_LOGOS].map((logo, i) => (
              <div key={i} className="flex items-center justify-center shrink-0 w-24 h-16">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-12 max-w-[90px] object-contain filter brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          {/* fade masks on edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
        <div className="glow-line absolute bottom-0 left-0 right-0" />
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 border-t border-border-custom">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">Frequently Asked Questions</h2>
          <p className="text-muted-custom mt-4">Quick answers to common questions about our payment platform</p>
        </div>
        <div className="space-y-4">
          {[
            { q: "What is LemonPay?", a: "LemonPay is a high-success payment technology suite designed for Indian startups and SMEs. We provide integrated UPI collections, dynamic QR codes, API payouts, and automated KYC verification through our unified platform." },
            { q: "Is LemonPay regulated by the RBI?", a: "Yes, LemonPay Software Private Limited operates in strict accordance with the Payment Aggregator guidelines established by the Reserve Bank of India (RBI). All funds are secured in node banking escrow accounts and routed via NPCI UPI rails." },
            { q: "Which payment modes are supported by LemonPay?", a: "We primarily focus on high-speed UPI collections, dynamic intent UPI links, retail QR codes, and automated payouts. We also support net banking and credit/debit card collections via our partner aggregator integrations." },
            { q: "How long does KYC and onboarding take?", a: "Through our AI-powered KYC Verification Suite, merchant accounts can be scanned, verified, and approved in-principle within 15 minutes of document submission." },
          ].map((faq, i) => (
            <div key={i} className={`reveal reveal-delay-${i+1} rounded-xl border border-border-custom bg-surface p-6 hover:border-primary/20 transition-colors`}>
              <h4 className="font-bold text-foreground text-base">{faq.q}</h4>
              <p className="text-sm text-muted-custom mt-2 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 overflow-hidden bg-primary py-24 text-background text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18)_0%,transparent_70%)]" />
        {/* 3D depth shimmer */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_50%,rgba(255,255,255,0.05)_100%)]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
          <h2 className="reveal text-3xl font-extrabold sm:text-5xl tracking-tight">
            Ready to scale your business payments?
          </h2>
          <p className="reveal reveal-delay-1 max-w-2xl text-base font-medium opacity-90 sm:text-lg">
            Create an account in 15 minutes, access our sandbox environment, and start processing collections.
          </p>
          <div className="reveal reveal-delay-2 flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-background px-8 py-4 font-bold text-foreground hover:bg-zinc-100 transition-colors shadow-2xl"
            >
              Sign Up Now
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-background/25 px-8 py-4 font-bold text-background hover:bg-background/10 transition-colors"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
