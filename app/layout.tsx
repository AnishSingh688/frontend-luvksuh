import type { Metadata } from "next";
import { Cinzel, Mukta } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const mukta = Mukta({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Luv Kush Pratisthan | Biratnagar, Nepal",
  description: "Luv Kush Pratisthan is a community organization in Biratnagar, Nepal, focused on the welfare and progress of the Kushwaha Samaj.",
};

import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${mukta.variable} antialiased font-[family-name:var(--font-body)] text-slate-800 bg-gradient-to-b from-white via-amber-50/40 to-amber-100/40 selection:bg-[--color-brand-gold]/30`}>
        <Providers>
          {children}
        </Providers>
        {/* Khalti Payment Gateway Script */}
        <Script src="https://khalti.com/static/khalti-checkout.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
