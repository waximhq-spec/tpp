import { motion } from 'motion/react';
import { Quote, UserCheck } from 'lucide-react';

export default function TimelineAndTestimonials() {
  const testimonials = [
    {
      quote: "During Chillai Kalan winter snowstorms, our sloped solar system shed snow automatically within hours of sunrise. We saved ₹38,000 in bills in 10 months.",
      author: "Bashir Ahmed Lone",
      role: "Orchard Owner, Srinagar",
      tags: ["Tin Roof", "5.5 kWp"]
    },
    {
      quote: "Reliable power is crucial for guest heating. The hybrid battery setup kept our radiator heaters running perfectly during intense winter grid blackouts.",
      author: "Tariq Malik",
      role: "Resort Manager, Pahalgam",
      tags: ["Wooden", "8.0 kWp Hybrid"]
    },
    {
      quote: "Our Karan Nagar complex cold storage is completely powered by the 12 kW array. Payback period is on track to hit just 3.7 years.",
      author: "Dr. Farooq Shah",
      role: "Commercial Director, Karan Nagar",
      tags: ["Concrete", "12.0 kWp"]
    }
  ];

  const timelineSteps = [
    {
      phase: "01",
      title: "Rooftop Mapping",
      days: "Days 1–2",
      description: "We inspect your roof and map it to find where your solar panels will get the absolute most sunlight."
    },
    {
      phase: "02",
      title: "Paperwork & Subsidy",
      days: "Days 3–10",
      description: "We submit all documents to the government portal and handle your subsidy and utility approvals."
    },
    {
      phase: "03",
      title: "Panel Installation",
      days: "Days 11–14",
      description: "Our certified team installs durable, snow-resistant solar panels securely on your roof."
    },
    {
      phase: "04",
      title: "Smart Meter Setup",
      days: "Days 15–20",
      description: "We connect a smart bidirectional meter so you can sell extra power back to the grid for maximum savings."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/50 border-t border-slate-100 relative overflow-hidden">
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

        {/* Timeline */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2">The Roadmap</p>
            <h2 className="text-2xl md:text-4xl text-primary font-extrabold tracking-tight leading-tight">
              20 Days to Energy Autonomy
            </h2>
            <p className="text-slate-500 text-sm mt-3">
              We handle engineering, permits, and government subsidy applications end-to-end.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {timelineSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white border border-slate-100 p-5 rounded-2xl relative overflow-hidden group hover:shadow-[0_6px_24px_rgba(1,50,32,0.03)] transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-md tracking-wider">
                    Phase {step.phase}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {step.days}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-primary mb-1.5">
                  {step.title}
                </h3>
                
                <p className="text-slate-500 text-xs leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
