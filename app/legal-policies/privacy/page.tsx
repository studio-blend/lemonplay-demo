import React from "react";
import { Shield, Calendar, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description: "Customer and merchant data privacy protocols, DPDP Act 2023 compliances, and secure payment tokenization regulations.",
  alternates: {
    canonical: "/legal-policies/privacy"
  }
};

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border-custom pb-8 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
            <Shield className="h-4 w-4" /> Data Protection
          </div>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Privacy Policy</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-custom">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Last Updated: June 2026</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> DPDP Act 2023 Compliant</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none text-xs text-muted-custom leading-relaxed space-y-6">
          <p>
            At LemonPay, we prioritize the protection of your personal and business data. This Privacy Policy details how Lemonpay Software Private Limited collects, stores, processes, and protects your information when you visit our site, register as a merchant, make payments, or interact with our APIs.
          </p>

          <p>
            Our data practices conform strictly to the Digital Personal Data Protection (DPDP) Act 2023 of India, RBI guidelines on payment security, and PCI DSS compliance protocols.
          </p>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">1. Information We Collect</h3>
          <p>
            We collect the minimum necessary data to provide payment services securely, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li><strong>Merchant Registration Data:</strong> Corporate name, registered address, GST registration, bank account details, and KYC documents (PAN, Aadhaar).</li>
            <li><strong>Transaction Metadata:</strong> Amount, payment mode (UPI/QR), time, device IP address, geolocation (for security checks), and status callback records.</li>
            <li><strong>User Activity Logs:</strong> IP address, browser type, and navigation paths on the Cube dashboard.</li>
          </ul>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">2. How We Use Your Data</h3>
          <p>
            We process collected data exclusively for valid business purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-2">
            <li>Verifying merchant profiles through AI-assisted KYC checkouts.</li>
            <li>Settling transaction amounts from escrow accounts to merchant bank accounts.</li>
            <li>Detecting transaction fraud, chargebacks, and unauthorized access attempts.</li>
            <li>Fulfilling legal and regulatory audit submissions mandated by the RBI or NPCI.</li>
          </ul>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">3. Data Sharing & Security</h3>
          <p>
            We do not sell or lease your data to third parties. We share transaction details only with partner banking nodes, payment networks (NPCI, card networks), and law enforcement authorities when legally required. All data is encrypted during transit (SSL/TLS) and at rest (AES-256) inside secured cloud databases located in India.
          </p>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">4. Your Data Rights</h3>
          <p>
            Under the DPDP Act 2023, you have the right to access your processed data, request corrections for inaccuracies, withdraw consent for processing, and request the deletion of non-regulatory records. Contact our Grievance Officer at <strong>enquiry@lemonpay.tech</strong> to exercise your rights.
          </p>
        </div>
      </div>
    </div>
  );
}
