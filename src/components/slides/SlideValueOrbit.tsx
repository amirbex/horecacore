import { motion } from 'motion/react';

export default function SlideValueOrbit() {
  return (
    <section className="snap-slide bg-ivory flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-4xl aspect-square flex items-center justify-center">
        
        {/* Core */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute z-50 w-24 h-24 rounded-full bg-soft-gold flex items-center justify-center shadow-2xl"
        >
          <span className="text-ivory font-medium text-sm">سرمایه‌گذار</span>
        </motion.div>

        {/* Orbit 1 */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="absolute z-40 w-[20rem] h-[20rem] rounded-full border border-gray-dark/20 flex justify-center"
        >
           <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-full h-full absolute"
           >
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ivory px-4 text-xs font-medium text-soft-black rotate-0">
               کاهش ریسک شکست
             </div>
           </motion.div>
        </motion.div>

        {/* Orbit 2 */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          className="absolute z-30 w-[30rem] h-[30rem] rounded-full border border-gray-light flex justify-center"
        >
           <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="w-full h-full absolute"
           >
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-ivory px-4 text-xs font-medium text-soft-black">
               افزایش ارزش دارایی برند
             </div>
           </motion.div>
        </motion.div>

        {/* Orbit 3 */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className="absolute z-20 w-[40rem] h-[40rem] rounded-full border border-gray-dark/10 flex justify-center"
        >
           <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="w-full h-full absolute flex items-center"
           >
             <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ivory px-2 py-4 text-xs font-medium text-soft-black rotate-90">
               ایجاد سیستم خودکنترل
             </div>
           </motion.div>
        </motion.div>

        {/* Orbit 4 */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          className="absolute z-10 w-[50rem] h-[50rem] rounded-full border border-gray-light border-dashed flex justify-center"
        >
           <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="w-full h-full absolute flex items-center justify-end"
           >
             <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-ivory px-2 py-4 text-xs font-medium text-soft-gold -rotate-90">
               سودآوری پایدار
             </div>
           </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-16 w-full text-center"
      >
        <p className="text-lg md:text-xl font-light text-soft-black italic">
          «ما یک خروجی نمی‌سازیم، <span className="text-soft-gold font-medium not-italic px-1">یک سیستم بهره‌برداری مستقل</span> خلق می‌کنیم.»
        </p>
      </motion.div>

    </section>
  );
}
