import { motion } from 'motion/react';
import { Target, Zap, Activity } from 'lucide-react';

const phases = [
  {
    number: '01',
    title: 'مشاوره و طراحی کسب‌وکار',
    subtitle: 'دوره پیش از بهره‌برداری',
    duration: '۴ ماه',
    description: 'تمرکز بر تدوین بنیان‌های کسب‌وکار، ساختارسازی، طراحی مدل اقتصادی، تعریف هویت برند، آماده‌سازی زیرساخت‌ها و مشارکت در تصمیمات کلیدی اولیه پروژه.',
    icon: Target,
    outcomes: [
      'چارچوب و اسناد پایه کسب‌وکار',
      'مدل کسب‌وکار و ارزش پیشنهادی',
      'تحلیل‌های مالی و سناریوی اقتصادی',
      'ساختار عملیاتی و SOP‌های پایه‌',
      'طراحی هویت بصری مستحکم',
      'نقشه‌ها و مستندات فنی دقیق',
    ]
  },
  {
    number: '02',
    title: 'راه‌اندازی و توسعه منو',
    subtitle: 'دوره حین بهره‌برداری',
    duration: '۳ ماه',
    description: 'تمرکز بر طراحی حرفه‌ای منو، تدوین استانداردهای عملیاتی، تجهیز، جذب و آموزش نیروها، و نظارت بر اجرای اولیه برای تبدیل طراحی به یک خروجی استاندارد.',
    icon: Zap,
    outcomes: [
      'منوی اختصاصی کاملا مهندسی‌شده',
      'رسپی‌کارت‌های استاندارد و دقیق',
      'دفترچه SOP بخش اجرایی',
      'معرفی منابع معتبر تأمین',
      'آموزش عملیاتی تیم در محیط کار',
      'راه‌اندازی، کالیبراسیون و پایش اولیه',
    ]
  },
  {
    number: '03',
    title: 'کنترل کیفی و مدیریت',
    subtitle: 'پس از گشایش',
    duration: 'مستمر',
    description: 'تثبیت کیفیت، پایش عملکرد، اصلاح نواقص، ارتقای سطح اجرا و آماده‌سازی پروژه برای ورود به مرحله توسعه پایدار و مدیریت حرفه‌ای چرخه‌های بعدی.',
    icon: Activity,
    outcomes: [
      'تثبیت کیفیت و جلوگیری از افت',
      'پایش عملکرد تیم در محیط واقعی',
      'اصلاح و بهینه‌سازی روزمره عملیات',
      'حفظ استانداردهای طعم و سرویس',
      'آماده‌سازی برای توسعه مقیاس',
    ]
  }
];

export default function Phases() {
  return (
    <section id="phases" className="py-32 relative bg-charcoal overflow-hidden border-t border-white/5">
      {/* Decorative Core Line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-gold/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gold text-sm font-medium tracking-widest uppercase block mb-4"
          >
            Executive Timeline
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            مدل همکاری <span className="text-gradient">فازبندی‌شده</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-bone-muted leading-relaxed"
          >
            به‌منظور مدیریت مؤثر پروژه و ایجاد شفافیت، دامنه خدمات در سه فاز مجزا با هدف، زمان، و خروجی‌های قطعی تعریف شده است.
          </motion.p>
        </div>

        <div className="space-y-12 lg:space-y-32">
          {phases.map((phase, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              key={idx} 
              className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Content Side */}
              <div className="flex-1 w-full relative">
                <div className="absolute -top-16 -right-8 text-[120px] font-black text-white/[0.02] pointer-events-none select-none z-0">
                  {phase.number}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-charcoal-dark border border-gold/20 rounded-xl">
                      <phase.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-bone">{phase.title}</h3>
                      <p className="text-sm text-gold mt-1">فاز {idx + 1} | {phase.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-bone-muted text-lg leading-relaxed mb-8 font-light">
                    {phase.description}
                  </p>

                  <div className="bg-charcoal-dark border border-white/5 rounded-3xl p-8">
                    <h4 className="text-xl font-medium mb-6 text-bone border-b border-white/10 pb-4">خروجی‌های کلیدی</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                      {phase.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0 shadow-[0_0_8px_rgba(197,160,89,0.5)]"></div>
                          <span className="text-bone-muted text-sm leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Visual Side */}
              <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md aspect-square rounded-full border border-white/5 flex items-center justify-center p-8">
                  {/* Rotating Abstract Ring */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-gold/20 border-dashed"
                  />
                  
                  {/* Central Core Display */}
                  <div className="w-full h-full bg-charcoal-dark rounded-full flex flex-col items-center justify-center border border-white/10 relative overflow-hidden group">
                     {/* Hover glow */}
                     <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-bone to-bone/20 mb-2">
                       {phase.number}
                     </span>
                     <span className="text-gold tracking-widest text-sm font-medium uppercase relative z-10">
                       Timeframe: {phase.duration}
                     </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
