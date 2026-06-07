import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { SiteContent } from '../../store/mockDb';

function Counter({ to, duration }: { to: number, duration: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, { threshold: 0.5 });
    
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(to.toString().replace(/,/g, ''));
    if (start === end) return;
    
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [inView, to, duration]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

export default function SlideIndustry({ content }: { content?: SiteContent }) {
  return (
    <section id="slide-industry" className="snap-slide flex relative overflow-hidden min-h-screen">
      {/* Full-bleed split backgrounds that match grid stacking on all viewports */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 pointer-events-none z-0 select-none">
        <div className="bg-charcoal-dark h-full w-full" />
        <div className="bg-soft-gold h-full w-full" />
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 relative z-10 min-h-screen">
        
        {/* Right/Left: Data & Stat */}
        <div className="flex flex-col justify-center py-16 md:py-24 text-ivory px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-40 relative h-full">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="relative z-10 w-full max-w-xl mx-auto"
           >
             <span className="font-en text-xs tracking-widest uppercase text-soft-gold block mb-6">Fast Growing Ecosystem</span>
             <h2 className="text-3xl md:text-5xl font-light leading-[1.6] mb-8">
               سالانه صدها کافه و رستوران جدید وارد بازار می‌شوند.
             </h2>
             <div className="flex flex-col gap-8 mt-12 border-t border-white/10 pt-12">
               <div>
                  <span className="font-en text-xs tracking-widest uppercase text-white/50 block mb-2">Market Volume (Est.)</span>
                  <div className="flex items-baseline gap-2">
                     <span className="text-5xl lg:text-7xl font-en font-thin tracking-tight text-soft-gold">
                       <Counter to={4500} duration={2500} />
                     </span>
                     <span className="text-sm font-light text-white/70">میلیارد تومان نقدینگی در گردش</span>
                  </div>
               </div>
               <div>
                  <span className="font-en text-xs tracking-widest uppercase text-white/50 block mb-2">New Venues / Year</span>
                  <div className="flex items-baseline gap-2">
                     <span className="text-5xl lg:text-7xl font-en font-thin tracking-tight text-soft-gold">
                       <Counter to={850} duration={2500} />+
                     </span>
                     <span className="text-sm font-light text-white/70">افتتاحیه سالیانه</span>
                  </div>
               </div>
             </div>
           </motion.div>
           {/* Abstract Chart Background confined to the column */}
           <div className="absolute bottom-0 left-0 w-full h-48 flex items-end justify-between px-8 sm:px-12 md:px-16 lg:px-24 opacity-20 pointer-events-none select-none">
              {[0.1, 0.3, 0.2, 0.5, 0.4, 0.7, 0.6, 0.9, 0.8, 1].map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${val * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
                  className="w-1 bg-soft-gold"
                />
              ))}
           </div>
         </div>

         {/* The Twist (Reality) */}
         <div className="flex flex-col justify-center py-16 md:py-24 text-soft-black px-8 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-40 h-full">
          <div className="w-full max-w-xl mx-auto">
            <motion.div
               initial={{ height: 0 }}
               whileInView={{ height: "40px" }}
               transition={{ duration: 0.8 }}
               className="w-[2px] bg-soft-black mb-8"
            />
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-4xl md:text-5xl font-semibold leading-[1.6] mb-8"
            >
              اما همه موفق نمی‌شوند...
            </motion.h2>
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="text-charcoal-dark font-light leading-loose text-base md:text-lg space-y-6"
            >
              {content?.industryDescription ? (
                <p className="whitespace-pre-wrap">{content.industryDescription}</p>
              ) : (
                <>
                  <p>آمارها نشان می‌دهد درصد بالایی از کسب‌وکارهای این حوزه در سال اول فعالیت خود با چالش‌های جدی مواجه می‌شوند. این چالش‌ها غالباً نه از کیفیت محصول، بلکه از ضعف در طراحی مدل کسب‌وکار، انتخاب نادرست تجهیزات و فقدان سیستم‌های کنترلی ناشی می‌شود.</p>
                  <p className="font-normal text-soft-black mt-4">اما با طراحی و اجرا صحیح می‌توان شانس موفقیت را افزایش داد و ریسک را کاهش داد.</p>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
