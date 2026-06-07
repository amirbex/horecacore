import { motion } from 'motion/react';

export default function Portfolio() {
  // Generate 12 placeholder items for demonstration of the logo gallery
  const logos = Array.from({ length: 12 }).map((_, i) => i + 1);

  return (
    <section id="portfolio" className="py-32 relative bg-charcoal-dark border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-gold text-sm font-medium tracking-widest uppercase block mb-4"
        >
          Partner Network
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          مجموعه‌های <span className="text-gradient">همکار</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-bone-muted max-w-2xl mx-auto font-light leading-relaxed"
        >
          افتخار همکاری در طراحی، راه‌اندازی و هدایت بیش از ده‌ها مجموعه معتبر در صنعت مهمان‌نوازی و گردشگری.
          برای مشاهده ریز خدمات هر پروژه، با ما در تماس باشید.
        </motion.p>
      </div>

      {/* Infinite Logo Marquee Concept */}
      <div className="w-full relative py-10 flex overflow-hidden group">
        {/* Fading Edges */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-charcoal-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-charcoal-dark to-transparent z-10 pointer-events-none" />

        <motion.div 
          animate={{ x: [0, -1920] }} // Adjust based on content width
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-10 px-5 flex-nowrap"
        >
          {/* Double the array for seamless infinite scroll effect */}
          {[...logos, ...logos, ...logos].map((num, idx) => (
            <div 
              key={idx}
              className="w-48 h-32 rounded-2xl border border-white/5 bg-charcoal flex-shrink-0 flex items-center justify-center group-hover:border-white/10 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Placeholder text logic instead of image for now */}
              <span className="text-xl font-bold tracking-widest text-bone-muted/20 uppercase">
                Brand {num > 12 ? num % 12 + 1 : num}
              </span>
              {/* Hover overlay hint */}
              <div className="absolute inset-0 bg-gold/90 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300 cursor-pointer">
                <span className="text-charcoal-dark font-medium text-sm">مشاهده پروژه</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
