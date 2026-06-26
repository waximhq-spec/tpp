import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentTab: 'home' | 'contact' | 'installations';
  onTabChange?: (tab: 'home' | 'contact' | 'installations') => void;
  onOpenQuote: () => void;
}

export default function Header({ currentTab, onTabChange, onOpenQuote }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home' as const, label: 'Home', path: '/' },
    { id: 'contact' as const, label: 'Contact Us', path: '/contact' },
  ];

  const handleNavClick = (item: { id: 'home' | 'contact' | 'installations'; label: string; path: string }) => {
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      if (onTabChange) {
        onTabChange(item.id);
      }

      if (window.location.pathname === item.path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.location.href = item.path;
      }
    }
  };

  const handleSectionClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      const isContactPage = window.location.pathname === '/contact';
      if (isContactPage) {
        window.location.href = `/#${sectionId}`;
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/75 backdrop-blur-md border-b border-slate-100/80 shadow-[0_2px_20px_rgba(1,50,32,0.02)]' 
        : 'bg-white border-b border-slate-50'
    }`}>
      <div className="w-full px-4 md:px-10 py-2.5 md:py-3.5 flex justify-between items-center transition-all duration-300">
        <div 
          onClick={() => handleNavClick({ id: 'home', label: 'Home', path: '/' })} 
          className="flex items-center cursor-pointer group animate-fade-in"
          id="brand-logo"
        >
          {/* Logo container to crop top and bottom white space */}
          <div className="relative h-10 w-32 md:w-40 overflow-hidden flex items-center">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLSMT4fL-UMSbtxivZ2iBcxg4UBewBxwGMpCRUUD2Ox2TNjppa4RK4LfPz&s=10" 
              alt="The Power Planet"
              className="absolute left-0 max-h-[170%] min-h-[160%] w-auto object-contain object-left scale-[1.3] origin-left -translate-y-[1%] mix-blend-multiply"
            />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleNavClick({ id: 'home', label: 'Home', path: '/' })}
            className={`relative py-1 font-medium text-[13px] tracking-wide transition-colors duration-200 cursor-pointer ${
              currentTab === 'home' ? 'text-primary font-bold' : 'text-slate-500 hover:text-primary'
            }`}
          >
            Home
            {currentTab === 'home' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
          
          <a
            href="#testimonials"
            onClick={(e) => handleSectionClick(e, 'testimonials')}
            className="text-slate-500 hover:text-primary font-medium text-[13px] tracking-wide transition-colors duration-200 cursor-pointer"
          >
            Testimonials
          </a>

          <a
            href="#installations"
            onClick={(e) => handleSectionClick(e, 'installations')}
            className="text-slate-500 hover:text-primary font-medium text-[13px] tracking-wide transition-colors duration-200 cursor-pointer"
          >
            Installations
          </a>

          <button
            onClick={() => handleNavClick({ id: 'contact', label: 'Contact Us', path: '/contact' })}
            className={`relative py-1 font-medium text-[13px] tracking-wide transition-colors duration-200 cursor-pointer ${
              currentTab === 'contact' ? 'text-primary font-bold' : 'text-slate-500 hover:text-primary'
            }`}
          >
            Contact Us
            {currentTab === 'contact' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </nav>

        {/* Desktop CTA Button */}
        <button
          onClick={onOpenQuote}
          id="get-quote-nav-btn"
          className="hidden md:flex bg-primary hover:bg-primary/90 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 transform duration-200 text-center"
        >
          <span>Get a Quote</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>

        {/* Mobile action container */}
        <div className="flex md:hidden items-center gap-2">
          {/* WhatsApp Mobile Button */}
          <a
            href="https://wa.me/919541831565?text=Hi,%20I'm%20interested%20in%20solar%20rooftop%20installations%20for%20my%20property%20in%20Kashmir."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#25D366] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.463h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-primary hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
            id="mobile-menu-toggle"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-slate-100 bg-white overflow-hidden shadow-inner absolute top-full left-0 right-0 z-50 px-5 py-5"
          >
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavClick({ id: 'home', label: 'Home', path: '/' })}
                className={`text-left font-bold text-sm py-2 border-b border-slate-50 transition-colors ${
                  currentTab === 'home' ? 'text-primary pl-2' : 'text-slate-600'
                }`}
              >
                Home
              </button>

              <a
                href="#testimonials"
                onClick={(e) => handleSectionClick(e, 'testimonials')}
                className="text-left font-bold text-sm py-2 text-slate-600 border-b border-slate-50"
              >
                Testimonials
              </a>

              <a
                href="#installations"
                onClick={(e) => handleSectionClick(e, 'installations')}
                className="text-left font-bold text-sm py-2 text-slate-600 border-b border-slate-50"
              >
                Installations
              </a>

              <button
                onClick={() => handleNavClick({ id: 'contact', label: 'Contact Us', path: '/contact' })}
                className={`text-left font-bold text-sm py-2 border-b border-slate-50 transition-colors ${
                  currentTab === 'contact' ? 'text-primary pl-2' : 'text-slate-600'
                }`}
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
