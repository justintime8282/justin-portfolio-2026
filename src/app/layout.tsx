import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justin's Webspace | Career & Adventure",
  description: "A pixel-art journey through the career and side-quests of Justin Chun, Strategy & Ops professional.",
  metadataBase: new URL("https://justin-portfolio-2026-psi.vercel.app"),
  openGraph: {
    title: "Justin's Webspace | Career & Adventure",
    description: "A pixel-art journey through the career and side-quests of Justin Chun, Strategy & Ops professional.",
    url: "https://justin-portfolio-2026-psi.vercel.app",
    siteName: "Justin's Webspace",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Justin's Webspace — pixel-art career & adventure portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin's Webspace | Career & Adventure",
    description: "A pixel-art journey through the career and side-quests of Justin Chun, Strategy & Ops professional.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.variable} antialiased`}>{children}</body>
    </html>
  );
}
