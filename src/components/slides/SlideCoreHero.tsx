import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useRef } from 'react';
import ParticleBackground from '../ParticleBackground';
import { SiteContent } from '../../store/mockDb';

export default function SlideCoreHero({ animateIn = true, content }: { animateIn?: boolean, content?: SiteContent }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Create a scroll-based parallax tied specifically to this view
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  // Scroll animations for logo motion
  const yParallax = useTransform(smoothProgress, [0, 1], ["0%", "40%"]);
  const yParallaxFast = useTransform(smoothProgress, [0, 1], ["0%", "70%"]);
  const opacityFade = useTransform(smoothProgress, [0, 0.9], [1, 0]);
  
  // Transform rings into a wider, flatter perspective as we scroll 
  const rotateCoreResponsive = useTransform(smoothProgress, [0, 1], [0, 180]);
  const scaleRingsOut = useTransform(smoothProgress, [0, 1], [1, 1.8]);
  const stretchRings = useTransform(smoothProgress, [0, 1], [1, 0.4]); 

  // Logo text spreading out
  const titleScale = useTransform(smoothProgress, [0, 1], [1, 1.4]);
  const letterSpacing = useTransform(smoothProgress, [0, 1], ["0.1em", "1em"]);
  const letterSpacingHero = useTransform(smoothProgress, [0, 1], ["0em", "0.6em"]);
  const innerRingScale = useTransform(smoothProgress, [0, 1], [1, 4]);
  const innerRingOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  
  const textBlurOut = useTransform(smoothProgress, [0, 1], ["blur(0px)", "blur(10px)"]);

  return (
    <section id="slide-hero" ref={containerRef} className="snap-slide bg-charcoal-dark flex items-center justify-center overflow-hidden relative">
      <ParticleBackground />
      {/* Background Dynamic Rings - Scroll Reactive */}
      <motion.div 
        style={{ y: yParallax, opacity: opacityFade, scaleX: scaleRingsOut, scaleY: stretchRings }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div 
          animate={{ rotate: 360 }}
          style={{ rotate: rotateCoreResponsive }}
          transition={{ duration: 160, repeat: Infinity, ease: "linear" }}
          className="absolute shrink-0 w-[60vh] h-[60vh] md:w-[80vh] md:h-[80vh] rounded-full border border-soft-gold/30"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          style={{ rotate: rotateCoreResponsive }}
          transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
          className="absolute shrink-0 w-[80vh] h-[80vh] md:w-[100vh] md:h-[100vh] rounded-full border border-white/5 border-dashed"
        />
        <motion.div 
          animate={{ rotate: 180 }}
          transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
          className="absolute shrink-0 w-[100vh] h-[100vh] md:w-[130vh] md:h-[130vh] rounded-full border border-white/5"
        />
      </motion.div>

      {/* Main Core Content - Logo Motion Scroll */}
      <motion.div 
        style={{ y: yParallaxFast, opacity: opacityFade, filter: textBlurOut }}
        className="relative z-10 flex flex-col items-center justify-center pointer-events-auto w-full"
      >
        {/* Entry / Setup Animation + Scroll Transform */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 1.05 }}
          animate={animateIn ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 1.05 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center mb-6 lg:mb-12 relative w-full"
        >
          <motion.span 
            style={{ letterSpacing }}
            className="font-en text-soft-gold uppercase text-sm md:text-base -mb-2 z-10 px-4 text-center whitespace-nowrap bg-charcoal-dark/50 backdrop-blur-sm rounded-full py-1"
          >
            THE ORBIT SYSTEM
          </motion.span>
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={animateIn ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-[40px] w-[2px] bg-gradient-to-b from-soft-gold to-transparent mt-2 origin-top"
          ></motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, filter: "blur(15px)", scale: 1.1 }}
          animate={animateIn ? { opacity: 1, filter: "blur(0px)", scale: 1 } : { opacity: 0, filter: "blur(15px)", scale: 1.1 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale: titleScale }}
          className="relative font-en font-thin text-ivory flex flex-col items-center justify-center glow-text"
        >
          {/* Outer HoReCa */}
          <motion.div 
            style={{ y: -60, opacity: innerRingOpacity, letterSpacing }} 
            className="absolute top-[-30px] md:top-0 text-lg md:text-xl tracking-[0.8em] md:tracking-[1em] text-white/40 uppercase font-light pointer-events-none"
          >
            HoReCa
          </motion.div>

          {/* Main Core Typography that spreads out on scroll */}
          <motion.h1 
            style={{ letterSpacing: letterSpacingHero }}
            className="text-6xl sm:text-7xl md:text-[8rem] lg:text-[11rem] tracking-widest relative z-10 text-center uppercase drop-shadow-[0_0_15px_rgba(194,167,125,0.3)]"
          >
            CORE
          </motion.h1>

          {/* Inner Ring cutting across CORE text for depth */}
          <motion.div 
            style={{ rotate: rotateCoreResponsive, scale: innerRingScale, opacity: innerRingOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] md:w-[110%] md:h-[110%] rounded-full border border-soft-gold/30 pointer-events-none z-0"
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={animateIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
           transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="mt-16 sm:mt-12 text-center"
        >
          <p className="text-white/70 font-light md:text-lg max-w-md mx-auto leading-loose px-4">
            {content?.heroTitle || 'مرکز هوشمند طراحی، ساختارسازی و توسعه پروژه‌های لوکس و بین‌المللی در صنعت مهمان‌نوازی'}
          </p>
          {content?.heroDescription && (
            <p className="text-white/50 text-sm md:text-base max-w-lg mx-auto leading-loose px-4 mt-4 font-light">
              {content.heroDescription}
            </p>
          )}
        </motion.div>
      </motion.div>

      {/* Hero CTA Corner */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={animateIn ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        style={{ opacity: opacityFade }}
        className="absolute bottom-12 right-12 md:right-auto md:left-12 z-20"
      >
        <button className="flex flex-row-reverse md:flex-row items-center gap-4 text-ivory group">
          <span className="font-light text-sm md:text-base tracking-wide group-hover:text-soft-gold transition-colors">
            مشاهده سیستم همکاری
          </span>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-soft-gold group-hover:bg-soft-gold/10 transition-all duration-500 overflow-hidden relative">
            <div className="w-1.5 h-1.5 rounded-full bg-soft-gold z-10" />
            
            {/* Spinning hover effect inside circle */}
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="w-full h-full absolute inset-0 border border-soft-gold border-dashed opacity-0 group-hover:opacity-100 rounded-full"
            />
          </div>
        </button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={animateIn ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        style={{ opacity: opacityFade }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-soft-gold/50 to-transparent relative overflow-hidden">
           <motion.div 
             animate={{ y: [0, 64] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
             className="w-[2px] h-4 bg-soft-gold absolute left-1/2 -translate-x-1/2 top-0 blur-[1px]"
           />
        </div>
      </motion.div>
    </section>
  );
}
