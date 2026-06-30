"use client";

import React, { useState } from "react";
import { 
  Users, 
  Percent, 
  Coins, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function PartnerNetworkPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    partnerType: "agency",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary self-center">
            <Users className="h-3.5 w-3.5" /> Associate Partner Program
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Partner with LemonPay, <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Earn Lifetime Commissions
            </span>
          </h1>
          <p className="max-w-xl text-base text-muted-custom mx-auto sm:text-lg">
            Grow your business by introducing merchants to India's secure payment infrastructure. Earn robust commissions on every processed transaction.
          </p>
        </div>
      </section>

      {/* Program Benefits Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Benefit 1 */}
          <div className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Percent className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Highest Commission Slabs</h3>
            <p className="text-xs text-muted-custom leading-relaxed">
              Earn competitive commissions (up to 0.30% of transaction volumes) or customized flat payout referral incentives based on onboarded merchant scales.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <Coins className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Monthly Automated Payouts</h3>
            <p className="text-xs text-muted-custom leading-relaxed">
              No manual invoicing required. Commissions are automatically calculated, processed, and deposited directly into your bank account on the 5th of every month.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Building2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Dedicated Partner Support</h3>
            <p className="text-xs text-muted-custom leading-relaxed">
              Access customized marketing brochures, QR setup displays, dynamic testing APIs, and a dedicated partner manager to handle merchant integrations.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility and Form Split Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-t border-border-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Eligibility Info */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Who can join?</span>
              <h2 className="text-2xl font-bold text-foreground mt-1 sm:text-3xl">Designed for B2B consultants & agencies</h2>
            </div>
            <p className="text-sm text-muted-custom leading-relaxed">
              Whether you provide accounting services, build merchant websites, distribute POS retail hardware, or consult startups, you can monetize your network by introducing secure payments.
            </p>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Chartered Accountants (CAs)</h4>
                  <p className="text-xs text-muted-custom mt-1">Guide your corporate clients to lower fees and compliant payments.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Web Agencies & ERP Developers</h4>
                  <p className="text-xs text-muted-custom mt-1">Integrate LemonPay API for clients and secure recurring code payouts.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Retail POS Distributors</h4>
                  <p className="text-xs text-muted-custom mt-1">Deploy dynamic QR Soundbox devices at local merchants and retail outlets.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form Panel */}
          <div className="rounded-2xl border border-border-custom bg-surface p-6 sm:p-8 shadow-2xl relative">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Registration Request Received</h3>
                <p className="text-sm text-muted-custom max-w-sm">
                  Thank you for registering. Our dedicated Partner onboarding team will verify your details and call you back within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Register as a Partner</h3>
                  <p className="text-xs text-muted-custom mt-1">Fill out the form below, and our team will get in touch.</p>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="name" className="text-xs font-semibold text-muted-custom">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-xs font-semibold text-muted-custom">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. business@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="mobile" className="text-xs font-semibold text-muted-custom">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobile"
                      required
                      placeholder="10-digit number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="city" className="text-xs font-semibold text-muted-custom">City / Location</label>
                    <input
                      type="text"
                      id="city"
                      required
                      placeholder="e.g. Villupuram"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="partnerType" className="text-xs font-semibold text-muted-custom">Partner Profile</label>
                    <select
                      id="partnerType"
                      value={formData.partnerType}
                      onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                      className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    >
                      <option value="ca">Chartered Accountant</option>
                      <option value="agency">Web Design / Software Agency</option>
                      <option value="distributor">POS / QR Hardware Distributor</option>
                      <option value="consultant">Business Consultant</option>
                      <option value="individual">Individual Referrer</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="message" className="text-xs font-semibold text-muted-custom">Brief Network Description</label>
                  <textarea
                    id="message"
                    rows={3}
                    placeholder="Tell us about the businesses you work with..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-background hover:bg-primary-hover transition-colors mt-2"
                >
                  Submit Application <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
