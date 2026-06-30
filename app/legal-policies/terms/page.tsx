import React from "react";
import { FileText, Calendar, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions",
  description: "Merchant terms of service, collection node parameters, and compliance conditions for LemonPay software operations in India.",
  alternates: {
    canonical: "/legal-policies/terms"
  }
};

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border-custom pb-8 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
            <FileText className="h-4 w-4" /> Legal Framework
          </div>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Terms & Conditions</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-custom">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Last Updated: June 2026</span>
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5" /> RBI PA Compliant</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none text-xs text-muted-custom leading-relaxed space-y-6">
          <p>
            Welcome to LemonPay. These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between Lemonpay Software Private Limited (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) and the merchant, individual, or entity (&quot;Merchant&quot;, &quot;you&quot;, or &quot;your&quot;) accessing or using our payment technology platforms, dashboard APIs, Soundbox hardware devices, and related escrow settlement services (collectively, the &quot;Services&quot;).
          </p>

          <div className="border border-border-custom bg-surface p-4 rounded-xl flex gap-3 text-foreground my-6">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed text-muted-custom">
              <strong>Regulatory Acknowledgement:</strong> By integrating our APIs or deploying our QR Soundbox terminals, you explicitly acknowledge that LemonPay operates in conformance with the Payment Aggregator (PA) and Payment Gateway (PG) guidelines issued by the Reserve Bank of India (RBI). All customer transaction credits are held in trust inside authorized Escrow accounts.
            </p>
          </div>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">1. Onboarding and KYC Verification</h3>
          <p>
            To use our Services, you must complete the merchant onboarding process. You agree to provide accurate, current, and complete corporate and personal documentation, including but not limited to: permanent account numbers (PAN), GST registrations, business incorporation certificates, and bank account credentials. Our automated AI KYC system will scan and verify your records. We reserve the right to suspend accounts failing subsequent manual compliance audits.
          </p>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">2. Fee Slabs & Billing</h3>
          <p>
            Merchants agree to pay the fees specified in their designated fee schedule (e.g., 1.8% for UPI collections). Fees are automatically deducted from customer payments before settlements are routed to your designated merchant account. Fees are subject to statutory GST (18%) and changes based on RBI or network interchange adjustments.
          </p>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">3. Chargebacks and Dispute Resolutions</h3>
          <p>
            The Merchant is solely responsible for disputes, refunds, and chargebacks initiated by customers. Funds corresponding to disputed transactions will be withheld from your pending settlement balance or deducted from your escrow reserves. You agree to provide necessary transaction logs and delivery proofs to resolve chargeback challenges within 3 business days of alert notifications.
          </p>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">4. Nodal Escrow Operations & Settlements</h3>
          <p>
            All funds collected from your customers are routed via NPCI node networks to our designated Escrow Account maintained with our partner banking networks. Settlements are processed on a T+1 (Transaction Day + 1 Business Day) schedule for UPI and QR payments, subject to network uptime.
          </p>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">5. Termination</h3>
          <p>
            Either party may terminate this agreement with 30 days written notice. We reserve the right to suspend or terminate access to your console instantly in cases of suspected fraud, regulatory non-compliance, high chargeback ratios (&gt;1%), or upon direct instructions from regulatory bodies or banking partners.
          </p>
        </div>
      </div>
    </div>
  );
}
