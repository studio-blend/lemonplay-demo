import React from "react";
import { Scale, Calendar, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Grievance Redressal Policy",
  description: "Mandatory RBI payment aggregator grievance redressal policy, compliance desk contacts, and escalation matrix for LemonPay.",
  alternates: {
    canonical: "/legal-policies/grievance"
  }
};

export default function GrievancePage() {
  return (
    <div className="relative overflow-hidden bg-background py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border-custom pb-8 mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary">
            <Scale className="h-4 w-4" /> Compliance Desk
          </div>
          <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">Grievance Redressal</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-custom">
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Last Updated: June 2026</span>
            <span className="flex items-center gap-1"><AlertCircle className="h-3.5 w-3.5" /> RBI Mandate Compliant</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none text-xs text-muted-custom leading-relaxed space-y-6">
          <p>
            LemonPay is committed to providing a secure and high-success transaction experience. In accordance with the Reserve Bank of India (RBI) guidelines for Payment Aggregators, we have established this Grievance Redressal Policy to address customer and merchant complaints within designated timelines.
          </p>

          <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mt-8">Escalation Matrix</h3>
          <p>
            Complaints are handled through a three-level escalation process to ensure efficient resolution:
          </p>

          {/* Level 1 */}
          <div className="rounded-xl border border-border-custom bg-surface p-5 mt-4">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center text-xs">1</span>
              Level 1 — Merchant Support Desk
            </h4>
            <p className="text-xs text-muted-custom mt-2 leading-relaxed">
              For standard transaction queries, refund status, settlement delays, or dashboard access issues.
            </p>
            <div className="mt-3 text-xs text-foreground font-semibold flex flex-col gap-1">
              <div>Email Desk: <span className="text-primary">support@lemonpay.tech</span></div>
              <div>Turnaround Time (TAT): Within 24 business hours</div>
            </div>
          </div>

          {/* Level 2 */}
          <div className="rounded-xl border border-border-custom bg-surface p-5 mt-4">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="bg-secondary/10 text-secondary h-6 w-6 rounded-full flex items-center justify-center text-xs">2</span>
              Level 2 — Nodal Compliance Officer
            </h4>
            <p className="text-xs text-muted-custom mt-2 leading-relaxed">
              If your complaint remains unresolved at Level 1 or you are unsatisfied with the support desk resolution.
            </p>
            <div className="mt-3 text-xs text-foreground font-semibold flex flex-col gap-1">
              <div>Officer Name: <strong>Sampath Kumar Yadav</strong></div>
              <div>Designation: CFO & Compliance Officer</div>
              <div>Email Desk: <span className="text-primary font-bold">compliance@lemonpay.tech</span></div>
              <div>Turnaround Time (TAT): Within 3 business days</div>
            </div>
          </div>

          {/* Level 3 */}
          <div className="rounded-xl border border-border-custom bg-surface p-5 mt-4">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <span className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center text-xs">3</span>
              Level 3 — Regulatory Escalation
            </h4>
            <p className="text-xs text-muted-custom mt-2 leading-relaxed">
              In the rare event that a transaction or compliance dispute is not settled by our nodal compliance officer within 30 days, you may escalate to the banking ombudsman:
            </p>
            <div className="mt-3 text-xs text-foreground font-semibold flex flex-col gap-1">
              <div>Portal: <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">RBI Complaint Management System (CMS)</a></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
