import { motion } from 'motion/react';
import { Network } from 'lucide-react';
import { SiteContent } from '../../store/mockDb';

export default function SlideTeam({ content }: { content?: SiteContent }) {
  const teamMembers = content?.teamMembers || [];

  return (
    <section id="slide-team" className="snap-slide bg-charcoal-dark flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 xl:px-16 relative overflow-hidden min-h-screen">
      
      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-soft-gold to-transparent opacity-30" />

      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto z-10 flex flex-col h-full justify-center">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 mt-8">
           <motion.div
             initial={{ scale: 0 }}
             whileInView={{ scale: 1 }}
             transition={{ duration: 0.8 }}
             className="w-12 h-12 rounded-full border border-soft-gold/30 flex items-center justify-center mx-auto mb-4"
           >
             <Network className="w-5 h-5 text-soft-gold" />
           </motion.div>
           <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-2xl md:text-4xl font-light text-ivory mb-4"
           >
             همکاران و اعضای <span className="text-soft-gold font-medium">هسته مرکزی</span>
           </motion.h2>
           <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-gray-dark text-sm max-w-2xl mx-auto leading-relaxed"
           >
             مدیریت، راهبری و اجرای حرفه‌ای فازهای پروژه توسط شبکه‌ای از متخصصین با تجربه و متمرکز در صنعت مهمان‌نوازی انجام می‌پذیرد.
           </motion.p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 flex-1 items-center pb-12">
          {teamMembers.map((member, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 + (i * 0.2) }}
              className="flex flex-col group h-full"
            >
              {/* Image Section */}
              <div className="relative w-full aspect-[3/4] mb-6 overflow-hidden rounded-2xl border border-white/5 bg-charcoal">
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/20 to-transparent z-10 opacity-80" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-20 flex flex-col justify-end">
                  <h3 className="text-soft-gold text-2xl font-medium mb-1">{member.name}</h3>
                  <p className="text-ivory/80 text-sm font-light tracking-wide">{member.role}</p>
                </div>
              </div>

              {/* Tasks Section */}
              <div className="mt-auto px-4 border-r-2 border-soft-gold/30 py-2">
                <h4 className="text-xs text-gray-400 mb-3 font-semibold uppercase tracking-widest">مسئولیت‌های کلیدی</h4>
                <ul className="space-y-2">
                  {member.tasks.map((task, idx) => (
                    <li key={idx} className="text-ivory/70 text-sm font-light flex items-center gap-2">
                      <div className="w-1 h-1 bg-soft-gold rounded-full" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
