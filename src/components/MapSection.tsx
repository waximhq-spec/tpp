"use client";

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export default function MapSection() {
  const directionsUrl = "https://www.google.com/maps/place/The+Power+Planet+(Solar,+Batteries,+Inverter)+Super+Stockiest+and+Genus+Service+Center/@34.0679266,74.7883813,17z/data=!3m1!4b1!4m6!3m5!1s0x38e18f56116e1c17:0x1dcadcb73cab759b!8m2!3d34.0679266!4d74.7883813!16s%2Fg%2F11wspyy1n5";

  return (
    <section id="our-location" className="py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-1/4 bottom-0 translate-y-1/2 -z-10 w-[400px] h-[400px] rounded-full bg-radial from-[#c6ebd9]/10 to-transparent blur-3xl opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Column: Office details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10">
              <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
              <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest">Our Showroom</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl text-primary font-black tracking-tight leading-tight">
              Visit The Power Planet
            </h2>
            
            <p className="text-slate-500 text-sm leading-relaxed">
              Drop by our main Srinagar showroom and service center. Meet our friendly team, see our solar panels and batteries in person, and get a simple, step-by-step plan to save on your electricity bills.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-primary">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">Address</h4>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">
                    Firdousabad, Batamaloo, Srinagar, Jammu & Kashmir 190009
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-primary">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">Phone</h4>
                  <a href="tel:+919541831565" className="text-slate-500 hover:text-primary transition-colors text-xs mt-0.5 block">
                    +91 95418 31565
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">Email</h4>
                  <a href="mailto:tppkashmir@gmail.com" className="text-slate-500 hover:text-primary transition-colors text-xs mt-0.5 block">
                    tppkashmir@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm text-primary">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-primary">Working Hours</h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Monday – Saturday: 10:00 AM – 7:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-md hover:shadow-lg"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Map Iframe */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-3xl p-3 shadow-xl shadow-slate-200/50"
            >
              <div className="relative aspect-video lg:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.061933777143!2d74.78838127560404!3d34.06792657315108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e18f56116e1c17%3A0x1dcadcb73cab759b!2sThe%20Power%20Planet%20(Solar%2C%20Batteries%2C%20Inverter)%20Super%20Stockiest%20and%20Genus%20Service%20Center!5e0!3m2!1sen!2sin!4v1782487760413!5m2!1sen!2sin"
                  className="absolute top-0 left-0 w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="The Power Planet Google Maps Location"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
