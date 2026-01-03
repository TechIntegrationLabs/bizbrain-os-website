import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "BizBrain OS - The Operating System for Your Business",
  description: "A living system that ingests chaos, builds context, and automates everything. Built with Claude Code.",
  keywords: ["business brain", "business operating system", "AI automation", "Claude Code", "business context"],
  authors: [{ name: "Tech Integration Labs" }],
  openGraph: {
    title: "BizBrain OS - The Operating System for Your Business",
    description: "A living system that ingests chaos, builds context, and automates everything.",
    type: "website",
    url: "https://bizbrain-os.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "BizBrain OS - The Operating System for Your Business",
    description: "A living system that ingests chaos, builds context, and automates everything.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark lenis lenis-smooth">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
