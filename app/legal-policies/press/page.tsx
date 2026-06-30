import React from "react";
import { Newspaper, Calendar, Globe } from "lucide-react";

export const metadata = {
  title: "Press & Media",
  description: "Company announcements, product updates, and media press releases for LemonPay software operations.",
  alternates: {
    canonical: "/legal-policies/press"
  }
};

export default function PressPage() {
  const releases = [
    {
      title: "LemonPay Announces Launch of Cube Analytics Console for SMEs",
      date: "May 12, 2026",
      source: "Company Update",
      summary: "LemonPay Software Private Limited has launched LemonCube, a unified developer-friendly payment dashboard. Cube provides real-time transaction tracking, T+1 settlement triggers, and automatic KYC verification callbacks."
    },
    {
      title: "LemonPay Crosses 500 Active Merchants in South India",
      date: "March 20, 2026",
      source: "FinTech Journal",
      summary: "Within two years of operation, LemonPay has scaled its digital payment network to over 500 merchants across Pondicherry and Villupuram. The platform is actively driving UPI collections in retail and CA consulting networks."
    },
    {
      title: "Compliance Audit Confirms Conformity with RBI PA Guidelines",
      date: "January 15, 2026",
      source: "Regulatory Desk",
      summary: "A third-party security audit has confirmed that LemonPay's merchant onboarding checkouts, bank escrow architectures, and dynamic QR systems fully conform to the digital security standards mandated by the RBI."
    }
  ];

  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border-custom pb-8 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
            <Newspaper className="h-4 w-4" /> Newsroom
          </div>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Press & Media</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-custom">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> News & Releases</span>
            <span className="flex items-center gap-1"><Globe className="h-3.5 w-3.5" /> Region: India</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-8">
          {releases.map((release) => (
            <div 
              key={release.title}
              className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-3 hover:border-primary/20 transition-all"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <span className="text-primary font-bold">{release.source}</span>
                <span className="text-muted-custom">{release.date}</span>
              </div>
              <h3 className="text-base font-bold text-foreground leading-snug">
                {release.title}
              </h3>
              <p className="text-xs text-muted-custom leading-relaxed">
                {release.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
