import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { WhatIs } from "@/components/sections/WhatIs";
import { Features } from "@/components/sections/Features";
import { TerminalDemo } from "@/components/interactive/TerminalDemo";
import { FolderExplorer } from "@/components/interactive/FolderExplorer";
import { Course } from "@/components/sections/Course";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="bg-background text-white min-h-screen">
      <Navigation />
      <Hero />
      <Problem />
      <WhatIs />
      <TerminalDemo />
      <Features />
      <FolderExplorer />
      <Course />
      <CTA />
      <Footer />
    </main>
  );
}
