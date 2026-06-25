"use client";

import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Sun, Banknote, CloudSnow, Zap, Users } from 'lucide-react';

function AnimatedNumber({
  value,
  duration = 1500,
  suffix = '',
  prefix = ''
}: {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = progress * (2 - progress); // Ease out quad
            
            setCount(Math.floor(easedProgress * value));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}


interface HeroProps {
  onGetQuote: () => void;
}

export default function Hero({ onGetQuote }: HeroProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-white px-4 md:px-10 max-w-7xl mx-auto w-full min-h-[580px] md:min-h-[660px] flex items-center py-8 md:py-16">
      {/* Soft gradient background mesh */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] rounded-full bg-radial from-[#c6ebd9]/15 to-transparent blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] rounded-full bg-radial from-[#fef0db]/10 to-transparent blur-3xl opacity-40 pointer-events-none" />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        
        {/* Left Column: Value Proposition & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col gap-5"
        >
          {/* Live Subsidy Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10 max-w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wider">Govt Subsidy: Save Up to 78%</span>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary font-extrabold leading-[1.1] tracking-tight">
              Cut Your Electricity Bills by <span className="text-secondary">Up to 90%</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
              Get a government-subsidized solar system built for Kashmir&apos;s winter. Made to shed heavy snow easily and keep your electricity bills low year-round.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <button
              onClick={onGetQuote}
              id="hero-check-savings-btn"
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(1,50_32,0.15)] hover:shadow-[0_6px_25px_rgba(1,50_32,0.25)] flex items-center justify-center gap-2 group cursor-pointer text-center"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection('testimonials')}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm px-6 py-3.5 rounded-xl transition-all duration-200 border border-slate-200 hover:border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Watch Testimonials</span>
            </button>
          </div>

          {/* Animated Credibility Stats Grid */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            <div className="bg-slate-50/50 hover:bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 group hover:-translate-y-0.5 shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-secondary fill-secondary/20 shrink-0" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">Total Installed Capacity</span>
              </div>
              <p className="text-2xl md:text-3xl font-black text-primary tracking-tight leading-none">
                <AnimatedNumber value={1000} suffix=" kW+" />
              </p>
              <p className="text-xs text-slate-400 mt-2 font-medium">Clean energy active</p>
            </div>

            <div className="bg-slate-50/50 hover:bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all duration-300 group hover:-translate-y-0.5 shadow-[0_2px_15px_rgba(0,0,0,0.01)]">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary fill-primary/10 shrink-0" />
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500">No. of Installations</span>
              </div>
              <p className="text-2xl md:text-3xl font-black text-primary tracking-tight leading-none">
                <AnimatedNumber value={240} suffix="+" />
              </p>
              <p className="text-xs text-slate-400 mt-2 font-medium">Completed setups in J&K</p>
            </div>
          </div>

        </motion.div>

        {/* Right Column: Visual with Overlays */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex lg:col-span-6 relative w-full h-[240px] sm:h-[320px] lg:h-[420px] items-center justify-center"
        >
          {/* Main Photo Frame */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-xl border border-slate-100/50 group bg-slate-50">
            <img
              src="/kashmiri_solar_home.png"
              alt="Premium Kashmiri villa with installed rooftop solar panels against snowy peaks"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
          </div>

        </motion.div>
      </div>
    </section>
  );
}
