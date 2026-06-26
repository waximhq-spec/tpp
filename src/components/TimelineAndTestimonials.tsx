import { motion } from 'motion/react';
import { Quote, UserCheck } from 'lucide-react';

export default function TimelineAndTestimonials() {
  const testimonials = [
    {
      quote: "We don't have electricity issues anymore. Even during winter, the solar panels work great and we are saving a lot on our bills.",
      author: "Bashir A.",
      role: "Homeowner",
      tags: ["Tin Roof", "Solar Backup"]
    },
    {
      quote: "The battery backup is excellent. We can run our heaters and other appliances easily during long power cuts without any trouble.",
      author: "Tariq M.",
      role: "Homeowner",
      tags: ["Wooden Roof", "Battery Backup"]
    },
    {
      quote: "Highly satisfied with the setup. We run almost all our home appliances on solar now and haven't faced any problems.",
      author: "Dr. Farooq S.",
      role: "Homeowner",
      tags: ["Concrete Roof", "Solar System"]
    }
  ];



  return (
    <section id="testimonials" className="py-16 md:py-24 bg-slate-50/50 border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2">Customer Stories</p>
            <h2 className="text-2xl md:text-4xl text-primary font-extrabold tracking-tight leading-tight">
              Trusted by Homeowners in J&amp;K
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              How Kashmiri residents are using solar power for reliable heating and zero grid bills.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white border border-slate-100 p-6 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col justify-between hover:shadow-[0_6px_24px_rgba(1,50,32,0.04)] transition-shadow duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-1">
                      {test.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Quote className="w-4 h-4 text-secondary/50" />
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-5">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2.5 border-t border-slate-50 pt-4">
                  <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xs">
                    {test.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary flex items-center gap-1">
                      <span>{test.author}</span>
                      <UserCheck className="w-3 h-3 text-accent" />
                    </p>
                    <p className="text-[10px] text-slate-400">{test.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
