import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { mockDb, SiteContent } from '../../store/mockDb';
import { Link } from 'react-router-dom';

export default function SlideContact({ content }: { content?: SiteContent }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const contactPhone = content?.settings?.contactPhone || "+98 (912) 785 3080";
  const contactEmail = content?.settings?.contactEmail || "strategy@horecacore.info";
  const contactAddress = content?.settings?.contactAddress || "تهران - سعادت آباد";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      projectType: formData.get('projectType') as string,
      description: formData.get('description') as string,
    };

    setTimeout(() => {
      mockDb.saveRequest(data);
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section id="slide-contact" className="snap-slide bg-charcoal-dark flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 xl:px-16 relative overflow-hidden min-h-screen">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-5" style={{ 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)', 
        backgroundSize: '100px 100px',
        backgroundPosition: 'center center'
      }}></div>

      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 bg-charcoal/50 p-6 md:p-12 rounded-3xl border border-white/5 shadow-2xl backdrop-blur-xl">
        
        {/* Left: Contact Info */}
        <div className="flex flex-col justify-center">
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1 }}
          >
            <p className="font-en text-xs tracking-[0.3em] uppercase text-soft-gold mb-4">Start the core</p>
            <h2 className="text-3xl md:text-5xl font-light text-ivory mb-6 leading-tight">
              درخواست <span className="font-medium text-soft-gold">جلسه مشاوره</span> و بررسی پروژه
            </h2>
            <p className="text-gray-dark text-sm leading-relaxed max-w-md mb-12">
              برای آغاز همکاری، هماهنگی جلسات اولیه و دریافت پروپوزال اختصاصی فازهای اجرایی، می‌توانید از طریق راه‌های ارتباطی زیر یا فرم درخواست، با ما در تماس باشید.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-soft-gold/30 flex items-center justify-center bg-soft-gold/10 text-soft-gold">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col" dir="ltr">
                  <span className="text-ivory font-en text-xl tracking-wider">{contactPhone}</span>
                  <span className="text-xs text-gray-dark uppercase tracking-widest font-en">Direct Line</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-soft-gold/30 flex items-center justify-center bg-soft-gold/10 text-soft-gold">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col" dir="ltr">
                  <span className="text-ivory font-en text-lg tracking-wider">{contactEmail}</span>
                  <span className="text-xs text-gray-dark uppercase tracking-widest font-en">Email Support</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/5">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-gray-dark">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-ivory/80 text-sm leading-relaxed text-right">
                    {contactAddress}<br/>
                    <span className="text-gray-dark text-xs mt-1 block">مراجعات حضوری با هماهنگی قبلی</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Form */}
        <motion.div 
           initial={{ opacity: 0, x: -30 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, delay: 0.3 }}
           className="relative flex items-center"
        >
          <div className="w-full bg-charcoal-dark/80 p-8 rounded-2xl border border-soft-gold/10 shadow-lg relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-soft-gold mb-6" />
                  <h3 className="text-xl font-medium text-ivory mb-2">درخواست شما با موفقیت ثبت شد</h3>
                  <p className="text-sm text-gray-dark mb-8">همکاران ما در اسرع وقت جهت هماهنگی جلسه با شما تماس خواهند گرفت.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="text-soft-gold text-sm underline underline-offset-4 font-light"
                  >
                    ثبت درخواست جدید
                  </button>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-ivory/60 pr-1">نام و نام خانوادگی</label>
                    <input required name="name" type="text" className="w-full bg-charcoal border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold transition-colors" placeholder="مثال: علی رضایی" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-ivory/60 pr-1">شماره تماس (الزامی)</label>
                    <input required name="phone" type="tel" dir="ltr" className="w-full bg-charcoal border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold transition-colors text-right placeholder:text-left" placeholder="0912..." />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-ivory/60 pr-1">موضوع پروژه / مقیاس حدودی</label>
                    <select name="projectType" className="w-full bg-charcoal border border-white/10 rounded-lg px-4 py-3 text-ivory/80 text-sm focus:outline-none focus:border-soft-gold transition-colors appearance-none">
                      <option value="">انتخاب کنید...</option>
                      <option value="cafe">راه‌اندازی کافه / پتیسری</option>
                      <option value="restaurant">راه‌اندازی رستوران</option>
                      <option value="hotel">هتل بوتیک / مجتمع گردشگری</option>
                      <option value="consulting">مشاوره بهبود و بازآفرینی</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-ivory/60 pr-1">توضیحات کوتاه (اختیاری)</label>
                    <textarea name="description" rows={3} className="w-full bg-charcoal border border-white/10 rounded-lg px-4 py-3 text-ivory text-sm focus:outline-none focus:border-soft-gold transition-colors resize-none" placeholder="درباره نیاز اصلی مجموعه خود بنویسید..."></textarea>
                  </div>

                  <button 
                    disabled={formStatus === 'submitting'}
                    type="submit" 
                    className="mt-4 w-full bg-soft-gold text-charcoal-dark font-medium py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-ivory transition-colors disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="w-5 h-5 border-2 border-charcoal-dark/30 border-t-charcoal-dark rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 ml-1" />
                        ارسال درخواست
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center mt-2 pt-4 border-t border-white/10 text-[10px] text-white/10">
                    <span>© HoReCa Core 2026. All Rights Reserved.</span>
                    <Link to="/login" className="ml-2 w-2 h-2 rounded-full opacity-0 hover:opacity-100 transition-opacity bg-white/20"></Link>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
