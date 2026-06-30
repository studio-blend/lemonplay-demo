"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export default function PricingPage() {
  const [monthlyVolume, setMonthlyVolume] = useState<number>(500000); // 5 Lakhs default

  // Calculate estimated fees (LemonPay charges ~1.8% avg vs Competitor at ~2.0% avg)
  const lemonpayFee = monthlyVolume * 0.018;
  const competitorFee = monthlyVolume * 0.02;
  const estimatedSavings = competitorFee - lemonpayFee;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Dynamic grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Transparent Billing</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Simple, Scale-Ready <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pricing Slabs
            </span>
          </h1>
          <p className="max-w-xl text-base text-muted-custom mx-auto sm:text-lg">
            No integration fees, no annual maintenance stubs, and no hidden settlement taxes. Pay only for what you process.
          </p>
        </div>
      </section>

      {/* Pricing Fee Slab Cards */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: UPI Standard */}
          <div className="rounded-2xl border border-border-custom bg-surface p-6 flex flex-col gap-4 relative overflow-hidden">
            <div>
              <h3 className="text-lg font-bold text-foreground">UPI Express</h3>
              <p className="text-xs text-muted-custom mt-1">For standard app intent collections</p>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-extrabold text-foreground">1.8%</span>
              <span className="text-xs text-muted-custom">per transaction</span>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-custom border-t border-border-custom/50 pt-4 mt-2">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Dynamic Intent UPI calls</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> T+1 Settlement schedule</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Unlimited Webhook callbacks</li>
            </ul>
          </div>

          {/* Card 2: QR Special */}
          <div className="rounded-2xl border-2 border-primary bg-surface p-6 flex flex-col gap-4 relative overflow-hidden shadow-xl shadow-primary/5">
            <div className="absolute top-0 right-0 bg-primary px-3 py-1 rounded-bl-lg text-[10px] font-bold text-background uppercase tracking-wider">Most Popular</div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Retail Dynamic QR</h3>
              <p className="text-xs text-muted-custom mt-1">For in-store Dynamic billing & POS</p>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-4xl font-extrabold text-primary">0.0%</span>
              <span className="text-xs text-muted-custom">under ₹2,000</span>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-custom border-t border-border-custom/50 pt-4 mt-2">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Zero fee for small ticket UPI</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Dynamic invoicing output</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Soundbox alert compatible</li>
            </ul>
          </div>

          {/* Card 3: Enterprise */}
          <div className="rounded-2xl border border-border-custom bg-surface p-6 flex flex-col gap-4 relative overflow-hidden">
            <div>
              <h3 className="text-lg font-bold text-foreground">Custom API Enterprise</h3>
              <p className="text-xs text-muted-custom mt-1">For high-volume business operations</p>
            </div>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-extrabold text-foreground">Custom</span>
            </div>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-custom border-t border-border-custom/50 pt-4 mt-2">
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Volume-based slab discount</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> Dedicated escrow API nodes</li>
              <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary shrink-0" /> 24/7 dedicated technical support</li>
            </ul>
            <Link
              href="/contact"
              className="w-full text-center py-2 rounded-lg bg-surface-hover border border-border-custom text-xs font-semibold hover:border-primary transition-colors mt-auto"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Savings Calculator */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border-custom mt-12">
        <div className="rounded-2xl border border-border-custom bg-surface p-6 sm:p-8 flex flex-col gap-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-foreground">Estimated Fee & Savings Calculator</h3>
            <p className="text-xs text-muted-custom mt-1">Calculate how much you can save compared to standard 2% payment aggregator charges.</p>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-muted-custom">Monthly Transaction Volume</span>
              <span className="text-primary text-base font-bold">{formatCurrency(monthlyVolume)}</span>
            </div>
            <input
              type="range"
              min={50000}
              max={5000000}
              step={50000}
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
              className="w-full accent-primary bg-border-custom/50 h-2 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-custom px-1">
              <span>₹50,000</span>
              <span>₹25,00,000</span>
              <span>₹50,00,000</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border-custom/50 pt-6 mt-2 text-center">
            <div className="rounded-xl bg-background p-4 border border-border-custom/50">
              <span className="text-[10px] text-muted-custom uppercase font-semibold">LemonPay Fee (1.8%)</span>
              <div className="text-base font-bold text-foreground mt-1">{formatCurrency(lemonpayFee)}</div>
            </div>
            <div className="rounded-xl bg-background p-4 border border-border-custom/50">
              <span className="text-[10px] text-muted-custom uppercase font-semibold">Competitor Fee (2.0%)</span>
              <div className="text-base font-bold text-muted-custom mt-1">{formatCurrency(competitorFee)}</div>
            </div>
            <div className="rounded-xl bg-primary/5 p-4 border-2 border-primary/20">
              <span className="text-[10px] text-primary uppercase font-bold">Estimated Savings</span>
              <div className="text-lg font-black text-primary mt-1">{formatCurrency(estimatedSavings)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Details Table */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 border-t border-border-custom">
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-foreground">Detailed Fee Breakdown</h3>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border-custom bg-surface">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border-custom bg-background/50">
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-custom">Payment Mode</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-custom">LemonPay Rate</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-custom">Competitor Avg</th>
                <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted-custom">Settlement Cycle</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-custom/50">
                <td className="px-4 py-3.5 font-medium text-foreground">UPI Intent / Link</td>
                <td className="px-4 py-3.5 text-primary font-semibold">1.80%</td>
                <td className="px-4 py-3.5 text-muted-custom">2.00%</td>
                <td className="px-4 py-3.5 text-muted-custom">T+1 Business Day</td>
              </tr>
              <tr className="border-b border-border-custom/50">
                <td className="px-4 py-3.5 font-medium text-foreground">UPI Dynamic QR (&lt; ₹2000)</td>
                <td className="px-4 py-3.5 text-primary font-semibold">0.00%</td>
                <td className="px-4 py-3.5 text-muted-custom">0.00%</td>
                <td className="px-4 py-3.5 text-muted-custom">T+1 Business Day</td>
              </tr>
              <tr className="border-b border-border-custom/50">
                <td className="px-4 py-3.5 font-medium text-foreground">Net Banking (Major Banks)</td>
                <td className="px-4 py-3.5 text-foreground">1.90%</td>
                <td className="px-4 py-3.5 text-muted-custom">2.00%</td>
                <td className="px-4 py-3.5 text-muted-custom">T+2 Business Days</td>
              </tr>
              <tr>
                <td className="px-4 py-3.5 font-medium text-foreground">Debit & Credit Cards (Domestic)</td>
                <td className="px-4 py-3.5 text-foreground">2.00%</td>
                <td className="px-4 py-3.5 text-muted-custom">2.00% + GST</td>
                <td className="px-4 py-3.5 text-muted-custom">T+2 Business Days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Disclaimers & Trust */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 border-t border-border-custom/50 mb-12 text-center flex flex-col items-center gap-4">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h4 className="font-bold text-foreground text-sm">Regulatory Pricing & Compliance Notice</h4>
        <p className="text-xs text-muted-custom max-w-2xl leading-relaxed">
          LemonPay charges conform strictly to digital transaction guidelines set by the Ministry of Finance and NPCI. Transaction rates exclude statutory GST (18%) where applicable. Settlements are processed via nodal banking partner escrow accounts to prevent float funds liabilities.
        </p>
      </section>
    </div>
  );
}
