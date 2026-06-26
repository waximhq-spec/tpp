"use client";

import { motion } from 'motion/react';
import { Play } from 'lucide-react';

export default function Installations() {
  const installations = [
    {
      id: 1,
      title: "Home Rooftop Installation",
      vimeoId: "1204861667"
    },
    {
      id: 2,
      title: "Home Rooftop Installation",
      vimeoId: "1204861514"
    },
    {
      id: 3,
      title: "Home Rooftop Installation",
      vimeoId: "1204862091"
    },
    {
      id: 4,
      title: "Home Rooftop Installation",
      vimeoId: "1204861778"
    }
  ];

  return (
    <section id="installations" className="py-20 bg-white border-t border-slate-100 relative overflow-hidden">
      {/* Background soft glowing circle */}
      <div className="absolute right-0 top-0 -z-10 w-[300px] h-[300px] rounded-full bg-radial from-[#c6ebd9]/10 to-transparent blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest">Our Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-primary font-black tracking-tight leading-tight">
            Completed Installations
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Real solar installations across Jammu & Kashmir. Explore our work in action.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {installations.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="bg-white border border-slate-100 hover:border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(1,50,32,0.03)] rounded-2xl p-3 transition-all duration-300 flex flex-col"
            >
              {/* 9:16 Aspect Video Container */}
              <div className="relative aspect-[9/16] w-full rounded-xl overflow-hidden bg-slate-950 shadow-inner group">
                {project.vimeoId ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${project.vimeoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0`}
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute top-0 left-0 w-full h-full"
                    title={project.title}
                  />
                ) : (
                  /* Placeholder UI */
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-primary/80 to-primary text-center">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 text-secondary fill-secondary" />
                    </div>
                    <span className="text-xs font-semibold text-white/90">Video Upload Pending</span>
                    <span className="text-[10px] text-white/50 mt-1 max-w-[160px] leading-relaxed">
                      Vimeo streaming link will display here
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="pt-4 pb-2 px-1 text-center">
                <h3 className="text-sm font-bold text-primary tracking-tight">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
