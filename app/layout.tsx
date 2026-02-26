
import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
        <Navbar />
        <main className="min-h-[80vh] flex flex-col w-full">
          <div className="mx-auto w-full max-w-[1400px] flex-1 flex flex-col px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
