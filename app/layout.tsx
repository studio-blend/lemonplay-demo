import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lemonpay.tech"),
  title: {
    template: "%s | LemonPay — India Payment Gateway",
    default: "LemonPay — Payment Infrastructure for Growing India",
  },
  description: "LemonPay is India's secure payment technology platform. Accept UPI, QR codes, and API payouts with custom automated integrations, auto-KYC, and the Cube analytics dashboard.",
  openGraph: {
    siteName: "LemonPay",
    type: "website",
    locale: "en_IN",
    url: "https://lemonpay.tech",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "./",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lemonpay Software Private Limited",
    "alternateName": "LemonPay",
    "url": "https://lemonpay.tech",
    "logo": "https://lemonpay.tech/logo-hd.png",
    "description": "LemonPay is a payment technology platform offering UPI collections, payouts, QR payments, and AI-powered KYC for businesses in India.",
    "foundingDate": "2022",
    "founders": [
      { "@type": "Person", "name": "Senthil Kumar Yadav", "jobTitle": "CEO & Founder" },
      { "@type": "Person", "name": "Sathish Kumar Yadav", "jobTitle": "CBO & Co-Founder" },
      { "@type": "Person", "name": "Sampath Kumar Yadav", "jobTitle": "CFO & Co-Founder" }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "No. 303, 1st Floor, Kamaraj Salai",
      "addressLocality": "Pondicherry",
      "postalCode": "605013",
      "addressCountry": "IN"
    },
    "contactPoint": { 
      "@type": "ContactPoint", 
      "contactType": "sales", 
      "email": "enquiry@lemonpay.tech" 
    },
    "sameAs": [
      "https://www.linkedin.com/company/lemonpay"
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-background text-foreground"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
