"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart, Sparkles, Linkedin, Award, Compass, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  const founders = [
    {
      name: "Senthil Kumar Yadav",
      role: "CEO & Founder",
      initials: "SKY",
      bio: "Senthil oversees the product vision and core payment routing architecture. Formerly an engineering lead at major fintech hubs, he designed LemonPay to simplify collections for SME merchants.",
      linkedin: "https://linkedin.com/company/lemonpay"
    },
    {
      name: "Sathish Kumar Yadav",
      role: "CBO & Co-Founder",
      initials: "SKY",
      bio: "Sathish leads business operations, banking integrations, and regional partner relations. He drives merchant onboarding campaigns in underbanked corporate districts.",
      linkedin: "https://linkedin.com/company/lemonpay"
    },
    {
      name: "Sampath Kumar Yadav",
      role: "CFO & Co-Founder",
      initials: "SKY",
      bio: "Sampath manages financial operations, compliance reporting, HR, and nodal bank audit frameworks, ensuring absolute compliance with regulatory guidelines.",
      linkedin: "https://linkedin.com/company/lemonpay"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Our Mission</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Democratizing Digital <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Payments in India
            </span>
          </h1>
          <p className="max-w-xl text-base text-muted-custom mx-auto sm:text-lg">
            We build simple, low-latency, and highly accessible UPI gateway technology to bridge the gap between B2B merchants and their payout nodes.
          </p>
        </div>
      </section>

      {/* Values & Vision Cards */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Trust */}
          <div className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Escrow Transparency</h3>
            <p className="text-xs text-muted-custom leading-relaxed">
              We operate strictly under the RBI Payment Aggregator frameworks. All settlement funds flow directly through monitored bank escrow accounts, ensuring security at every step.
            </p>
          </div>

          {/* Card 2: Innovation */}
          <div className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <Compass className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Technical Simplicity</h3>
            <p className="text-xs text-muted-custom leading-relaxed">
              Eliminate code clutter. We package complex UPI intent triggers, dynamic callbacks, and settlement webhooks into modular API stubs that compile in minutes.
            </p>
          </div>

          {/* Card 3: Partnership */}
          <div className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">SME Accessibility</h3>
            <p className="text-xs text-muted-custom leading-relaxed">
              Designed to perform optimally in rural retail nodes. We guarantee transaction stability and status callbacks even on slower mobile networks.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Team Grid (Fixed Broken Photos & Duplicate Sathish Bug) */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-border-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Leadership</span>
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl mt-1">Meet Our Founders</h2>
          <p className="text-muted-custom mt-3">
            Bringing professional fintech engineering and regulatory operations experience to solve SME payments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {founders.map((founder, i) => (
            <div 
              key={founder.name}
              className="rounded-2xl border border-border-custom bg-surface p-6 flex flex-col gap-4 hover:border-primary/20 transition-colors"
            >
              {/* Premium Initials Avatar instead of broken photos */}
              <div className="h-28 w-28 rounded-full border-2 border-primary bg-[#0d0e10] flex items-center justify-center shadow-lg shadow-primary/5 self-center">
                <span className="text-xl font-bold tracking-wider text-primary">{founder.initials}</span>
              </div>
              
              <div className="text-center">
                <h3 className="text-lg font-bold text-foreground">{founder.name}</h3>
                <span className="text-xs font-semibold text-primary">{founder.role}</span>
              </div>

              <p className="text-xs text-muted-custom leading-relaxed text-center flex-grow">
                {founder.bio}
              </p>

              <div className="border-t border-border-custom/50 pt-4 flex justify-center">
                <Link
                  href={founder.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-muted-custom hover:text-primary transition-colors"
                >
                  <Linkedin className="h-4 w-4" /> Connect on LinkedIn
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
