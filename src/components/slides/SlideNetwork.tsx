import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NetworkEntity, networkData } from '../../data/networkData';
import { X, CheckCircle2, Handshake, UtensilsCrossed, Info, Briefcase, Store, ZoomIn, ZoomOut, Maximize } from 'lucide-react';

export default function SlideNetwork({ content }: { content?: any }) {
  const [selectedEntity, setSelectedEntity] = useState<NetworkEntity | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const displayEntities = useMemo(() => {
    let base = [...networkData];
    
    // Inject CMS custom partners overrides
    const cmsPartners = content?.networkPartners || [];
    if (cmsPartners.length > 0) {
      const additional = cmsPartners.map((p: any) => ({
        id: p.id,
        type: p.type || 'project',
        name: p.name,
        website: p.website,
        logoInitial: p.name.substring(0,2).toUpperCase(),
        logoUrl: p.image || undefined,
        description: p.description,
        activities: p.activities || [],
        images: p.image ? [p.image] : [],
        connections: p.connections || []
      }));
      base = [...additional, ...base];
    }

    return base.map(entity => {
      // Auto compute bi-directional connections so we don't rely only on hardcoded ones
      const relatedIds = base
        .filter(b => b.connections?.includes(entity.id))
        .map(b => b.id);
      
      const allConnections = Array.from(new Set([...(entity.connections || []), ...relatedIds]));
      return { ...entity, connections: allConnections };
    });
  }, [content]);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Orbital Navigation & Canvas Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    canvas.width = width;
    canvas.height = height;

    let animationFrameId: number;
    let time = 0;

    const isMobile = window.innerWidth < 768;
    
    // Core position
    let coreX = width / 2;
    let coreY = height / 2;

    const orbitConfig = {
      partnerRadius: isMobile ? 80 : 150,
      projectRadius: isMobile ? 120 : 240,
      speedRange: { min: 0.0001, max: 0.0004 },
      floatRange: isMobile ? 3 : 6,
    };
    
    // Physics / Positions
    const orbits = displayEntities.map((entity, i) => {
      const isPartner = entity.type === 'partner' || entity.type === 'supplier';
      const baseRadius = isPartner ? orbitConfig.partnerRadius : orbitConfig.projectRadius;
      
      return {
        id: entity.id,
        isPartner,
        angle: (i / displayEntities.length) * Math.PI * 2,
        speed: orbitConfig.speedRange.min + Math.random() * (orbitConfig.speedRange.max - orbitConfig.speedRange.min),
        direction: Math.random() > 0.5 ? -1 : 1,
        baseRadius: baseRadius + (Math.random() * (isMobile ? 20 : 50)),
        radiusOffset: Math.random() * Math.PI * 2,
        radiusSpeed: 0.0003 + Math.random() * 0.0004,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.001 + Math.random() * 0.002,
        currentX: 0,
        currentY: 0
      };
    });

    const particleProperties = {
      particleColor: 'rgba(197, 160, 89, 0.45)', // soft gold
      particleRadius: 1.5,
      particleCount: isMobile ? 35 : 70,
      lineLength: isMobile ? 100 : 160,
      particleSpeed: 0.35,
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * particleProperties.particleSpeed;
        this.vy = (Math.random() - 0.5) * particleProperties.particleSpeed;
      }
      position() {
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
        this.x += this.vx;
        this.y += this.vy;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, particleProperties.particleRadius, 0, Math.PI * 2);
        ctx!.fillStyle = particleProperties.particleColor;
        ctx!.fill();
      }
    }

    let particles: Particle[] = [];
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleProperties.particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const handleResize = () => {
      if (containerRef.current) {
        width = containerRef.current.clientWidth;
        height = containerRef.current.clientHeight;
        canvas.width = width;
        canvas.height = height;
        coreX = width / 2;
        coreY = height / 2;
        initParticles();
      }
    };
    handleResize();

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const length = Math.sqrt(dx * dx + dy * dy);

          if (length < particleProperties.lineLength) {
            const opacity = 1 - length / particleProperties.lineLength;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(194, 167, 125, ${opacity * 0.3})`;
            ctx!.lineWidth = 0.6;
            ctx!.stroke();
          }
        }
        
        // Node to Particle
        for (let orb of orbits) {
          const dx = particles[i].x - orb.currentX;
          const dy = particles[i].y - orb.currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = isMobile ? 70 : 140;
          if (dist < threshold) {
            const opacity = 0.6 * (1 - dist / threshold);
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(orb.currentX, orb.currentY);
            ctx!.strokeStyle = `rgba(194, 167, 125, ${opacity * 0.5})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }
      }

      // Particle to Core
      for (let p of particles) {
        const dx = p.x - coreX;
        const dy = p.y - coreY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = isMobile ? 150 : 250;
        if (dist < threshold) {
          const opacity = 0.6 * (1 - dist / threshold);
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(coreX, coreY);
          ctx!.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.5})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }
    };

    const animate = () => {
      ctx!.clearRect(0, 0, width, height);
      time += 0.016;

      // 1. Calculate ideal celestial orbit motion positions FIRST
      orbits.forEach((orb) => {
        orb.angle += orb.speed * orb.direction;
        orb.radiusOffset += orb.radiusSpeed;
        
        const floatY = Math.sin(time * orb.floatSpeed + orb.floatOffset) * orbitConfig.floatRange;
        const wobbleX = Math.sin(time * 0.0008 + orb.floatOffset) * orbitConfig.floatRange;
        
        const radiusBreathingX = Math.sin(time * 0.02 + orb.radiusOffset) * (isMobile ? 10 : 25);
        const radiusBreathingY = Math.cos(time * 0.015 + orb.radiusOffset) * (isMobile ? 8 : 20);

        orb.currentX = coreX + Math.cos(orb.angle) * (orb.baseRadius + radiusBreathingX) + wobbleX;
        orb.currentY = coreY + Math.sin(orb.angle) * (orb.baseRadius + radiusBreathingY) + floatY;
      });

      // 2. Pair-wise iterative physical repulsion to guarantee NO overlapping of nodes
      const minDistance = isMobile ? 65 : 100; // safe threshold to prevent overlapping of logos and tags
      const repulsionIterations = 5; // multiple passes ensures high stability under structural stress

      for (let iter = 0; iter < repulsionIterations; iter++) {
        // Prevent overlap with central core first
        const minCoreDistance = isMobile ? 85 : 140;
        for (let i = 0; i < orbits.length; i++) {
          const dx = orbits[i].currentX - coreX;
          const dy = orbits[i].currentY - coreY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minCoreDistance && dist > 1) {
            const overlap = minCoreDistance - dist;
            orbits[i].currentX += (dx / dist) * overlap;
            orbits[i].currentY += (dy / dist) * overlap;
          }
        }

        // Prevent overlap between the orbital nodes themselves
        for (let i = 0; i < orbits.length; i++) {
          for (let j = i + 1; j < orbits.length; j++) {
            const dx = orbits[i].currentX - orbits[j].currentX;
            const dy = orbits[i].currentY - orbits[j].currentY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < minDistance && dist > 1) {
              const overlap = minDistance - dist;
              // Push each node away symmetrically (0.5 each)
              const pushX = (dx / dist) * overlap * 0.5;
              const pushY = (dy / dist) * overlap * 0.5;
              
              orbits[i].currentX += pushX;
              orbits[i].currentY += pushY;
              orbits[j].currentX -= pushX;
              orbits[j].currentY -= pushY;
            }
          }
        }
      }

      // 3. Update DOM positions of node instances cleanly
      orbits.forEach((orb, i) => {
        if (nodesRef.current[i]) {
          nodesRef.current[i]!.style.left = `${orb.currentX}px`;
          nodesRef.current[i]!.style.top = `${orb.currentY}px`;
        }
      });

      for (let p of particles) {
        p.position();
        p.draw();
      }
      drawLines();

      // Draw faint orbit paths
      ctx!.beginPath();
      ctx!.ellipse(coreX, coreY, orbitConfig.partnerRadius, orbitConfig.partnerRadius * 0.9, 0, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(194, 167, 125, 0.05)';
      ctx!.lineWidth = 1;
      ctx!.stroke();
      
      ctx!.beginPath();
      ctx!.ellipse(coreX, coreY, orbitConfig.projectRadius, orbitConfig.projectRadius * 0.9, 0, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(194, 167, 125, 0.03)';
      ctx!.stroke();

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [displayEntities]);

  const getTypeLabel = (type: string) => {
    if (type === 'project') return 'پروژه اجرایی';
    if (type === 'supplier') return 'تامین‌کننده منابع';
    return 'همکار استراتژیک';
  };

  const getRoleIcon = (type: string) => {
    if (type === 'project') return <UtensilsCrossed className="w-5 h-5 text-soft-gold" />;
    if (type === 'supplier') return <Store className="w-5 h-5 text-soft-gold" />;
    return <Briefcase className="w-5 h-5 text-soft-gold" />;
  };

  return (
    <section id="slide-network" className="snap-slide bg-charcoal-dark overflow-hidden relative flex flex-col min-h-screen border-t border-soft-gold/20">
      
      {/* Header Info */}
      <div className="absolute top-10 right-6 lg:right-16 z-50 pointer-events-none flex flex-col gap-3 max-w-md">
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-light text-ivory pointer-events-auto">بوم شبکه ارزش</h2>
          <p className="text-gray-light font-light mt-2 flex items-center gap-2 pointer-events-auto bg-soft-black/50 p-2 rounded-md backdrop-blur-sm self-start text-xs md:text-sm border border-white/5">
            <Info className="w-4 h-4 text-soft-gold shrink-0" />
            برای مشاهده جزئیات، روی پین‌های چرخان یا هسته مرکزی کلیک کنید.
          </p>
        </motion.div>
      </div>

      {/* Main Orbit Area */}
      <div className="absolute top-[30%] lg:top-[25%] left-6 z-50 flex flex-col gap-3 bg-charcoal-dark/50 backdrop-blur-md p-2 rounded-xl border border-white/10">
        <button 
          onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.5))}
          className="w-10 h-10 flex items-center justify-center text-ivory hover:text-soft-gold bg-soft-black/80 hover:bg-white/10 rounded-lg transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setZoomLevel(1)}
          className="w-10 h-10 flex items-center justify-center text-ivory hover:text-soft-gold bg-soft-black/80 hover:bg-white/10 rounded-lg transition-colors"
          title="Reset Zoom"
        >
          <Maximize className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.4))}
          className="w-10 h-10 flex items-center justify-center text-ivory hover:text-soft-gold bg-soft-black/80 hover:bg-white/10 rounded-lg transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5" />
        </button>
      </div>

      <div 
        className="w-full h-full absolute inset-0 touch-none overflow-hidden transition-transform duration-700 ease-in-out origin-center"
        style={{ transform: `scale(${zoomLevel})` }}
        ref={containerRef}
      >
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" 
        />

        {/* Orbit Node Instances */}
        {displayEntities.map((entity, i) => {
          const isPartner = entity.type === 'partner' || entity.type === 'supplier';
          
          return (
             <div
                key={entity.id}
                ref={el => nodesRef.current[i] = el}
                className="absolute z-30 cursor-pointer pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEntity(entity);
                }}
             >
                <div className={`
                    ${isPartner ? 'w-14 h-14 md:w-16 md:h-16 border-[2px] rounded-full' : 'w-10 h-10 md:w-12 md:h-12 border border-white/20 rounded-xl'}
                    border-soft-gold/60 flex flex-col items-center justify-center 
                    bg-charcoal-dark/90 backdrop-blur-md 
                    shadow-[0_0_15px_rgba(194,167,125,0.2)] transition-all duration-300
                    hover:scale-125 hover:border-amber-400 hover:bg-soft-black hover:shadow-[0_0_30px_rgba(251,191,36,0.6)]
                    overflow-hidden
                `}>
                   {entity.logoUrl ? (
                     <img src={entity.logoUrl} alt={entity.name} className={`w-full h-full object-cover p-1 opacity-90 mix-blend-screen bg-white ${isPartner ? 'rounded-full' : 'rounded-[inherit]'}`} />
                   ) : (
                     <span className="font-en text-lg text-soft-gold">{entity.logoInitial}</span>
                   )}
                </div>
                {/* Node Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-charcoal-dark/90 backdrop-blur-md rounded-full border border-soft-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-40 hidden md:block">
                  <span className="text-xs text-white font-medium drop-shadow-sm">{entity.name}</span>
                </div>
             </div>
          )
        })}

        {/* Central Core Element */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer group"
          onClick={() => setSelectedEntity({
            id: 'core', type: 'partner', name: 'هسته معماری هورکا', logoInitial: 'C',
            description: 'هسته مرکزی شبکه همکاران. مدیریت استراتژیک و توسعه پروژه‌ها در حوزه خوراک و نوشیدنی با رویکرد نوآورانه. تمامی این شبکه به صورت ارگانیک با محوریت هسته مرکزی مدیریت و توزیع ارزش می‌گردد.',
            activities: ['استراتژی کلان توسعه بین‌الملل', 'تزریق کیفیت و هم‌افزایی ارزش میان اعضا'], connections: [], images: []
          })}
        >
          {/* Pulsing layers behind core */}
          <div className="absolute inset-0 rounded-full bg-soft-gold/20 blur-xl animate-ping opacity-60 duration-[3000ms]"></div>
          
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full border-[3px] border-soft-gold bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-soft-gold/40 via-charcoal-dark/80 to-charcoal-dark backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(194,167,125,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_80px_rgba(251,191,36,0.7)] group-hover:border-amber-400 transition-all duration-500 overflow-hidden relative">
             <div className="absolute top-2 right-3 w-4 h-4 md:top-3 md:right-5 md:w-6 md:h-6 bg-white/30 blur-[2px] rounded-full z-10 transition-transform group-hover:scale-150"></div> 
             <span className="font-en text-xl md:text-3xl tracking-widest text-soft-gold font-light uppercase z-10 mt-1 drop-shadow-lg group-hover:text-white transition-colors">HoReCa</span>
             <span className="text-[10px] md:text-sm text-ivory/90 tracking-[0.4em] md:tracking-[0.5em] uppercase font-bold mt-1 z-10">Core</span>
          </div>
        </div>

      </div>

      {/* Dossier Modal Overlay */}
      <AnimatePresence>
        {selectedEntity && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedEntity(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-soft-gold/30 shadow-2xl flex flex-col relative hide-scrollbar overflow-hidden"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-ivory/95 backdrop-blur-md border-b border-gray-light px-6 md:px-10 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 z-10 transition-colors">
                <div className="flex items-center gap-6">
                  <div className={`shrink-0 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden shadow-sm ${
                    selectedEntity.type === 'project' ? 'bg-white text-soft-black border-gray-light rounded-2xl border-[2px]' : 
                    'bg-charcoal-dark text-soft-gold border-soft-gold border-[3px] rounded-full'
                  }`}>
                    {selectedEntity.logoUrl ? (
                         <div className={`w-full h-full p-1.5 ${selectedEntity.type === 'project' ? 'bg-white rounded-2xl' : 'bg-white rounded-full'}`}>
                           <img src={selectedEntity.logoUrl} alt={selectedEntity.name} className={`w-full h-full object-cover mix-blend-screen opacity-90 ${selectedEntity.type === 'project' ? 'rounded-[inherit]' : 'rounded-full'}`} />
                         </div>
                    ) : (
                         <span className="font-en text-xl md:text-3xl tracking-widest font-medium uppercase mt-0.5">{selectedEntity.logoInitial}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-soft-black">{selectedEntity.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                       {getRoleIcon(selectedEntity.type)}
                       <span className="text-gray-dark text-sm md:text-base font-medium">{getTypeLabel(selectedEntity.type)}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedEntity(null)}
                  className="absolute sm:relative top-6 left-6 sm:top-0 sm:left-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-light flex items-center justify-center text-gray-dark hover:bg-soft-gold hover:text-white hover:border-soft-gold transition-colors"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-10 flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <div className="prose prose-lg max-w-none">
                     <p className="text-soft-black leading-relaxed text-justify font-light text-base md:text-lg">
                       {selectedEntity.description}
                     </p>
                  </div>
                  {selectedEntity.website && (
                    <a 
                      href={selectedEntity.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-start inline-flex items-center gap-2 px-6 py-2.5 bg-soft-gold/20 text-charcoal-dark font-medium rounded-full hover:bg-soft-gold hover:text-white transition-colors border border-soft-gold/40"
                    >
                      <span>مشاهده وب‌سایت</span>
                      <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedEntity.activities && selectedEntity.activities.length > 0 && (
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-light shadow-sm">
                      <h4 className="text-soft-black font-medium mb-5 text-lg flex flex-col relative pb-3 border-b border-gray-light">
                         حوزه فعالیت و راهکارها
                         <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-soft-gold"></div>
                      </h4>
                      <ul className="space-y-4">
                        {selectedEntity.activities.map((activity, idx) => (
                           <li key={idx} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-soft-gold shrink-0 mt-0.5" />
                              <span className="text-gray-dark text-base">{activity}</span>
                           </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedEntity.connections && selectedEntity.connections.length > 0 && (
                     <div className="bg-charcoal border border-soft-gold/30 p-6 md:p-8 rounded-2xl shadow-sm">
                        <h4 className="text-soft-gold font-medium mb-5 text-lg flex flex-col relative pb-3 border-b border-soft-gold/20">
                           اشتراکات شبکه و مشارکت‌ها
                           <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-soft-gold"></div>
                        </h4>
                        <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                           {selectedEntity.connections.map(connId => {
                              const conn = displayEntities.find(n => n.id === connId);
                              if (!conn) return null;
                              return (
                                 <div key={connId} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="w-10 h-10 rounded-full bg-charcoal-dark overflow-hidden flex items-center justify-center shrink-0 border border-soft-gold/30 p-0.5">
                                       {conn.logoUrl ? (
                                          <img src={conn.logoUrl} alt={conn.name} className="w-full h-full object-cover mix-blend-screen rounded-full" />
                                       ) : (
                                          <span className="font-en text-xs text-soft-gold font-bold">{conn.logoInitial}</span>
                                       )}
                                    </div>
                                    <div className="flex flex-col flex-1">
                                      <span className="text-ivory font-medium text-sm">{conn.name}</span>
                                      <span className="text-gray-400 text-xs">{getTypeLabel(conn.type)}</span>
                                    </div>
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                  )}
                </div>

                {selectedEntity.images && selectedEntity.images.length > 0 && (
                   <div className="mt-4 pt-8 border-t border-gray-light/60">
                     <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-6 bg-soft-gold"></div>
                        <h4 className="text-soft-black font-medium text-lg leading-none">پرونده تصویری</h4>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {selectedEntity.images.map((img, idx) => (
                         <div key={idx} className="relative aspect-video bg-gray-light overflow-hidden group isolate rounded-xl shadow-sm">
                           {/* Hover Overlay */}
                           <div className="absolute inset-0 bg-soft-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                           <img src={img} alt={`${selectedEntity.name} تصویر ${idx+1}`} className="w-full h-full object-cover filter saturate-50 group-hover:saturate-100 group-hover:scale-105 transition-all duration-700" />
                         </div>
                       ))}
                     </div>
                   </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
