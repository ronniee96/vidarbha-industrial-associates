import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vidarbha Industrial Associates | Industrial Cleaning & Maintenance",
  description:
    "High-pressure hydro jetting, chemical cleaning, retubing, testing and industrial maintenance by Vidarbha Industrial Associates.",
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
      <body>{children}</body>
    </html>
  );
}