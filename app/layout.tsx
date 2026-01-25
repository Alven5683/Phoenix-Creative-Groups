import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}>
        <Navbar />
        <main className="min-h-[80vh] flex flex-col">
          <div className="w-full mx-auto px-2 md:px-6 flex-1 flex flex-col">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
