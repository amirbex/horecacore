import { useEffect, useState } from 'react';

const navItems = [
  { id: 'slide-hero', label: 'معرفی' },
  { id: 'slide-industry', label: 'صنعت' },
  { id: 'slide-network', label: 'بوم شبکه' },
  { id: 'slide-phases', label: 'فازها' },
  { id: 'slide-team', label: 'تیم' },
  { id: 'slide-financials', label: 'مالی' },
  { id: 'slide-contact', label: 'ارتباط' },
];

export default function Navigation() {
  const [activeId, setActiveId] = useState('slide-hero');

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, { threshold: 0.5 });
    
    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
     <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6" dir="rtl">
        {navItems.map(item => (
           <a key={item.id} href={`#${item.id}`} className="group flex items-center gap-4 relative">
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${activeId === item.id ? 'bg-soft-gold scale-150 shadow-[0_0_8px_rgba(194,167,125,0.6)]' : 'bg-gray-400/50 hover:bg-soft-gold'}`} />
              <span className={`absolute right-6 text-sm font-light whitespace-nowrap transition-all duration-300 ${activeId === item.id ? 'opacity-100 text-soft-gold' : 'opacity-0 group-hover:opacity-100 text-gray-dark'}`}>
                 {item.label}
              </span>
           </a>
        ))}
     </nav>
  )
}
