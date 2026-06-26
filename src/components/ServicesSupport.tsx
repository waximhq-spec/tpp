"use client";

import { motion } from 'motion/react';
import { BatteryCharging, Wrench, RefreshCw, AlertCircle, Phone, ArrowUpRight } from 'lucide-react';

export default function ServicesSupport() {
  const services = [
    {
      title: "Battery Replacement",
      description: "Replacement of old or dead solar batteries with new ones to restore backup capacity.",
      icon: BatteryCharging
    },
    {
      title: "Inverter Diagnostic & Repair",
      description: "Troubleshooting and fixing inverter errors, charging issues, and card faults.",
      icon: Wrench
    },
    {
      title: "System Support & Maintenance",
      description: "General system check-ups, wiring adjustments, and maintenance to keep the setup running correctly.",
      icon: RefreshCw
    }
  ];

  return (
    <section id="services-support" className="py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Background soft glowing circle */}
      <div className="absolute left-0 top-0 -z-10 w-[300px] h-[300px] rounded-full bg-radial from-[#c6ebd9]/10 to-transparent blur-3xl opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest">Our Service Center</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-primary font-black tracking-tight leading-tight">
            Our Solar Service Center
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            Get professional assistance with troubleshooting, component replacements, and general system maintenance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white border border-slate-100 hover:border-slate-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_30px_rgba(1,50,32,0.03)] rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  
                  <h3 className="text-base font-bold text-primary tracking-tight mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Support CTA Callout */}
        <div className="mt-12 bg-primary text-white rounded-2xl p-6 md:p-8 max-w-4xl mx-auto relative overflow-hidden shadow-xl shadow-primary/10">
          <div className="absolute right-0 bottom-0 -z-10 w-[200px] h-[200px] rounded-full bg-white/5 blur-2xl" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/10 rounded-full text-[10px] font-bold tracking-wider uppercase text-secondary">
                <AlertCircle className="w-3 h-3 text-secondary" />
                <span>Repair Support</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold tracking-tight">
                Need service or repair?
              </h3>
              <p className="text-white/70 text-xs max-w-lg leading-relaxed">
                Contact our support team to schedule a diagnostic check or component replacement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <a
                href="tel:+919541831565"
                className="w-full sm:w-auto bg-white text-primary hover:bg-slate-50 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>Call Service Center</span>
              </a>
              <a
                href="https://wa.me/919541831565?text=Hi,%20I%20need%20service/repair%20support%20for%20my%20solar%20setup."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-secondary text-primary hover:bg-secondary/90 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>WhatsApp Support</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
