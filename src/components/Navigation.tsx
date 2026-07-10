import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-6 md:left-10 z-[100]"
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 flex flex-col items-center justify-center gap-1.5 rounded-full backdrop-blur-md border transition-all shadow-sm ${scrolled ? 'bg-white/90 border-gray-200 hover:bg-white' : 'bg-white/50 border-gray-300 hover:bg-white/80'}`}
        >
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className="w-5 h-[2px] rounded-full transition-colors bg-[#1A1F24]"
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className="w-5 h-[2px] rounded-full transition-colors bg-[#1A1F24]"
          />
        </button>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#1A1F24]/95 backdrop-blur-md flex flex-col items-center justify-center font-sans"
          >
            <nav className="flex flex-col items-center gap-8 text-white/90 text-2xl font-light">
              <a href="#slide-hero" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">خانه</a>
              <a href="#slide-industry" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">درباره ما</a>
              <a href="#slide-phases" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">فازهای اجرایی</a>
              <a href="#slide-team" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">تیم ما</a>
              <a href="#slide-contact" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">تماس با ما</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
