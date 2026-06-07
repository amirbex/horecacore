import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Abstract Background Elements representing "Core" */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-40">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] border border-gold/10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] border border-gold/20 rounded-full border-dashed"
        />
        <motion.div 
           animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
           className="absolute w-64 h-64 bg-gold/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-block py-1 px-3 mb-6 rounded-full border border-gold/30 text-gold text-sm tracking-widest font-medium uppercase bg-gold/5 backdrop-blur-md">
            Strategic Hospitality Intelligence
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tight"
        >
          مرکز هوشمند <br className="hidden md:block" />
          <span className="text-gradient">طراحی و توسعه</span> <br />
          کسب‌وکار
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-bone-muted max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          HoReCa Core یک ساختار استراتژیک و اجرایی برای مشاوره، راه‌اندازی و مدیریت 
          پروژه‌های سطح بالا در صنایع مهمان‌نوازی، خوراک، نوشیدنی و گردشگری است.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a href="#portfolio" className="relative group overflow-hidden px-8 py-4 rounded-full bg-bone text-charcoal-dark font-medium transition-transform active:scale-95">
            <span className="relative z-10">مشاهده تجربه‌ها</span>
            <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
          </a>
          <a href="#services" className="px-8 py-4 rounded-full border border-bone/20 text-bone hover:border-gold hover:text-gold font-medium transition-all duration-300">
            خدمات استراتژیک
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-bone-muted tracking-widest uppercase font-light">Scroll Explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-gold opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
