
import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const orbitron = Orbitron({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phoenix Creative Group",
  description: "Premium digital agency for web, mobile, and branding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`min-h-screen min-w-full w-full antialiased bg-background bg-hero-gradient text-white ${orbitron.variable} ${inter.variable} font-sans`}
        style={{ WebkitFontSmoothing: "antialiased" }}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
