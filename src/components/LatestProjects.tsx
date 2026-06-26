"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
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

  const videos = [
    {
      id: 1,
      src: "https://www.instagram.com/reel/DZ99qIGSeXj/embed/",
      title: "Client Video Review"
    },
    {
      id: 2,
      src: "https://www.instagram.com/reel/DYW3pkPSgq-/embed/",
      title: "Client Video Review"
    },
    {
      id: 3,
      src: "https://www.instagram.com/reel/DI9G9PcyQ1r/embed/",
      title: "Client Video Review"
    },
    {
      id: 4,
      src: "https://www.instagram.com/reel/DYEw22ISCwR/embed/",
      title: "Client Video Review"
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="client-videos" 
      className="py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden"
    >
      {/* Visual background lights */}
      <div className="absolute top-0 right-1/4 -translate-y-1/2 -z-10 w-[400px] h-[400px] rounded-full bg-radial from-[#c6ebd9]/10 to-transparent blur-3xl opacity-30 pointer-events-none" />
 
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 max-w-6xl mx-auto">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10 mb-3">
              <Instagram className="w-3.5 h-3.5 text-pink-600 shrink-0" />
              <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest">Client Testimonials</span>
            </div>
            <h2 className="text-3xl md:text-4xl text-primary font-black tracking-tight leading-tight">
              What Our Clients Say
            </h2>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              Watch real video reviews and testimonials from our clients sharing their experience.
            </p>
          </div>
          
          <a
            href="https://www.instagram.com/the_power_planet/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shrink-0 self-start md:self-auto cursor-pointer shadow-md hover:shadow-lg"
          >
            <Instagram className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
            <span>Follow Us on Instagram</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/70" />
          </a>
        </div>

        {/* Embedded Feed Grid */}
        <div className="relative w-full max-w-6xl mx-auto">
          {isInView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
              {videos.map((vid, idx) => (
                <motion.div
                  key={vid.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-white border border-slate-100 hover:border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(1,50,32,0.03)] rounded-2xl p-3 transition-all duration-300 flex flex-col w-full max-w-[340px] mx-auto"
                >
                  {/* Clean 9:16 Video Container that masks Instagram header and footer */}
                  <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-black shadow-inner">
                    <iframe
                      src={vid.src}
                      className="absolute w-full h-[135%] -top-[14%] left-0 border-0"
                      scrolling="no"
                      allowFullScreen
                      title={`Client Testimonial Video ${vid.id}`}
                    />
                  </div>

                  {/* Title */}
                  <div className="pt-4 pb-2 px-1 text-center">
                    <h3 className="text-sm font-bold text-primary tracking-tight">
                      {vid.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* Skeleton Loading State */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full justify-items-center">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="bg-white border border-slate-100 rounded-2xl p-3 w-full max-w-[340px] space-y-4 animate-pulse">
                  <div className="aspect-[9/16] bg-slate-100 rounded-xl" />
                  <div className="h-4 bg-slate-100 rounded w-2/3 mx-auto" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
