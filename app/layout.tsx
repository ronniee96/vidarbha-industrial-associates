import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vidarbha Industrial Associates | Industrial Cleaning & Maintenance",
  description:
    "High-pressure hydro jetting, chemical cleaning, retubing, testing and industrial maintenance by Vidarbha Industrial Associates.",
  metadataBase: new URL("https://www.vidarbhaindustrialassociates.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Vidarbha Industrial Associates | Industrial Cleaning & Maintenance",
    description: "High-pressure hydro jetting, chemical cleaning, retubing, testing and industrial maintenance across India.",
    url: "https://www.vidarbhaindustrialassociates.com",
    siteName: "Vidarbha Industrial Associates",
    images: [{ url: "/social-preview.svg", width: 1200, height: 630, alt: "Vidarbha Industrial Associates industrial services" }],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidarbha Industrial Associates",
    description: "Industrial cleaning, hydro jetting, retubing, testing and maintenance.",
    images: ["/social-preview.svg"]
  },
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
  keywords: [
    "hydro jetting",
    "industrial cleaning",
    "chemical cleaning",
    "retubing",
    "hydro testing",
    "Chandrapur",
    "Vidarbha Industrial Associates"
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}<Script id="ga-loader" strategy="afterInteractive">{`if (${process.env.NEXT_PUBLIC_GA_ID ? "true" : "false"}) { window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} window.gtag = gtag; gtag("js", new Date()); gtag("config", "${process.env.NEXT_PUBLIC_GA_ID || ""}", { anonymize_ip: true }); }`}</Script>{process.env.NEXT_PUBLIC_GA_ID && <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />}</body>
    </html>
  );
}