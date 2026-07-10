import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import SlideCoreHero from '../components/slides/SlideCoreHero';
import SlideIndustry from '../components/slides/SlideIndustry';
import SlideNetwork from '../components/slides/SlideNetwork';
import SlidePhasesOrbit from '../components/slides/SlidePhasesOrbit';
import SlidePhaseContent from '../components/slides/SlidePhaseContent';
import SlideFinancials from '../components/slides/SlideFinancials';
import SlideTeam from '../components/slides/SlideTeam';
import SlideContact from '../components/slides/SlideContact';
import Navigation from '../components/Navigation';
import { phase1FullData, phase2FullData, phase3FullData } from '../data/detailedPhases';
import { mockDb, SiteContent } from '../store/mockDb';

export default function Home() {
  const [content, setContent] = useState<SiteContent>(mockDb.getContent());
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setContent(mockDb.getContent());
    
    // Show nav after the intro animation completes (e.g. 7 seconds)
    const t = setTimeout(() => setShowNav(true), 6500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {showNav && (
          <Navigation />
        )}
      </AnimatePresence>
      
      <main className="snap-container bg-bg-main text-text-primary relative">
        <SlideCoreHero content={content} onIntroComplete={() => setShowNav(true)} />
        <SlideIndustry content={content} />
        <SlideNetwork content={content} />
        <SlidePhasesOrbit />
        <SlidePhaseContent 
          phaseNumberNum="۱"
          phaseNumberRoman="I"
          phaseTitle="مشاوره و طراحی کسب‌وکار"
          duration="۴ ماه"
          data={phase1FullData}
        />
        <SlidePhaseContent 
          phaseNumberNum="۲"
          phaseNumberRoman="II"
          phaseTitle="راه‌اندازی و توسعه منو"
          duration="۳ ماه"
          data={phase2FullData}
        />
        <SlidePhaseContent 
          phaseNumberNum="۳"
          phaseNumberRoman="III"
          phaseTitle="کنترل کیفی و مدیریت میدانی"
          duration="مستمر"
          data={phase3FullData}
        />
        <SlideTeam content={content} />
        <SlideFinancials />
        <SlideContact content={content} />
      </main>
    </>
  );
}

