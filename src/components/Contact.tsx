import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative bg-charcoal border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text/Info Side */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              طراحی، خلق و هدایت. <br />
              <span className="text-gradient">آماده‌ برای جهش بعدی؟</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-bone-muted mb-10 leading-relaxed font-light"
            >
              برای بررسی پتانسیل‌های پروژه خود، برنامه‌ریزی یک فاز جدید، و یا طراحی کاملاً اختصاصی یک کسب‌وکار لوکس با توسعه‌دهندگان استراتژیک HoReCa Core در ارتباط باشید.
            </motion.p>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="space-y-6"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium tracking-widest text-gold uppercase mb-1">Corporate Office</span>
                <span className="text-xl text-bone font-light">تهران، ایران</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium tracking-widest text-gold uppercase mb-1">Direct Line</span>
                <span className="text-xl text-bone font-light" dir="ltr">+98 (0) 912 000 0000</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium tracking-widest text-gold uppercase mb-1">Email</span>
                <span className="text-xl text-bone font-light font-sans tracking-wide">strategy@horecacore.com</span>
              </div>
            </motion.div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-charcoal-dark p-8 md:p-12 rounded-[2.5rem] border border-white/5 relative overflow-hidden group"
          >
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full group-hover:bg-gold/10 transition-colors duration-700 pointer-events-none" />

            <h3 className="text-2xl font-semibold text-bone mb-8">درخواست جلسه مشاوره</h3>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-bone-muted ml-2">نام و نام خانوادگی</label>
                  <input 
                    type="text" 
                    className="bg-charcoal border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-gold/50 text-bone transition-colors"
                    placeholder="امیر رضایی"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-bone-muted ml-2">شماره تماس</label>
                  <input 
                    type="tel" 
                    className="bg-charcoal border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-gold/50 text-bone transition-colors text-left"
                    placeholder="0912..."
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-bone-muted ml-2">نوع پروژه / درخواست</label>
                <select className="bg-charcoal border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-gold/50 text-bone transition-colors appearance-none">
                  <option>راه‌اندازی صفر تا صد (فاز ۱ تا ۳)</option>
                  <option>طراحی مدل اقتصادی و ساختار</option>
                  <option>طراحی منو و خدمات بار</option>
                  <option>کنترل کیفی و مدیریت اجرایی</option>
                  <option>سایر...</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-bone-muted ml-2">شرح مختصر پروژه</label>
                <textarea 
                  rows={4}
                  className="bg-charcoal border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-gold/50 text-bone transition-colors resize-none"
                  placeholder="مساحت، لوکیشن، مرحله فعلی پروژه..."
                ></textarea>
              </div>

              <button className="w-full bg-bone hover:bg-gold text-charcoal-dark hover:text-charcoal-dark font-semibold py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 mt-4 group/btn">
                ثبت و ارسال درخواست
                <ArrowLeft className="w-5 h-5 group-hover/btn:-translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
