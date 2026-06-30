"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lemonpay-cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("lemonpay-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("lemonpay-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-surface border border-border-custom p-4 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex flex-col gap-3">
        <div>
          <h5 className="text-sm font-semibold text-foreground">Cookie Consent</h5>
          <p className="text-xs text-muted-custom mt-1 leading-normal">
            We use cookies to optimize our platform services, analyze site usage, and secure merchant checkout flows in compliance with the Digital Personal Data Protection (DPDP) Act 2023. Read our{" "}
            <Link href="/legal-policies/privacy" className="text-primary hover:underline font-medium">
              Privacy Policy
            </Link>{" "}
            to learn more.
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 pt-1">
          <button
            onClick={handleDecline}
            className="text-xs font-semibold text-muted-custom hover:text-foreground transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-hover"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="text-xs font-semibold text-background bg-primary hover:bg-primary-hover transition-colors px-4 py-1.5 rounded-lg shadow-md"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
