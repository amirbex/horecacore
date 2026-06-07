import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Sequence Logic for "Orbital Split"
    const intervals = [
      setTimeout(() => setStage(1), 300),   // Show gold dot (scale up gently)
      setTimeout(() => setStage(2), 1500),  // Expand circle & split
      setTimeout(() => setStage(3), 2500),  // Crossline appearance
      setTimeout(() => setStage(4), 3200),  // Text reveals fading in
      setTimeout(() => onComplete(), 5500)  // Dismiss
    ];

    return () => intervals.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      key="loading-screen"
      exit={{ opacity: 0, filter: "blur(15px)", scale: 1.15 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center flex-col overflow-hidden"
    >
      <div className="relative w-96 h-96 flex items-center justify-center">
          
          {/* Stage 1: The Initial Dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: stage >= 1 && stage < 3 ? 1 : 0, 
              opacity: stage >= 1 && stage < 3 ? 1 : 0 
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-2.5 h-2.5 bg-soft-gold rounded-full absolute z-30 shadow-[0_0_20px_rgba(194,167,125,1)]"
          />

          {/* Stage 2 & 3: The Expanding Circle and Split */}
          {stage >= 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Top Arc */}
              <motion.div
                initial={{ rotate: -90, scale: 0, opacity: 0 }}
                animate={{ 
                  rotate: stage >= 3 ? -180 : -90, 
                  scale: stage >= 2 ? 1 : 0,
                  opacity: 1
                }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-40 h-40 rounded-full border-t-[1px] border-soft-gold/70 origin-center z-20 shadow-[0_-5px_20px_rgba(194,167,125,0.15)]"
              />
              
              {/* Bottom Arc */}
              <motion.div
                initial={{ rotate: 90, scale: 0, opacity: 0 }}
                animate={{ 
                  rotate: stage >= 3 ? 180 : 90, 
                  scale: stage >= 2 ? 1 : 0,
                  opacity: 1
                }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-40 h-40 rounded-full border-b-[1px] border-soft-gold/70 origin-center z-20 shadow-[0_5px_20px_rgba(194,167,125,0.15)]"
              />

              {/* The intersecting line connecting the core */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: stage >= 3 ? 1 : 0, opacity: stage >= 3 ? 1 : 0 }}
                transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-64 h-[1px] bg-gradient-to-r from-transparent via-soft-gold/80 to-transparent z-10"
              />
            </div>
          )}

          {/* Stage 4: HoReCa Core Typography Reveal */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.9, filter: "blur(12px)", y: 10 }}
             animate={{ 
               opacity: stage >= 4 ? 1 : 0,
               scale: stage >= 4 ? 1 : 0.9,
               filter: stage >= 4 ? "blur(0px)" : "blur(12px)",
               y: stage >= 4 ? 0 : 10
             }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="absolute flex flex-col items-center justify-center gap-16 text-ivory z-40 w-full h-[120%]"
          >
            {/* HoReCa on Top */}
            <span className="font-en text-xs md:text-sm tracking-[1.2em] md:tracking-[1.5em] font-light uppercase opacity-80 pt-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ml-[0.6em] md:ml-[0.75em]">
              HoReCa
            </span>
            
            {/* Core on Bottom */}
            <span className="font-en text-3xl md:text-5xl font-thin tracking-[0.4em] md:tracking-[0.5em] pb-8 mt-4 uppercase text-soft-gold drop-shadow-[0_0_15px_rgba(194,167,125,0.4)] ml-[0.2em] md:ml-[0.25em]">
              Core
            </span>
          </motion.div>
        </div>
      </motion.div>
  );
}
