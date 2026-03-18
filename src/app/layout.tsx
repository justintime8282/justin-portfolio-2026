import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  variable: "--font-vt323",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Justin's Pokémon Journey Portfolio",
  description: "A pixel-art adventure through my career and side quests.",
  metadataBase: new URL("https://justin-portfolio-2026-psi.vercel.app"),
  openGraph: {
    title: "Justin's Pokémon Journey Portfolio",
    description: "A pixel-art adventure through my career and side quests.",
    url: "https://justin-portfolio-2026-psi.vercel.app",
    siteName: "Justin's Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Justin's Pokémon Journey Portfolio — pixel-art landing page",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Justin's Pokémon Journey Portfolio",
    description: "A pixel-art adventure through my career and side quests.",
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
