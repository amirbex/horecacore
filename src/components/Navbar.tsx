import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'خدمات', href: '#services' },
    { name: 'فازهای همکاری', href: '#phases' },
    { name: 'تجربه‌ها', href: '#portfolio' },
    { name: 'درخواست مشاوره', href: '#contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center ${
          scrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div 
          className={`w-[90%] max-w-7xl mx-auto flex items-center justify-between px-6 py-4 rounded-full transition-all duration-500 ${
            scrolled ? 'glass-panel shadow-2xl shadow-black/50' : 'bg-transparent'
          }`}
        >
          {/* Logo Context */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center relative overflow-hidden">
              <div className="absolute w-2 h-2 bg-gold rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>
            <span className="font-semibold text-lg tracking-widest text-bone mr-2 uppercase">
              HoReCa Core
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-sm font-medium text-bone-muted hover:text-gold transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 right-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Desktop */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-charcoal bg-gold hover:bg-gold-light px-5 py-2.5 rounded-full transition-all duration-300"
          >
            شروع همکاری
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-bone focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-charcoal-dark/95 backdrop-blur-xl flex flex-col items-center justify-center pt-20 px-6"
          >
            <div className="flex flex-col items-center gap-8 text-center">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-light text-bone hover:text-gold transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-8 flex items-center gap-2 text-lg font-medium text-charcoal bg-gold hover:bg-gold-light px-8 py-4 rounded-full transition-all duration-300"
              >
                شروع همکاری
                <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
