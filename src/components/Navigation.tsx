import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkBg, setIsDarkBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.snap-slide');
      let currentDark = false;
      
      sections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          if (sec.classList.contains('bg-bg-dark')) {
            currentDark = true;
          }
        }
      });
      setIsDarkBg(currentDark);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 right-6 md:right-10 z-[100]"
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 flex flex-col items-center justify-center gap-1.5 transition-all hover:opacity-80"
        >
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            className={`w-5 h-[2px] rounded-full transition-colors ${isOpen || isDarkBg ? 'bg-brand-orange' : 'bg-[#1A1F24]'}`}
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            className={`w-5 h-[2px] rounded-full transition-colors ${isOpen || isDarkBg ? 'bg-brand-orange' : 'bg-[#1A1F24]'}`}
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
              <a href="#slide-hero" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">مقدمه</a>
              <a href="#slide-industry" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">صنعت</a>
              <a href="#slide-phases" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">فاز ها</a>
              <a href="#slide-team" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">تیم</a>
              <a href="#slide-financials" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">تعرفه</a>
              <a href="#slide-contact" onClick={() => setIsOpen(false)} className="hover:text-brand-orange transition-colors">ارتباط با ما</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
