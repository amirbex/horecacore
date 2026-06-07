import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import LoadingScreen from '../components/slides/LoadingScreen';
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
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<SiteContent>(mockDb.getContent());

  useEffect(() => {
    setContent(mockDb.getContent());
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <Navigation />
      
      {/* 
        Snap Scrolling Container: 
        Matches strict horizontal storytelling mapped to vertical scrolling
      */}
      <main className="snap-container bg-ivory text-soft-black relative">
        
        {/* Pre-render slide structure while loading but keep under loading screen */}
        <SlideCoreHero animateIn={!loading} content={content} />
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

