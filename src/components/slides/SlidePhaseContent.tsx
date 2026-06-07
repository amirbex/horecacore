import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import StrategicBusinessBlueprint from '../widgets/StrategicBusinessBlueprint';

type AccordionItem = {
  key: string;
  text: string;
  image?: string;
  imageCaption?: string;
};

type AccordionSection = {
  title: string;
  items: AccordionItem[];
};

type PhaseOutcomes = string[];

export type DetailedPhaseData = {
  intro: {
    title: string;
    content: string;
  };
  sections: AccordionSection[];
  outcomes: PhaseOutcomes;
};

type SlidePhaseContentProps = {
  phaseNumberNum: string;
  phaseNumberRoman: string;
  phaseTitle: string;
  duration: string;
  data: DetailedPhaseData;
};

function AccordionRow({ item }: { item: AccordionItem; key?: string | number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-light/50 bg-ivory group transition-colors duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-right flex items-center justify-between p-6 md:p-8 focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 flex-shrink-0 ${isOpen ? 'bg-soft-gold shadow-[0_0_8px_rgba(194,167,125,0.6)]' : 'bg-gray-dark group-hover:bg-soft-gold'}`} />
          <span className={`font-medium transition-colors duration-300 text-base md:text-lg ${isOpen ? 'text-soft-gold' : 'text-soft-black'}`}>
            {item.key}
          </span>
        </div>
        <div className="text-gray-dark group-hover:text-soft-gold transition-colors duration-300 mr-4">
          {isOpen ? <Minus className="w-5 h-5 flex-shrink-0" /> : <Plus className="w-5 h-5 flex-shrink-0" />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 pt-0 text-gray-dark font-light leading-[2] text-justify text-[15px] flex flex-col gap-6">
              <p>{item.text}</p>
              
              {item.image && (
                 <div className="w-full mt-4 flex flex-col items-start gap-2">
                    <div className="w-full h-auto overflow-hidden border border-gray-light/60 p-1 bg-white">
                       <img src={item.image} alt={item.key} className="w-full h-auto object-cover max-h-[400px] sepia-[0.2] hover:sepia-0 transition-all duration-500" />
                    </div>
                    {item.imageCaption && (
                      <span className="text-xs font-en tracking-widest text-gray-dark uppercase">{item.imageCaption}</span>
                    )}
                 </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SlidePhaseContent({ 
  phaseNumberNum, 
  phaseNumberRoman, 
  phaseTitle, 
  duration, 
  data 
}: SlidePhaseContentProps) {
  
  let widgetElement = null;
  if (phaseNumberRoman === 'I') {
    widgetElement = <StrategicBusinessBlueprint />;
  }
  
  return (
    <section className="snap-slide bg-ivory w-full flex flex-col border-t border-gray-light">
      {/* Top Section with Split Columns */}
      <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto flex flex-col lg:flex-row px-6 md:px-12 xl:px-16 gap-8 lg:gap-16">
        
        {/* Left Column - Sticky Info */}
        <div className="lg:w-1/3 py-16 lg:py-24 lg:sticky lg:top-0 h-auto lg:h-screen flex flex-col justify-center border-l-0 lg:border-l border-gray-light/40 pl-0 lg:pl-8 xl:pl-12 z-10 bg-ivory">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start w-full relative"
          >
            <div className="w-24 h-24 rounded-full border border-soft-gold flex items-center justify-center mb-8 relative">
               <span className="font-en text-3xl text-soft-black font-light">{phaseNumberRoman}</span>
               {/* Orbital decorative dot */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-[-1px] rounded-full border border-transparent"
               >
                 <div className="w-2 h-2 bg-soft-gold rounded-full absolute -top-1 left-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(194,167,125,0.6)]"/>
               </motion.div>
            </div>
            
            <h2 className="text-4xl font-light text-soft-black mb-4 leading-tight">فاز {phaseNumberNum}: <br /> {phaseTitle}</h2>
            <p className="font-en text-sm text-soft-gold tracking-widest uppercase mb-8">Duration: {duration}</p>
            <div className="w-12 h-[1px] bg-gray-dark/30 mb-8"></div>
            
            {/* Outcomes Preview List */}
            <h4 className="text-soft-black font-medium text-sm mb-4">خلاصه‌ دستاوردها:</h4>
            <ul className="space-y-3">
              {data.outcomes.slice(0, 5).map((outcome, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-dark font-light text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-soft-gold/80 mt-1.5 shrink-0"></div>
                  {outcome}
                </li>
              ))}
              {data.outcomes.length > 5 && (
                <li className="text-soft-gold text-xs italic mt-4 pt-4 border-t border-gray-light/30 w-full">+ {data.outcomes.length - 5} دستاورد کلیدی جزئی دیگر در این فاز ارائه می‌شود.</li>
              )}
            </ul>
          </motion.div>
        </div>

        {/* Right Column - Natural Scroll */}
        <div className="w-full lg:w-2/3 py-16 lg:py-24 pr-0 lg:pr-8 xl:pr-12">
          
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ margin: "-50px" }}
             transition={{ duration: 0.6 }}
             className="mb-16 lg:mb-20"
          >
            {/* Mobile Header Title (Hidden on Desktop) */}
            <div className="lg:hidden mb-12">
               <span className="font-en text-soft-gold tracking-widest uppercase text-xs mb-2 block">Phase {phaseNumberRoman}</span>
               <h2 className="text-3xl font-light text-soft-black mb-4">فاز {phaseNumberNum}: {phaseTitle}</h2>
               <div className="w-12 h-[1px] bg-soft-gold"></div>
            </div>

            <h3 className="text-2xl font-medium text-soft-black mb-6 border-r-2 border-soft-gold pr-4">{data.intro.title}</h3>
            <p className="text-gray-dark font-light leading-[2.2] text-justify text-lg mb-4 whitespace-pre-wrap">
              {data.intro.content}
            </p>
          </motion.div>

          <div className="space-y-20">
            {data.sections.map((section, sIdx) => (
              <motion.div 
                key={sIdx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-50px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-[1px] h-8 bg-soft-gold hidden md:block"></div>
                  <h4 className="text-xl md:text-2xl font-medium text-soft-black">{section.title}</h4>
                </div>
                
                <div className="flex flex-col gap-px bg-gray-light/30 border border-gray-light/50">
                  {section.items.map((item, iIdx) => (
                    <AccordionRow key={iIdx} item={item} />
                  ))}
                </div>
              </motion.div>
            ))}
            
            {/* Outcomes section rendered at bottom on mobile only */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="mt-20 lg:hidden"
            >
              <h4 className="text-xl font-medium text-soft-black mb-6">خروجی‌ها و دستاوردهای فاز</h4>
              <ul className="space-y-4 bg-white p-6 md:p-8 border border-gray-light">
                {data.outcomes.map((outcome, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-gray-dark font-light text-base">
                    <div className="w-2 h-2 rounded-full bg-soft-gold mt-2 shrink-0"></div>
                     {outcome}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
          
          {/* Bottom spacing for smooth stop in scroll container */}
          <div className="h-20 w-full"></div>
        </div>
      </div>

      {/* Interactive Analytical & Diagnostic Phase Simulator Section (Spans Beautifully Full-width below the 2-columns layout) */}
      {widgetElement && (
        <div className="w-full bg-ivory border-t border-gray-light/50 pb-24 pt-16">
          <div className="w-full max-w-7xl xl:max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-6 md:px-12 xl:px-16">
            <span className="font-en text-[8px] tracking-[0.25em] font-bold text-soft-gold uppercase block mb-6 text-center">
              ─── Interactive Phase Simulator شبیه‌ساز تعاملی فاز ───
            </span>
            {widgetElement}
          </div>
        </div>
      )}
    </section>
  );
}
