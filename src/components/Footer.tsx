import { ShieldAlert, Heart, Leaf, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-10 px-4 md:px-10 border-t border-primary-container relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-white/50">
          
          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-accent tracking-widest">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/#stats" className="hover:text-white transition-colors">Residential Solar</a></li>
              <li><a href="/#stats" className="hover:text-white transition-colors">Commercial Arrays</a></li>
              <li><a href="/#stats" className="hover:text-white transition-colors">Battery Backup</a></li>
              <li><a href="/#stats" className="hover:text-white transition-colors">Snow-Shedding Mounts</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-accent tracking-widest">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="/#testimonials" className="hover:text-white transition-colors">Client Testimonials</a></li>
              <li><a href="/#testimonials" className="hover:text-white transition-colors">Client Video Reels</a></li>
              <li><a href="https://solarrooftop.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MNRE Portal ↗</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-secondary tracking-widest">Service Areas</h4>
            <div className="flex flex-wrap gap-1 max-w-xs">
              {['Srinagar', 'Ganderbal', 'Anantnag', 'Baramulla', 'Budgam', 'Pulwama', 'Kupwara'].map((loc) => (
                <span key={loc} className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/40">
                  {loc}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-[10px] uppercase font-bold text-accent tracking-widest">Contact</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                <span>Firdousabad, Batamaloo, Srinagar, J&amp;K 190009</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-secondary shrink-0" />
                <a href="tel:+919541831565" className="hover:text-white transition-colors">+91 95418 31565</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-secondary shrink-0" />
                <a href="mailto:tppkashmir@gmail.com" className="hover:text-white transition-colors">tppkashmir@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/30">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-secondary/60 shrink-0" />
            <span>Regulated under J&amp;K JERC &amp; KPDCL solar net-metering norms. Reg: JK-2024-SOLAR-MNRE.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Crafted for Kashmir with</span>
            <Heart className="w-3 h-3 text-secondary fill-secondary" />
            <span>&amp;</span>
            <Leaf className="w-3 h-3 text-accent fill-accent" />
            <span>© {new Date().getFullYear()} The Power Planet.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
