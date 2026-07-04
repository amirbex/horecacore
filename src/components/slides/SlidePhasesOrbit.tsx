import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Calendar, Compass, Layers, CheckCircle2 } from 'lucide-react';

export default function SlidePhasesOrbit() {
  const [activeIdx, setActiveIdx] = useState(0);

  const phases = [
    {
      num: 'I',
      title: 'طراحی  کسب‌وکار',
      subtitle: 'پیش از بهره‌برداری',
      duration: '۳ تا ۶ ماه',
      focus: 'تحقیق و تحلیل عمیق بازار، مدل‌سازی مالی و اقتصادی پایدار، طراحی هویت یکپارچه برند (کلامی و بصری)، و ترسیم نقشه‌های عملیاتی و گردش کار بهینه.',
      milestones: ['تحلیل جریان نقدی پویا و پیش‌بینی مالی', 'طراحی بوم مدل کسب‌وکار و بوم ارزش پیشنهادی', 'تدوین هویت بصری و کلامی برند', 'تدوین کتاب راهنمای تفصیلی عملیات (SOP)', 'طراحی چارت سازمانی و نظام منابع انسانی', 'تدوین اسناد تحقیق بازار و پوزیشنینگ', 'طراحی نقشه‌های فنی و زیرساختی', 'طراحی زیرساخت حقوقی، ایمنی و مدیریت ریسک', 'طراحی داشبورد مدیریت پروژه']
    },
    {
      num: 'II',
      title: 'اجرای عملیاتی',
      subtitle: 'حین بهره‌برداری',
      duration: '۱ تا ۳ ماه',
      focus: 'طراحی منوی اختصاصی و مهندسی سودآوری، تحقیق و توسعه طعم و خلق نوشیدنی‌های امضایی، مشاوره خرید و تأمین تجهیزات تخصصی، مشارکت در جذب و ارزیابی نیروی انسانی، برگزاری دوره‌های آموزش عملی فنی و رفتاری، و حضور در محل پروژه برای نظارت بر اجرا، کالیبراسیون و کنترل کیفیت اولیه.',
      milestones: ['فرمولاسیون رسپی نوشیدنی امضایی با رسپی‌کارت‌های دقیق', 'برگزاری دوره آنبوردینگ تکنیکال و مهارت‌های نرم', 'پروتکل مکتوب کالیبراسیون و تنظیم ایستگاه کاری', 'تدوین پروتکل‌های عملیاتی (SOP) بار', 'گزارش کنترل کیفی پس از آموزش عملی', 'نظارت بر اجرا و راه‌اندازی تجهیزات']
    },
    {
      num: 'III',
      title: 'کنترل',
      subtitle: 'پس از گشایش',
      duration: 'مستمر',
      focus: 'انجام ممیزی عملیاتی ۳۶۰ درجه میدانی، پایش روزانه سرعت و کیفیت خروجی، رصد انحرافات بهداشتی و استانداردها، ارزیابی عملکرد تیم در محیط واقعی، تحلیل داده‌های عملکردی برای تصمیم‌گیری‌های استراتژیک، و بهینه‌سازی مداوم حاشیه سود منو بر پایه داده‌های فروش.',
      milestones: ['گزارش هفتگی ممیزی عملیاتی ۳۶۰ درجه', 'تحلیل رضایت و وفاداری مهمانان مبتنی بر داده', 'بازطراحی و مهندسی مجدد منوی فصلی بر پایه آمار فروش', 'طراحی برنامه توسعه و مقیاس‌پذیری (Scalability Blueprint)', 'گزارش پیشنهادهای تکمیلی برای فاز توسعه']
    },
  ];

  return (
    <section id="slide-phases" className="snap-slide bg-ivory flex flex-col items-center justify-center py-16 px-6 lg:px-12 relative overflow-hidden min-h-screen">
      
      <div className="text-center mb-16 relative z-10">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-en text-xs tracking-[0.3em] uppercase text-soft-gold mb-4"
        >
          Strategic Roadmap
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl font-light text-soft-black"
        >
          فازبندی استراتژیک همکاری
        </motion.h2>
        <p className="text-gray-dark text-sm font-light mt-3">بر روی هر فاز کلیک کنید تا جزئیات کانون تمرکز هر مرحله را مشاهده کنید .</p>
      </div>

      <div className="relative w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 z-10 mb-12">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-16 right-16 h-[1px] bg-gray-light -translate-y-1/2 z-0" />
        
        {phases.map((phase, idx) => {
          const isActive = activeIdx === idx;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + (idx * 0.1) }}
              className="relative z-10 bg-ivory cursor-pointer"
              onClick={() => setActiveIdx(idx)}
            >
              {/* Outer animated orbit on hover equivalent */}
              <div className={`absolute inset-[-12px] rounded-full border transition-all duration-500 pointer-events-none ${
                isActive ? 'border-soft-gold/60 scale-105 shadow-[0_0_15px_rgba(194,167,125,0.2)]' : 'border-transparent'
              }`} />
              
              <div className={`w-24 h-24 md:w-36 md:h-36 rounded-full border bg-ivory flex flex-col items-center justify-center transition-all duration-500 ease-out ${
                isActive 
                  ? 'border-soft-gold shadow-lg -translate-y-1.5' 
                  : 'border-gray-light hover:border-soft-gold/40 hover:shadow-md'
              }`}>
                <span className={`font-en text-lg md:text-2xl font-light mb-1 ${isActive ? 'text-soft-gold' : 'text-gray-dark'}`}>{phase.num}</span>
                <span className={`text-xs md:text-base font-semibold ${isActive ? 'text-soft-black' : 'text-gray-dark'}`}>{phase.title}</span>
              </div>
              
              <div className="absolute top-[110%] left-1/2 -translate-x-1/2 text-center w-max hidden md:block">
                <span className="text-[10px] text-gray-dark font-light">{phase.subtitle}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Phase Detail Deck */}
      <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto z-10 min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-light/60 rounded-3xl p-6 md:p-8 shadow-sm text-right grid grid-cols-1 md:grid-cols-12 gap-6 relative overflow-hidden"
          >
            {/* Soft decorative background sign */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-soft-gold/5 blur-2xl rounded-full" />
            
            <div className="md:col-span-8 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-5 h-5 text-soft-gold shrink-0" />
                <span className="font-en text-xs tracking-wider text-soft-gold font-bold">FOCUS AREAS & EXECUTION</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-soft-black mb-3">
                فاز {phases[activeIdx].num}: {phases[activeIdx].title} ({phases[activeIdx].subtitle})
              </h3>
              <p className="text-xs md:text-sm text-gray-dark font-light leading-relaxed mb-4">
                {phases[activeIdx].focus}
              </p>
            </div>

            <div className="md:col-span-4 border-r-0 md:border-r border-gray-light/60 pr-0 md:pr-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-soft-black">
                <Calendar className="w-4.5 h-4.5 text-soft-gold shrink-0" />
                <span>مدت زمان فاز: <span className="font-en text-sm font-bold text-soft-gold">{phases[activeIdx].duration}</span></span>
              </div>
              
              <span className="text-[10px] font-bold text-gray-dark mb-2.5 block">مهم‌ترین تحویل‌شدنی‌ها:</span>
              <ul className="space-y-2">
                {phases[activeIdx].milestones.map((ms, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[11px] text-gray-dark font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-soft-gold shrink-0" />
                    <span>{ms}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Abstract background orbital line */}
      <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
         className="absolute w-[150vw] h-[150vw] rounded-full border border-gray-light/20 z-0 pointer-events-none border-dashed"
      />
    </section>
  );
}
