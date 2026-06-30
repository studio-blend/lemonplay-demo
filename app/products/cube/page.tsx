"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Layers, 
  Terminal, 
  Code, 
  Play, 
  Check, 
  ShieldAlert, 
  Activity, 
  RefreshCw, 
  Download,
  AlertCircle,
  CreditCard,
  Smartphone,
  QrCode,
  Building,
  CheckCircle2,
  RotateCcw
} from "lucide-react";

export default function CubeProductPage() {
  const [activeCodeTab, setActiveCodeTab] = useState<"intent" | "payout" | "webhook">("intent");
  const [copied, setCopied] = useState(false);

  // Checkout Simulator States
  const [simStep, setSimStep] = useState<"select" | "details" | "paymethod" | "processing" | "success">("select");
  const [simProduct, setSimProduct] = useState({ name: "", price: 0 });
  const [simForm, setSimForm] = useState({
    name: "",
    email: "",
    phone: "",
    paymethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    upiId: "",
    selectedBank: ""
  });
  const [simErrors, setSimErrors] = useState<Record<string, string>>({});
  const [processingMsg, setProcessingMsg] = useState("");
  const [txnId, setTxnId] = useState("");

  const products = [
    { name: "Lemon Premium Plan Subscription", price: 1499.00, desc: "Billed monthly. Automated KYC & high-volume UPI routes." },
    { name: "Developer API Sandbox License", price: 499.00, desc: "One-time. Complete access to routing and soundbox webhooks." },
    { name: "SME Gateway Micro-Test Token", price: 10.00, desc: "Instant checkout test. Runs transaction settlement routing." }
  ];

  const codeSnippets = {
    intent: `// 1. Create UPI Payment Intent Link
const response = await fetch("https://api.lemonpay.tech/v1/payments/create-intent", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sec_key_live_8f3d...90a2",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    amount: ${simProduct.price > 0 ? simProduct.price.toFixed(2) : "1500.00"}, // INR
    currency: "INR",
    merchant_reference: "order_sme_84920",
    customer: {
      name: "${simForm.name || "Aravind Swamy"}",
      email: "${simForm.email || "aravind@example.com"}",
      mobile: "${simForm.phone || "+919876543210"}"
    },
    upi_intent_only: true, // Auto-triggers installed UPI apps on mobile
    callback_url: "https://mybusiness.in/payments/callback"
  })
});

const data = await response.json();
console.log("UPI Payment Intent URL:", data.upi_intent_url);`,

    payout: `// 2. Queue Automated Payout/Settlement
const response = await fetch("https://api.lemonpay.tech/v1/payouts/create", {
  method: "POST",
  headers: {
    "Authorization": "Bearer sec_key_live_8f3d...90a2",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    account_number: "987654321012",
    ifsc: "BARB0VILLUP",
    beneficiary_name: "${simForm.name || "Karthi Distributors"}",
    amount: ${(simProduct.price * 0.98).toFixed(2)},
    purpose: "vendor_settlement",
    reference_id: "payout_v_0284"
  })
});

const data = await response.json();
console.log("Payout Status:", data.status); // "Queued" | "Processing" | "Settled"`,

    webhook: `// 3. Verify Webhook Signature Callback
import crypto from "crypto";

function verifyWebhook(payloadString, receivedSignature, webhookSecret) {
  const computedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(payloadString)
    .digest("hex");
    
  return computedSignature === receivedSignature;
}

// Result determines payment completion trigger:
// payload.event = "payment.captured" | "payout.failed"
`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippets[activeCodeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulator Handlers
  const startSimulation = (pName: string, pPrice: number) => {
    setSimProduct({ name: pName, price: pPrice });
    setSimStep("details");
    setSimErrors({});
  };

  const handleSimFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSimForm(prev => ({ ...prev, [name]: value }));
    if (simErrors[name]) {
      setSimErrors(prev => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const submitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!simForm.name.trim()) errors.name = "Full Name is required.";
    if (!simForm.email.trim()) errors.email = "Email Address is required.";
    else if (!/\S+@\S+\.\S+/.test(simForm.email)) errors.email = "Email is invalid.";
    if (!simForm.phone.trim()) errors.phone = "Phone Number is required.";

    if (Object.keys(errors).length > 0) {
      setSimErrors(errors);
      return;
    }
    setSimStep("paymethod");
  };

  const triggerPayment = () => {
    // Validate pay method inputs
    const errors: Record<string, string> = {};
    if (simForm.paymethod === "card") {
      if (!simForm.cardNumber.trim()) errors.cardNumber = "Card Number is required.";
      if (!simForm.cardExpiry.trim()) errors.cardExpiry = "Expiry is required.";
      if (!simForm.cardCVV.trim()) errors.cardCVV = "CVV is required.";
    } else if (simForm.paymethod === "upi") {
      if (!simForm.upiId.trim() || !simForm.upiId.includes("@")) errors.upiId = "Valid UPI ID is required.";
    } else if (simForm.paymethod === "netbank") {
      if (!simForm.selectedBank) errors.selectedBank = "Please select a banking node.";
    }

    if (Object.keys(errors).length > 0) {
      setSimErrors(errors);
      return;
    }

    setSimStep("processing");
    setProcessingMsg("Contacting bank gateway node...");
    
    // Simulate gateway delay redirects
    setTimeout(() => {
      setProcessingMsg("Authenticating 3D Secure credentials...");
      setTimeout(() => {
        setProcessingMsg("Settling funds in sandbox escrow nodes...");
        setTimeout(() => {
          setTxnId(`TXN_${Math.floor(1000000000 + Math.random() * 9000000000)}`);
          setSimStep("success");
        }, 1200);
      }, 1000);
    }, 800);
  };

  const resetSimulator = () => {
    setSimForm({
      name: "",
      email: "",
      phone: "",
      paymethod: "card",
      cardNumber: "",
      cardExpiry: "",
      cardCVV: "",
      upiId: "",
      selectedBank: ""
    });
    setSimProduct({ name: "", price: 0 });
    setSimStep("select");
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Dynamic grid mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary self-center">
            <Layers className="h-3.5 w-3.5" /> Product Showcase: Cube
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl">
            Cube Dashboard &<br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Unified API Console
            </span>
          </h1>
          <p className="max-w-2xl text-base text-muted-custom mx-auto sm:text-lg">
            Monitor collections, trigger fast vendor settlements, automate KYC checkouts, and verify transaction Webhooks from one unified developer workspace.
          </p>
        </div>
      </section>

      {/* Interactive Checkout Simulator (Visual Completion matching solution screenshots) */}
      <section className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 border-t border-border-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Live Simulation</span>
          <h2 className="text-2xl font-bold text-foreground mt-1 sm:text-3xl">Interactive Checkout Simulator</h2>
          <p className="text-xs text-muted-custom mt-2 leading-relaxed">
            Experience our checkout flow in real time. Select a demo product below to trigger a simulated sandboxed payment settlement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Product Select List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-2">1. Select a Demo Product</h3>
            <div className="flex flex-col gap-4">
              {products.map((p) => (
                <div 
                  key={p.name}
                  className={`rounded-xl border p-4 bg-surface flex flex-col gap-2 transition-all ${
                    simProduct.name === p.name ? "border-primary shadow-lg shadow-primary/5" : "border-border-custom hover:border-primary/20"
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-sm font-bold text-foreground">{p.name}</span>
                    <span className="text-sm font-black text-primary shrink-0">₹{p.price.toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] text-muted-custom leading-normal">{p.desc}</p>
                  <button
                    onClick={() => startSimulation(p.name, p.price)}
                    className="mt-2 rounded-lg bg-surface-hover hover:bg-primary hover:text-background border border-border-custom py-1.5 text-xs font-bold text-foreground transition-all flex items-center justify-center gap-1.5"
                  >
                    Simulate Checkout <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sandbox Payment Gateway Panel */}
          <div className="lg:col-span-7 rounded-2xl border border-border-custom bg-surface overflow-hidden flex flex-col shadow-2xl min-h-[460px]">
            <div className="border-b border-border-custom bg-background/50 px-4 py-3.5 flex justify-between items-center">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-primary animate-ping"></span>
                LemonPay Sandbox Payment Gateway
              </span>
              <span className="text-[10px] font-mono text-muted-custom bg-[#0d0e10] border border-border-custom/50 px-2 py-0.5 rounded-md">
                Status: Sandboxed
              </span>
            </div>

            <div className="flex-1 p-6 sm:p-8 bg-[#0d0e10] flex flex-col justify-center">
              {simStep === "select" && (
                <div className="text-center flex flex-col items-center gap-4 py-12">
                  <Layers className="h-12 w-12 text-muted-custom/30" />
                  <h4 className="text-sm font-bold text-muted-custom">No simulation active</h4>
                  <p className="text-xs text-dim-custom max-w-xs leading-normal">
                    Select one of the demo products on the left to initiate the checkout flow simulation.
                  </p>
                </div>
              )}

              {simStep === "details" && (
                <form onSubmit={submitDetails} className="flex flex-col gap-4">
                  <div className="flex justify-between items-center border-b border-border-custom/50 pb-2">
                    <span className="text-xs font-bold text-foreground">Billing Details</span>
                    <span className="text-xs font-black text-primary">₹{simProduct.price.toFixed(2)}</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-custom">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={simForm.name}
                      onChange={handleSimFormChange}
                      placeholder="Enter billing name"
                      className="rounded-xl border border-border-custom bg-surface p-2.5 text-xs text-foreground placeholder-dim-custom focus:border-primary focus:outline-none"
                    />
                    {simErrors.name && <span className="text-[9px] text-red-500 font-semibold">{simErrors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-custom">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={simForm.email}
                      onChange={handleSimFormChange}
                      placeholder="billing@example.com"
                      className="rounded-xl border border-border-custom bg-surface p-2.5 text-xs text-foreground placeholder-dim-custom focus:border-primary focus:outline-none"
                    />
                    {simErrors.email && <span className="text-[9px] text-red-500 font-semibold">{simErrors.email}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-custom">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={simForm.phone}
                      onChange={handleSimFormChange}
                      placeholder="+91 98765 43210"
                      className="rounded-xl border border-border-custom bg-surface p-2.5 text-xs text-foreground placeholder-dim-custom focus:border-primary focus:outline-none"
                    />
                    {simErrors.phone && <span className="text-[9px] text-red-500 font-semibold">{simErrors.phone}</span>}
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-primary py-3 text-xs font-bold text-background hover:bg-primary-hover transition-colors"
                  >
                    Proceed to Payment Method
                  </button>
                </form>
              )}

              {simStep === "paymethod" && (
                <div className="flex flex-col gap-5">
                  <div className="flex justify-between items-center border-b border-border-custom/50 pb-2">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-foreground">Select Payment Method</span>
                      <span className="text-[10px] text-dim-custom">Paying to LemonPay Merchants Node</span>
                    </div>
                    <span className="text-xs font-black text-primary">₹{simProduct.price.toFixed(2)}</span>
                  </div>

                  {/* Payment Tabs selector */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSimForm(prev => ({ ...prev, paymethod: "card" }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        simForm.paymethod === "card" ? "border-primary bg-primary/5 text-primary" : "border-border-custom text-muted-custom hover:border-primary/20"
                      }`}
                    >
                      <CreditCard className="h-4 w-4" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Card</span>
                    </button>
                    <button
                      onClick={() => setSimForm(prev => ({ ...prev, paymethod: "upi" }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        simForm.paymethod === "upi" ? "border-primary bg-primary/5 text-primary" : "border-border-custom text-muted-custom hover:border-primary/20"
                      }`}
                    >
                      <Smartphone className="h-4 w-4" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">UPI</span>
                    </button>
                    <button
                      onClick={() => setSimForm(prev => ({ ...prev, paymethod: "netbank" }))}
                      className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                        simForm.paymethod === "netbank" ? "border-primary bg-primary/5 text-primary" : "border-border-custom text-muted-custom hover:border-primary/20"
                      }`}
                    >
                      <QrCode className="h-4 w-4" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">NetBank</span>
                    </button>
                  </div>

                  {/* Tab Contents */}
                  {simForm.paymethod === "card" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-muted-custom">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={simForm.cardNumber}
                          onChange={handleSimFormChange}
                          placeholder="4111 2222 3333 4444"
                          className="rounded-xl border border-border-custom bg-surface p-2 text-xs text-foreground placeholder-dim-custom focus:border-primary focus:outline-none"
                        />
                        {simErrors.cardNumber && <span className="text-[8px] text-red-500 font-semibold">{simErrors.cardNumber}</span>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-muted-custom">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={simForm.cardExpiry}
                            onChange={handleSimFormChange}
                            placeholder="12/28"
                            className="rounded-xl border border-border-custom bg-surface p-2 text-xs text-foreground placeholder-dim-custom focus:border-primary focus:outline-none"
                          />
                          {simErrors.cardExpiry && <span className="text-[8px] text-red-500 font-semibold">{simErrors.cardExpiry}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[9px] font-bold uppercase tracking-wider text-muted-custom">CVV</label>
                          <input
                            type="password"
                            name="cardCVV"
                            maxLength={3}
                            value={simForm.cardCVV}
                            onChange={handleSimFormChange}
                            placeholder="***"
                            className="rounded-xl border border-border-custom bg-surface p-2 text-xs text-foreground placeholder-dim-custom focus:border-primary focus:outline-none"
                          />
                          {simErrors.cardCVV && <span className="text-[8px] text-red-500 font-semibold">{simErrors.cardCVV}</span>}
                        </div>
                      </div>
                    </div>
                  )}

                  {simForm.paymethod === "upi" && (
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[9px] font-bold uppercase tracking-wider text-muted-custom">UPI Virtual Payment Address (VPA)</label>
                        <input
                          type="text"
                          name="upiId"
                          value={simForm.upiId}
                          onChange={handleSimFormChange}
                          placeholder="aravind@ybl"
                          className="rounded-xl border border-border-custom bg-surface p-2.5 text-xs text-foreground placeholder-dim-custom focus:border-primary focus:outline-none"
                        />
                        {simErrors.upiId && <span className="text-[8px] text-red-500 font-semibold">{simErrors.upiId}</span>}
                      </div>
                      <div className="text-[10px] text-muted-custom text-center leading-normal border border-border-custom bg-surface/30 p-2.5 rounded-xl">
                        Simulating sandbox UPI transaction. This will push a callback check.
                      </div>
                    </div>
                  )}

                  {simForm.paymethod === "netbank" && (
                    <div className="flex flex-col gap-3">
                      <label className="text-[9px] font-bold uppercase tracking-wider text-muted-custom">Choose Bank Node</label>
                      <div className="grid grid-cols-2 gap-2">
                        {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank"].map((b) => (
                          <button
                            key={b}
                            onClick={() => {
                              setSimForm(prev => ({ ...prev, selectedBank: b }));
                              setSimErrors(prev => {
                                const copy = { ...prev };
                                delete copy.selectedBank;
                                return copy;
                              });
                            }}
                            className={`p-2 rounded-lg border text-left text-xs font-semibold transition-colors ${
                              simForm.selectedBank === b ? "border-primary bg-primary/5 text-primary" : "border-border-custom text-muted-custom hover:border-primary/20"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                      {simErrors.selectedBank && <span className="text-[8px] text-red-500 font-semibold">{simErrors.selectedBank}</span>}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSimStep("details")}
                      className="flex-1 rounded-xl border border-border-custom py-3 text-xs font-bold text-foreground hover:bg-surface-hover transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={triggerPayment}
                      className="flex-1 rounded-xl bg-primary py-3 text-xs font-bold text-background hover:bg-primary-hover transition-colors"
                    >
                      Pay ₹{simProduct.price.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}

              {simStep === "processing" && (
                <div className="text-center flex flex-col items-center gap-4 py-8">
                  <RefreshCw className="h-12 w-12 text-primary animate-spin" />
                  <h4 className="text-sm font-bold text-foreground">{processingMsg}</h4>
                  <div className="flex flex-col gap-1 text-[11px] text-muted-custom leading-normal max-w-xs">
                    <span>Transaction status: IN_PROGRESS</span>
                    <span>Do not refresh or close this sandbox overlay.</span>
                  </div>
                </div>
              )}

              {simStep === "success" && (
                <div className="flex flex-col gap-5 py-4">
                  <div className="text-center flex flex-col items-center gap-2">
                    <CheckCircle2 className="h-12 w-12 text-primary animate-bounce" />
                    <h4 className="text-base font-extrabold text-foreground">Sandbox Payment Successful!</h4>
                    <span className="text-[10px] text-muted-custom">Settled to LemonPay Escrow Nodes</span>
                  </div>

                  <div className="rounded-xl border border-border-custom bg-surface p-4 flex flex-col gap-2.5 text-xs text-muted-custom">
                    <div className="flex justify-between">
                      <span>Transaction ID:</span>
                      <span className="font-mono text-foreground font-semibold">{txnId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Merchant Reference:</span>
                      <span className="font-mono text-foreground font-semibold">order_sme_84920</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer:</span>
                      <span className="text-foreground font-semibold">{simForm.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amount Settled:</span>
                      <span className="text-primary font-black">₹{simProduct.price.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={resetSimulator}
                    className="w-full rounded-xl bg-primary py-3 text-xs font-bold text-background hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Restart Simulator
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive API Handoff Widget */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 border-t border-border-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Text panel */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Developer First</span>
              <h2 className="text-2xl font-bold text-foreground mt-1 sm:text-3xl">Integrate in minutes, scale to millions</h2>
            </div>
            <p className="text-sm text-muted-custom leading-relaxed">
              We provide clean, standards-compliant JSON APIs and secure Webhook events to plug directly into your web app, ERP, or billing software.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2 text-xs text-muted-custom">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Sandbox testing isolation (zero regulatory locks)</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-custom">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>SHA-256 Webhook signature validation</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-custom">
                <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Complete SDK guides for Node.js, Python, and React</span>
              </div>
            </div>
          </div>

          {/* Interactive Code IDE Panel */}
          <div className="lg:col-span-7 rounded-xl border border-border-custom bg-surface overflow-hidden flex flex-col shadow-2xl">
            <div className="border-b border-border-custom bg-background/50 px-4 py-3 flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-muted-custom" />
                <span className="text-xs font-mono font-medium text-muted-custom">API Sandbox IDE</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveCodeTab("intent")}
                  className={`text-xs font-mono px-2 py-1 rounded-md transition-colors ${
                    activeCodeTab === "intent" ? "bg-primary/10 text-primary font-semibold" : "text-muted-custom hover:text-foreground"
                  }`}
                >
                  intent.js
                </button>
                <button
                  onClick={() => setActiveCodeTab("payout")}
                  className={`text-xs font-mono px-2 py-1 rounded-md transition-colors ${
                    activeCodeTab === "payout" ? "bg-primary/10 text-primary font-semibold" : "text-muted-custom hover:text-foreground"
                  }`}
                >
                  payout.js
                </button>
                <button
                  onClick={() => setActiveCodeTab("webhook")}
                  className={`text-xs font-mono px-2 py-1 rounded-md transition-colors ${
                    activeCodeTab === "webhook" ? "bg-primary/10 text-primary font-semibold" : "text-muted-custom hover:text-foreground"
                  }`}
                >
                  webhook.js
                </button>
              </div>
            </div>

            {/* Code Content View */}
            <div className="flex-1 p-4 bg-[#0d0e10] overflow-x-auto min-h-[280px] relative">
              <pre className="font-mono text-xs text-secondary leading-relaxed">
                <code>{codeSnippets[activeCodeTab]}</code>
              </pre>
              
              {/* Copy button */}
              <button
                onClick={copyToClipboard}
                className="absolute top-4 right-4 bg-surface border border-border-custom px-3 py-1.5 rounded-lg text-xs font-medium text-foreground hover:bg-surface-hover transition-colors shadow-lg"
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-t border-border-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl">
            Designed for operations & finance teams
          </h2>
          <p className="text-muted-custom mt-4">
            Cube handles the technical complexity so your finance and operations teams can focus on growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Real-time Callbacks & Webhooks</h3>
            <p className="text-xs text-muted-custom leading-relaxed">
              Never guess a payment status. Cube pushes instant Callback notifications to your systems on completed transactions, failed intents, or payout errors.
            </p>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-4">
            <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <RefreshCw className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">Automated Escrow Settlements</h3>
            <p className="text-xs text-muted-custom leading-relaxed">
              Consolidate merchant receipts and schedule automated payouts to vendors. Custom routing rules distribute settlements on fixed hourly or T+1 cycles.
            </p>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-border-custom bg-surface p-6 flex flex-col gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Download className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-foreground">One-click Reconciliation</h3>
            <p className="text-xs text-muted-custom leading-relaxed">
              Export payment ledgers, chargeback reviews, settlement records, and transaction logs directly into Excel, CSV, or custom accounting systems.
            </p>
          </div>
        </div>
      </section>

      {/* Security notice */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 border-t border-border-custom/50 mb-12">
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-foreground text-sm">Escrow Security & Compliance Guarantee</h4>
            <p className="text-xs text-muted-custom mt-2 leading-relaxed">
              All transactions processed via the LemonCube console run over Secure Sockets Layer (SSL) encryption protocols. Under RBI Payment Aggregator guidelines, merchant settlement funds are maintained in isolated escrow accounts with designated banking nodes, securing capital from third-party liabilities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
