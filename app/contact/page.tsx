"use client";

import React, { useState } from "react";
import { Mail, MapPin, Phone, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero Header */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Get In Touch</span>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Let's Talk About <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Your Payments
            </span>
          </h1>
          <p className="max-w-xl text-base text-muted-custom mx-auto sm:text-lg">
            Connect with our technical integrations team or sales desk. Get enquiry answers, sandbox credentials, or partner assistance.
          </p>
        </div>
      </section>

      {/* Contact Split Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info Panel */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">LemonPay Headquarters</h2>
              <p className="text-xs text-muted-custom mt-2 leading-relaxed">
                Reach us directly at our registered headquarters or coordinate with developers at our corporate office.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {/* Email */}
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-surface border border-border-custom flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Email Us</h4>
                  <span className="text-sm text-muted-custom">enquiry@lemonpay.tech</span>
                </div>
              </div>

              {/* Office 1 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-surface border border-border-custom flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Registered Office</h4>
                  <p className="text-sm text-muted-custom mt-1 leading-normal">
                    No. 303, 1st Floor, Kamaraj Salai, <br />
                    Pondicherry – 605 013
                  </p>
                  <a
                    href="https://maps.google.com/?q=No.+303,+1st+Floor,+Kamaraj+Salai,+Pondicherry+605013"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold mt-2"
                  >
                    View on Google Maps <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Office 2 */}
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-lg bg-surface border border-border-custom flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Corporate Office</h4>
                  <p className="text-sm text-muted-custom mt-1 leading-normal">
                    Tidel Park, Villupuram, <br />
                    Tamil Nadu
                  </p>
                  <a
                    href="https://maps.google.com/?q=Tidel+Park,+Villupuram,+Tamil+Nadu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-semibold mt-2"
                  >
                    View on Google Maps <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Panel (Fixed Placeholder-only Labels Issue) */}
          <div className="lg:col-span-7 rounded-2xl border border-border-custom bg-surface p-6 sm:p-8 shadow-2xl relative">
            {submitted ? (
              <div className="text-center py-16 flex flex-col items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Enquiry Submitted</h3>
                <p className="text-sm text-muted-custom max-w-sm">
                  Thank you for contacting LemonPay. A technical integration associate or merchant sales officer will reply to your registered email within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Merchant Inquiry Desk</h3>
                  <p className="text-xs text-muted-custom mt-1">Provide your business parameters below to request demo sandbox details.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-muted-custom">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="e.g. Senthil Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-xs font-semibold text-muted-custom">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      required
                      placeholder="e.g. LemonPay Software"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-muted-custom">Business Email</label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="e.g. name@company.in"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
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

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-muted-custom">Details of your payment requirement</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Briefly tell us about your transaction volume and target integration (e.g. mobile app, retail POS, subscription billing)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="rounded-lg border border-border-custom bg-[#0d0e10] px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-bold text-background hover:bg-primary-hover transition-colors mt-2"
                >
                  Send Inquiry <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
