"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Events from "@/components/Events";
import Members from "@/components/Members";
import Membership from "@/components/Membership";
import Donate from "@/components/Donate";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Home() {
  useScrollReveal();

  return (
    <div>
      {/* Top ribbon */}
      <div className="w-full bg-brand-ramblue text-white text-xs tracking-wide">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <span>Biratnagar, Nepal</span>
          <span>For the welfare and progress of the Kushwaha Samaj</span>
        </div>
      </div>

      <Header />
      <Hero />
      <About />
      <Programs />
      <Events />
      <Members />

      {/* <section id="membership" className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-start">
          <Membership />
          <Donate />
        </div>
      </section> */}

      <Contact />
      <Footer />
    </div>
  );
}
