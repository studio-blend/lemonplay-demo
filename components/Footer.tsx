import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border-custom bg-surface py-12 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center group">
              <img
                src="/logo.svg"
                alt="LemonPay"
                className="h-7 w-auto object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-200"
              />
            </Link>
            <p className="text-xs text-muted-custom leading-relaxed">
              India's payment infrastructure designed for growing businesses. Secure, fast, and simple integrations for UPI, QR, and API payments.
            </p>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-start gap-2 text-xs text-muted-custom">
                <Mail className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>enquiry@lemonpay.tech</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Product</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-custom">
              <li>
                <Link href="/products/cube" className="hover:text-foreground transition-colors">
                  Cube Dashboard
                </Link>
              </li>
              <li className="opacity-60 cursor-not-allowed">KYC Suite (Coming Soon)</li>
              <li className="opacity-60 cursor-not-allowed">QR Payments (Coming Soon)</li>
              <li className="opacity-60 cursor-not-allowed">API Gateway (Coming Soon)</li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-custom">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/partner-network" className="hover:text-foreground transition-colors">
                  Partner Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-muted-custom">
              <li>
                <Link href="/legal-policies/terms" className="hover:text-foreground transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal-policies/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal-policies/grievance" className="hover:text-foreground transition-colors">
                  Grievance Redressal
                </Link>
              </li>
              <li>
                <Link href="/legal-policies/press" className="hover:text-foreground transition-colors">
                  Press & Media
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Office details and RBI disclaimer */}
        <div className="border-t border-border-custom/50 pt-8 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="flex items-start gap-2 text-[11px] text-muted-custom">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <strong>Registered Office:</strong> Pondicherry – 605 013 <br />
                <strong>Corporate Office:</strong> Tidel Park, Villupuram, Tamil Nadu
              </div>
            </div>
            <p className="text-[11px] text-dim-custom leading-normal">
              <strong>Regulatory Notice:</strong> Lemonpay Software Private Limited operates as a payment technology provider. Payment collection and settlement operations conform to the guidelines outlined by the Reserve Bank of India (RBI). All financial transactions are routed securely through authorized banking partner nodes and NPCI UPI networks.
            </p>
          </div>

          <div className="flex flex-col md:items-end justify-between">
            <span className="text-[11px] text-dim-custom">
              © {new Date().getFullYear()} Lemonpay Software Private Limited. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
