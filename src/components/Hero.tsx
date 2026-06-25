import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Sun, Banknote, CloudSnow, Zap, Users } from 'lucide-react';

interface HeroProps {
  onGoToCalculator: () => void;
}

export default function Hero({ onGoToCalculator }: HeroProps) {
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
            <span className="text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wider">Live Subsidy: Up to 78% Approved</span>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-3">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-primary font-extrabold leading-[1.1] tracking-tight">
              Cut Your Electricity Bills by <span className="text-secondary">Up to 90%</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-xl">
              Government-subsidized solar systems built for Kashmir&apos;s unique climate. Engineered to resist heavy winter snowfall while yielding maximum output.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
            <a
              href="tel:+917889880188"
              id="hero-check-savings-btn"
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(1,50,32,0.15)] hover:shadow-[0_6px_25px_rgba(1,50,32,0.25)] flex items-center justify-center gap-2 group cursor-pointer text-center"
            >
              <span>Free Consultation Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={() => scrollToSection('customer-videos')}
              className="bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium text-sm px-6 py-3.5 rounded-xl transition-all duration-200 border border-slate-200 hover:border-slate-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Watch Customer Reels</span>
            </button>
          </div>

          {/* Inline Metrics Bar — the stat chips the user liked */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                <Zap className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-primary leading-none">500+</p>
                <p className="text-[10px] text-slate-400 font-medium">Installations</p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-100 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-primary leading-none">1,000+</p>
                <p className="text-[10px] text-slate-400 font-medium">Families Powered</p>
              </div>
            </div>
            <div className="w-px h-8 bg-slate-100 hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="text-lg font-extrabold text-primary leading-none">MNRE</p>
                <p className="text-[10px] text-slate-400 font-medium">Govt Approved</p>
              </div>
            </div>
          </div>

        </motion.div>

        {/* Right Column: Visual with Overlays */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative w-full h-[240px] sm:h-[320px] lg:h-[420px] flex items-center justify-center"
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

          {/* Floating Card 1 - Subsidy */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="absolute top-4 right-4 backdrop-blur-md bg-white/90 border border-slate-100/50 shadow-lg p-2.5 rounded-xl flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
              <Sun className="w-4 h-4 fill-amber-500/20 text-amber-500" />
            </div>
            <div>
              <p className="text-[8px] uppercase font-bold tracking-widest text-slate-400">Govt Grant</p>
              <p className="text-xs font-extrabold text-primary">₹78,000 Off</p>
            </div>
          </motion.div>

          {/* Floating Card 2 - Performance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="absolute bottom-4 right-4 backdrop-blur-md bg-white/90 border border-slate-100/50 shadow-lg p-2.5 rounded-xl flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <Banknote className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <p className="text-[8px] uppercase font-bold tracking-widest text-slate-400">Payback Time</p>
              <p className="text-xs font-extrabold text-primary">Under 4 Years</p>
            </div>
          </motion.div>

          {/* Floating Card 3 - Kashmir Specific */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="absolute bottom-4 left-4 backdrop-blur-md bg-primary/95 border border-white/10 shadow-lg p-2.5 rounded-xl flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#ffddb4] shrink-0">
              <CloudSnow className="w-4 h-4 text-[#ffddb4]" />
            </div>
            <div>
              <p className="text-[8px] uppercase font-bold tracking-widest text-primary-fixed-dim">Alpine Tech</p>
              <p className="text-[10px] md:text-xs font-bold text-white">Snow-Resistant</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
