import { motion } from 'motion/react';
import { ShieldCheck, Award, Zap, Users, Home, BarChart3, TrendingDown } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      value: '547+',
      label: 'Rooftops Installed',
      description: 'Active residential and commercial solar installations spanning Jammu & Kashmir.',
      icon: Home,
      color: 'text-primary',
      bg: 'bg-primary/5'
    },
    {
      value: '1,250+',
      label: 'Happy Families',
      description: 'Providing energy independence, reliable heat backup, and zero bill worries.',
      icon: Users,
      color: 'text-secondary',
      bg: 'bg-secondary/10'
    },
    {
      value: '15.4 MW',
      label: 'Capacity Deployed',
      description: 'High-performance monocrystalline panels harvesting alpine sunshine.',
      icon: Zap,
      color: 'text-accent',
      bg: 'bg-accent/5'
    },
    {
      value: '₹2.4 Cr+',
      label: 'Electricity Bills Saved',
      description: 'Cumulative financial savings directly put back into the J&K local economy.',
      icon: TrendingDown,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      value: '100%',
      label: 'Direct Subsidies Approved',
      description: 'MNRE and PM Surya Ghar approved installations with direct credit in J&K.',
      icon: Award,
      color: 'text-primary',
      bg: 'bg-primary/5'
    }
  ];

  return (
    <section id="stats" className="py-20 bg-white border-y border-slate-100 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute right-0 bottom-0 -z-10 w-[400px] h-[400px] rounded-full bg-radial from-[#fef0db]/10 to-transparent blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full border border-primary/10 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            <span className="text-[10px] md:text-xs font-bold text-primary uppercase tracking-widest">Our Valley-Wide Impact</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-primary font-black tracking-tight leading-tight">
            Kashmir&apos;s Trusted Solar Partner
          </h2>
          <p className="text-slate-500 text-sm mt-3 leading-relaxed">
            From Srinagar to Anantnag, we build mountain-grade solar infrastructure that delivers real financial savings and grid independence.
          </p>
        </div>

        {/* Highlight Main Stats Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white border border-slate-100/80 hover:border-slate-200 shadow-[0_2px_15px_rgba(0,0,0,0.015)] hover:shadow-[0_8px_30px_rgba(1,50,32,0.04)] rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1 text-center sm:text-left flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors duration-300 mx-auto sm:mx-0 mb-4`}>
                    <Icon className="w-5 h-5 text-current" />
                  </div>

                  <p className={`text-3xl font-black ${stat.color} tracking-tight leading-none`}>
                    {stat.value}
                  </p>
                  <p className="text-xs font-extrabold text-primary tracking-wide mt-2">
                    {stat.label}
                  </p>
                </div>
                
                <p className="text-[11px] text-slate-400 leading-relaxed mt-4 pt-4 border-t border-slate-50">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Small Trust Banner below stats */}
        <div className="mt-14 p-5 bg-slate-50 border border-slate-100 rounded-2xl text-center flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-slate-500 max-w-4xl mx-auto">
          <ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
          <p className="leading-relaxed">
            <strong>KPDCL Net-Metering Sync:</strong> Every single installation is fully registered with J&K DISCOM and includes bidirectional meters to export power back for maximum bill relief.
          </p>
        </div>

      </div>
    </section>
  );
}
