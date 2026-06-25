"use client";

import { useState, useEffect, useRef } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

export default function LatestProjects() {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy load intersection setup to delay iframe loading until visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '150px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="testimonials" 
      className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900"
    >
      {/* Visual background lights */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 -z-10 w-[500px] h-[500px] rounded-full bg-radial from-[#c6ebd9]/5 to-transparent blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 translate-y-1/2 -z-10 w-[400px] h-[400px] rounded-full bg-radial from-primary/10 to-transparent blur-3xl opacity-30 pointer-events-none" />
 
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 mb-4 backdrop-blur-md">
              <Instagram className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
              <span className="text-[10px] md:text-xs font-bold text-slate-300 uppercase tracking-widest">Client Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none">
              What Our Clients Say
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
              Watch real video reviews and testimonials from our clients sharing their experience.
            </p>
          </div>
          
          <a
            href="https://www.instagram.com/the_power_planet/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 bg-gradient-to-r from-pink-500/10 to-purple-500/10 hover:from-pink-500/20 hover:to-purple-500/20 text-white font-bold text-xs px-6 py-3.5 rounded-2xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 backdrop-blur-md hover:-translate-y-0.5 shrink-0 self-start md:self-auto"
          >
            <Instagram className="w-4 h-4 text-pink-500 group-hover:scale-110 transition-transform duration-300" />
            <span>Follow Us on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Embedded Feed Container */}
        <div className="relative w-full min-h-[500px] bg-slate-900/15 border border-slate-900 rounded-3xl backdrop-blur-xl p-6 md:p-10 flex flex-col items-center">
          
          {isInView ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-items-center">
              
              {/* Embed 1 Card */}
              <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-900 bg-white/5 backdrop-blur-sm p-1.5 hover:scale-[1.01] transition-transform duration-300 flex justify-center">
                <iframe
                  src="https://www.instagram.com/reel/DZ99qIGSeXj/embed/"
                  className="w-full h-[480px] md:h-[540px] border-0 rounded-2xl bg-white"
                  scrolling="no"
                  allowFullScreen
                  title="Instagram Reel - Batamaloo Srinagar"
                />
              </div>

              {/* Embed 2 Card */}
              <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-900 bg-white/5 backdrop-blur-sm p-1.5 hover:scale-[1.01] transition-transform duration-300 flex justify-center">
                <iframe
                  src="https://www.instagram.com/reel/DYW3pkPSgq-/embed/"
                  className="w-full h-[480px] md:h-[540px] border-0 rounded-2xl bg-white"
                  scrolling="no"
                  allowFullScreen
                  title="Instagram Reel - Srinagar Service"
                />
              </div>

              {/* Embed 3 Card */}
              <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-900 bg-white/5 backdrop-blur-sm p-1.5 hover:scale-[1.01] transition-transform duration-300 flex justify-center">
                <iframe
                  src="https://www.instagram.com/reel/DI9G9PcyQ1r/embed/"
                  className="w-full h-[480px] md:h-[540px] border-0 rounded-2xl bg-white"
                  scrolling="no"
                  allowFullScreen
                  title="Instagram Reel - Srinagar Customer Testimonial"
                />
              </div>

              {/* Embed 4 Card */}
              <div className="w-full max-w-[420px] rounded-3xl overflow-hidden shadow-2xl border border-slate-900 bg-white/5 backdrop-blur-sm p-1.5 hover:scale-[1.01] transition-transform duration-300 flex justify-center">
                <iframe
                  src="https://www.instagram.com/reel/DYEw22ISCwR/embed/"
                  className="w-full h-[480px] md:h-[540px] border-0 rounded-2xl bg-white"
                  scrolling="no"
                  allowFullScreen
                  title="Instagram Reel - Srinagar Complete Solar"
                />
              </div>

            </div>
          ) : (
            /* Skeleton Loading State before scroll entrance */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full justify-items-center">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-slate-900/40 rounded-3xl p-5 border border-slate-800/40 w-full max-w-[420px] space-y-4 animate-pulse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3.5 bg-slate-800 rounded w-1/3" />
                      <div className="h-2.5 bg-slate-800 rounded w-1/4" />
                    </div>
                  </div>
                  <div className="aspect-[4/5] bg-slate-800 rounded-2xl" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-800 rounded w-5/6" />
                    <div className="h-3 bg-slate-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
