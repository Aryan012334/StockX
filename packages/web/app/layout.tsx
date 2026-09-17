import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockX — Stock Trading Simulation",
  description: "A simulated stock trading platform. Practice trading with $50,000 in virtual capital against a live matching engine.",
  icons: {
    icon: "/favicon.svg",
  },
};

import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "text-lg py-6 px-8 rounded-xl",
                title: "text-lg font-semibold",
                description: "text-base",
              },
            }}
          />
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
