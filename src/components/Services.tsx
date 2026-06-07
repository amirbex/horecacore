import { motion } from 'motion/react';
import { Network, LineChart, Layers, Users, ShieldCheck, Gem } from 'lucide-react';

const services = [
  {
    title: 'طراحی مدل کسب‌وکار',
    description: 'تحلیل بازار، تدوین استراتژی، و پی‌ریزی یک ساختار اقتصادی سودآور و پایدار برای ورود قدرتمند به بازار.',
    icon: LineChart,
  },
  {
    title: 'توسعه برند و هویت',
    description: 'خلق یک برند لوکس و متمایز، از پوزیشنینگ و طراحی هویت بصری تا تدوین استراتژی‌های ارتباطی.',
    icon: Gem,
  },
  {
    title: 'ساختار عملیاتی و SOP',
    description: 'تدوین نظام‌های استاندارد عملیاتی برای اطمینان از کیفیت بی‌نقص، سرعت در سرویس‌دهی و کاهش هزینه‌های پنهان.',
    icon: Layers,
  },
  {
    title: 'طراحی و توسعه منو',
    description: 'معماری پیچیده و حرفه‌ای منوی نوشیدنی و خوراک با تمرکز بر هارمونی، سودآوری و تجربه کاربری.',
    icon: Network,
  },
  {
    title: 'توسعه منابع انسانی',
    description: 'طراحی ساختار سازمانی، جذب، آنبوردینگ و آموزش تخصصی پرسنل برای ارائه خدماتی هم‌تراز با استانداردهای جهانی.',
    icon: Users,
  },
  {
    title: 'مدیریت و کنترل کیفی',
    description: 'نظارت میدانی دقیق، کالیبراسیون تجهیزات و ارزیابی مستمر برای حفظ کیفیت در بالاترین سطح ممکن.',
    icon: ShieldCheck,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 relative bg-charcoal-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight"
            >
              خدمات ساختارمند و <span className="text-gold">استراتژیک</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-bone-muted leading-relaxed"
            >
              ما پروژه‌ها را به صورت ماژولار و مدیریت‌شده پیش می‌بریم. هر خدمت، قطعه‌ای از یک هسته مهندسی‌شده است که برای خلق تمایز در مهمان‌نوازی و گردشگری طراحی می‌شود.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="group relative p-10 rounded-3xl bg-charcoal border border-white/5 hover:border-gold/30 transition-colors duration-500 overflow-hidden flex flex-col h-full"
            >
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="mb-8 p-4 bg-charcoal-dark rounded-2xl inline-block w-fit group-hover:scale-110 transition-transform duration-500 ease-out border border-white/5">
                <service.icon className="w-8 h-8 text-gold" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-semibold mb-4 text-bone group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-bone-muted leading-relaxed font-light grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
