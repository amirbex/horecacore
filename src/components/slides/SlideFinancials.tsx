import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function SlideFinancials() {
  const models = [
    {
      num: 'I',
      phase: "فاز ۱: مشاوره و طراحی",
      range: "۶۰۰ الی ۹۰۰ میلیون تومان",
      suffix: "بسته به ابعاد و پیچیدگی پروژه",
      duration: "سه الی شش ماه",
      desc: "طراحی مدل، اسناد پایه، تحقیقات بازار، هویت بصری و زیرساخت"
    },
    {
      num: 'II',
      phase: "فاز ۲: راه‌اندازی و توسعه",
      range: "۵۰۰ الی ۸۰۰ میلیون تومان",
      suffix: "شامل آموزش و راه‌اندازی فیزیکی / عملیاتی",
      duration: "یک الی سه ماه",
      desc: "طراحی کانسپت، مهندسی منو، آموزش پرسنل و کالیبراسیون تجهیزات"
    },
    {
      num: 'III',
      phase: "فاز ۳: مدیریت میدانی و کنترل کیفی",
      range: "از ۱۰۰ میلیون تومان / ماهانه",
      suffix: "مبتنی بر عملکرد و پایش مستمر",
      duration: "مستمر",
      desc: "ارزیابی ۳۶۰ درجه عملیاتی، کنترل کیفیت و بهبود شاخص‌های کلیدی"
    }
  ];

  return (
    <section id="slide-financials" className="snap-slide bg-charcoal-dark flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 xl:px-16 relative overflow-hidden min-h-screen">
      
      {/* Background aesthetic lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-full h-[1px] bg-gradient-to-l from-transparent via-soft-gold to-transparent transform rotate-45"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-soft-gold to-transparent transform -rotate-12 translate-y-24"></div>
      </div>

      <div className="text-center mb-16 lg:mb-24 flex gap-4 w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto justify-between items-end border-b border-soft-gold/20 pb-8 z-10 hidden md:flex">
         <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-light text-ivory leading-tight text-right w-1/2"
         >
           ساختار مالی و <br /><span className="font-medium text-soft-gold">مراحل سرمایه‌گذاری</span>
         </motion.h2>
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="text-left w-1/2"
         >
            <p className="font-en text-xs tracking-[0.3em] uppercase text-white/50 mb-4 block">Financial Blueprint</p>
            <p className="text-sm font-light text-white/70 max-w-sm ml-auto">
             ارزش خلق‌شده در هر فاز مستقلاً قابل ارزیابی است. پرداخت‌ها بر اساس پیشرفت واقعی و تحویل‌گیری مستندات انجام می‌پذیرد.
            </p>
         </motion.div>
      </div>

      {/* Mobile Header */}
      <div className="text-center mb-16 z-10 md:hidden w-full">
         <p className="font-en text-xs tracking-[0.3em] uppercase text-soft-gold mb-4 block">Financial Blueprint</p>
         <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl font-light text-ivory leading-tight"
         >
           ساختار مالی و <br /><span className="font-medium text-soft-gold">سرمایه‌گذاری</span>
         </motion.h2>
      </div>

      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {models.map((item, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + (idx * 0.1) }}
            className="flex flex-col text-right group bg-charcoal border border-soft-gold/20 hover:border-soft-gold rounded-2xl shadow-lg transition-all duration-500 p-8 lg:p-10 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-32 h-32 bg-soft-gold/10 -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-soft-gold/20 transition-all duration-700 rounded-full pointer-events-none"></div>
             
             <div className="flex justify-between items-center mb-8 border-b border-soft-gold/10 pb-6">
                <span className="font-en text-4xl text-soft-gold/30 font-light group-hover:text-soft-gold transition-colors duration-500">{item.num}</span>
                <span className="font-en text-[10px] tracking-[0.2em] px-3 py-1.5 rounded-full bg-soft-gold/10 text-soft-gold font-medium">MONTHS: {item.duration}</span>
             </div>
             
             <h3 className="text-xl font-medium text-ivory mb-4 tracking-wide group-hover:text-soft-gold transition-colors duration-300">
              {item.phase}
             </h3>
             <p className="text-white/60 font-light text-sm mb-12 min-h-[3rem] leading-relaxed">
               {item.desc}
             </p>
            
             <div className="mt-auto pt-6 border-t border-soft-gold/10 flex flex-col gap-2">
                <span className="text-xl lg:text-2xl font-light text-ivory tracking-tight group-hover:text-white transition-colors duration-300">
                  {item.range}
                </span>
                <span className="text-soft-gold/70 text-xs font-light">{item.suffix}</span>
             </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
