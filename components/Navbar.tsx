"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Globe, Layers, ShieldCheck, QrCode, Cpu, Building2, Rocket, Briefcase } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled
        ? "border-b border-primary/15 bg-background/95 backdrop-blur-xl shadow-lg shadow-black/20"
        : "border-b border-border-custom/50 bg-background/85 backdrop-blur-md"
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo.svg"
                alt="LemonPay"
                className="h-8 w-auto object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-200"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/about" 
              className="text-sm font-semibold text-muted-custom hover:text-foreground transition-colors"
            >
              About Us
            </Link>

            <Link 
              href="/products/cube" 
              className="text-sm font-semibold text-muted-custom hover:text-foreground transition-colors"
            >
              Solution
            </Link>

            <Link 
              href="/pricing" 
              className="text-sm font-semibold text-muted-custom hover:text-foreground transition-colors"
            >
              Pricing
            </Link>

            <Link 
              href="/partner-network" 
              className="text-sm font-semibold text-muted-custom hover:text-foreground transition-colors"
            >
              Partner Network
            </Link>

            <Link 
              href="/careers" 
              className="text-sm font-semibold text-muted-custom hover:text-foreground transition-colors"
            >
              Careers
            </Link>

            <Link 
              href="/contact" 
              className="text-sm font-semibold text-muted-custom hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://cube.lemonpay.in/login"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/contact"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-background hover:bg-primary-hover transition-colors shadow-lg shadow-primary/10"
            >
              Request Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-custom hover:bg-surface hover:text-foreground focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border-custom/50 bg-background/95 px-4 pt-2 pb-4 space-y-1">
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-surface"
          >
            About Us
          </Link>
          
          <Link
            href="/products/cube"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-surface"
          >
            Solution
          </Link>

          <Link
            href="/pricing"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-surface"
          >
            Pricing
          </Link>

          <Link
            href="/partner-network"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-surface"
          >
            Partner Network
          </Link>

          <Link
            href="/careers"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-surface"
          >
            Careers
          </Link>

          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-semibold text-foreground hover:bg-surface"
          >
            Contact
          </Link>

          <div className="pt-4 border-t border-border-custom/50 flex flex-col gap-2">
            <Link
              href="https://cube.lemonpay.in/login"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-center rounded-lg border border-border-custom/80 py-2.5 text-base font-semibold text-foreground hover:bg-surface"
            >
              Log In
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-center rounded-lg bg-primary py-2.5 text-base font-bold text-background hover:bg-primary-hover"
            >
              Request Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
