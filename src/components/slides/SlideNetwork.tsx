import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NetworkEntity, networkData } from '../../data/networkData';
import { X, CheckCircle2, Handshake, UtensilsCrossed, Info, Briefcase, Store, ZoomIn, ZoomOut, Maximize, MapPin, Calendar, Globe, ExternalLink, Instagram, Activity, Filter, Menu } from 'lucide-react';

type FilterType = 'all' | 'project' | 'partner' | 'supplier';

export default function SlideNetwork({ content }: { content?: any }) {
  const [selectedEntity, setSelectedEntity] = useState<NetworkEntity | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const filterRef = useRef<FilterType>('all');

  useEffect(() => {
    filterRef.current = activeFilter;
  }, [activeFilter]);

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
      supplierRadius: isMobile ? 80 : 130,
      partnerRadius: isMobile ? 120 : 210,
      projectRadius: isMobile ? 160 : 310,
      speedRange: { min: 0.00005, max: 0.00015 },
      floatRange: isMobile ? 2 : 4,
    };
    
    // Physics / Positions
    const orbits = displayEntities.map((entity, i) => {
      let baseRadius;
      if (entity.type === 'supplier') {
        baseRadius = orbitConfig.supplierRadius;
      } else if (entity.type === 'partner') {
        baseRadius = orbitConfig.partnerRadius;
      } else {
        baseRadius = orbitConfig.projectRadius;
      }
      
      return {
        id: entity.id,
        type: entity.type,
        isPartner: entity.type === 'partner' || entity.type === 'supplier',
        angle: (i / displayEntities.length) * Math.PI * 2,
        speed: orbitConfig.speedRange.min + Math.random() * (orbitConfig.speedRange.max - orbitConfig.speedRange.min),
        direction: Math.random() > 0.5 ? -1 : 1,
        baseRadius: baseRadius + (Math.random() * (isMobile ? 15 : 30)),
        radiusOffset: Math.random() * Math.PI * 2,
        radiusSpeed: 0.0001 + Math.random() * 0.0002,
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.0005 + Math.random() * 0.001,
        currentX: 0,
        currentY: 0
      };
    });

    const particleProperties = {
      particleColor: 'rgba(197, 160, 89, 0.45)', // soft gold
      particleRadius: 1.5,
      particleCount: isMobile ? 50 : 100, // increased for richer look
      lineLength: isMobile ? 150 : 220, // longer lines
      particleSpeed: 0.2,
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

    const drawLines = (renderCoreX: number) => {
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
            ctx!.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.25})`; // Soft gold color
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
        
        // Node to Particle
        for (let orb of orbits) {
          const dx = particles[i].x - orb.currentX;
          const dy = particles[i].y - orb.currentY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const threshold = isMobile ? 80 : 160;
          if (dist < threshold) {
            const opacity = 0.7 * (1 - dist / threshold);
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(orb.currentX, orb.currentY);
            
            // Create gradient for the line
            const grad = ctx!.createLinearGradient(particles[i].x, particles[i].y, orb.currentX, orb.currentY);
            grad.addColorStop(0, `rgba(194, 167, 125, ${opacity * 0.2})`);
            grad.addColorStop(1, `rgba(251, 191, 36, ${opacity * 0.6})`); // Brighter amber near the node
            
            ctx!.strokeStyle = grad;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      // Particle to Core
      for (let p of particles) {
        const dx = p.x - renderCoreX;
        const dy = p.y - coreY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = isMobile ? 180 : 300;
        if (dist < threshold) {
          const opacity = 0.7 * (1 - dist / threshold);
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(renderCoreX, coreY);
          
          const grad = ctx!.createLinearGradient(p.x, p.y, renderCoreX, coreY);
          grad.addColorStop(0, `rgba(255, 215, 0, ${opacity * 0.2})`);
          grad.addColorStop(1, `rgba(251, 191, 36, ${opacity * 0.8})`);
          
          ctx!.strokeStyle = grad;
          ctx!.lineWidth = 1.2;
          ctx!.stroke();
        }
      }

      // Direct lines from Core to Filtered items
      if (filterRef.current !== 'all') {
        orbits.forEach(orb => {
          if (orb.type === filterRef.current) {
            ctx!.beginPath();
            ctx!.moveTo(renderCoreX, coreY);
            
            // Draw a sweeping bezier curve
            const cp1X = renderCoreX + (width * 0.15);
            const cp1Y = coreY;
            const cp2X = orb.currentX - (width * 0.1);
            const cp2Y = orb.currentY;
            
            ctx!.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, orb.currentX, orb.currentY);
            
            const grad = ctx!.createLinearGradient(renderCoreX, coreY, orb.currentX, orb.currentY);
            grad.addColorStop(0, `rgba(251, 191, 36, 0.5)`);
            grad.addColorStop(1, `rgba(194, 167, 125, 0.1)`);
            
            ctx!.strokeStyle = grad;
            ctx!.lineWidth = isMobile ? 1 : 2;
            ctx!.setLineDash([4, 6]);
            ctx!.lineDashOffset = -time * 30; // Animated data flow effect
            ctx!.stroke();
            ctx!.setLineDash([]); // reset dash
          }
        });
      }
    };

    const animate = () => {
      ctx!.clearRect(0, 0, width, height);
      time += 0.016;
      
      const filter = filterRef.current;
      const isFiltered = filter !== 'all';
      let centerShiftX = 0;
      if (isFiltered) {
        // Shift the core conceptually to the left to leave room for the selected ones on the right
        centerShiftX = -width * 0.15;
      }
      
      const filteredOrbits = isFiltered ? orbits.filter(o => o.type === filter) : [];

      // 1. Calculate ideal celestial orbit motion positions FIRST
      orbits.forEach((orb) => {
        orb.angle += orb.speed * orb.direction;
        orb.radiusOffset += orb.radiusSpeed;
        
        const floatY = Math.sin(time * orb.floatSpeed + orb.floatOffset) * orbitConfig.floatRange;
        const wobbleX = Math.sin(time * 0.0008 + orb.floatOffset) * orbitConfig.floatRange;
        
        const radiusBreathingX = Math.sin(time * 0.02 + orb.radiusOffset) * (isMobile ? 5 : 10);
        const radiusBreathingY = Math.cos(time * 0.015 + orb.radiusOffset) * (isMobile ? 4 : 8);

        let targetX = coreX + centerShiftX;
        let targetY = coreY;
        let finalRadius = orb.baseRadius;
        
        let idealX = 0;
        let idealY = 0;

        if (isFiltered) {
          if (orb.type === filter) {
             const index = filteredOrbits.indexOf(orb);
             const total = filteredOrbits.length;
             
             // Organize neatly in a vertical list/arc on the right side
             const startY = height * 0.25;
             const endY = height * 0.75;
             // calculate step, but limit it to avoid them being too close
             const stepY = total > 1 ? (endY - startY) / (total - 1) : 0;
             const myY = total === 1 ? height * 0.5 : startY + (stepY * index);
             
             // Creates a subtle curve (arc) pointing towards the center
             const normalizedY = total > 1 ? index / (total - 1) : 0.5; // 0 to 1
             const arcX = Math.sin(normalizedY * Math.PI) * (isMobile ? 40 : 80);
             
             idealX = width - (isMobile ? width * 0.15 : width * 0.25) - arcX;
             idealY = myY;
             
          } else {
             // Move to the left side (around the shifted core)
             targetX = coreX + centerShiftX - (width * 0.15); // This places them to the left of the shifted core
             finalRadius = orb.baseRadius * 0.45; // compact the unfocused items
             idealX = targetX + Math.cos(orb.angle) * (finalRadius + radiusBreathingX) + wobbleX;
             idealY = targetY + Math.sin(orb.angle) * (finalRadius + radiusBreathingY) + floatY;
          }
        } else {
           orb.speed = orbitConfig.speedRange.min + (orb.speed % (orbitConfig.speedRange.max - orbitConfig.speedRange.min));
           idealX = targetX + Math.cos(orb.angle) * (finalRadius + radiusBreathingX) + wobbleX;
           idealY = targetY + Math.sin(orb.angle) * (finalRadius + radiusBreathingY) + floatY;
        }

        // Add a smoothing factor for the transition
        if (orb.currentX === 0) orb.currentX = idealX; // initial
        
        // Move towards ideal smoothly
        orb.currentX += (idealX - orb.currentX) * (isFiltered && orb.type === filter ? 0.08 : 0.05);
        orb.currentY += (idealY - orb.currentY) * (isFiltered && orb.type === filter ? 0.08 : 0.05);
      });

      // 2. Pair-wise iterative physical repulsion to guarantee NO overlapping of nodes
      const minDistance = isMobile ? 75 : 100; // safe threshold to prevent overlapping of logos and tags
      const repulsionIterations = 5; // multiple passes ensures high stability under structural stress

      for (let iter = 0; iter < repulsionIterations; iter++) {
        // Prevent overlap with central core first
        const minCoreDistance = isMobile ? 95 : 140;
        const actualCoreX = coreX + centerShiftX;
        for (let i = 0; i < orbits.length; i++) {
          const dx = orbits[i].currentX - actualCoreX;
          const dy = orbits[i].currentY - coreY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < minCoreDistance && dist > 1) {
            const overlap = minCoreDistance - dist;
            orbits[i].currentX += (dx / dist) * overlap;
            orbits[i].currentY += (dy / dist) * overlap;
          }
        }
        
        // Repulsion from the top-right text area (Bounding Box)
        const textMinX = width - (isMobile ? 320 : 520);
        const textMaxY = isMobile ? 180 : 250;
        
        for (let i = 0; i < orbits.length; i++) {
           if (orbits[i].currentX > textMinX && orbits[i].currentY < textMaxY) {
              const overlapX = orbits[i].currentX - textMinX;
              const overlapY = textMaxY - orbits[i].currentY;
              
              if (overlapX < overlapY) {
                 orbits[i].currentX -= overlapX * 0.3; // push left
              } else {
                 orbits[i].currentY += overlapY * 0.3; // push down
              }
           }
        }
        
        // Keep within screen bounds
        const padding = isMobile ? 50 : 80;
        for (let i = 0; i < orbits.length; i++) {
           if (orbits[i].currentX < padding) orbits[i].currentX += (padding - orbits[i].currentX) * 0.3;
           if (orbits[i].currentX > width - padding) orbits[i].currentX -= (orbits[i].currentX - (width - padding)) * 0.3;
           if (orbits[i].currentY < padding) orbits[i].currentY += (padding - orbits[i].currentY) * 0.3;
           if (orbits[i].currentY > height - padding) orbits[i].currentY -= (orbits[i].currentY - (height - padding)) * 0.3;
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
      
      const renderCoreX = coreX + centerShiftX;
      drawLines(renderCoreX);

      // Draw faint orbit paths

      ctx!.beginPath();
      ctx!.ellipse(renderCoreX, coreY, orbitConfig.supplierRadius, orbitConfig.supplierRadius * 0.9, 0, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(194, 167, 125, 0.06)';
      ctx!.lineWidth = 1;
      ctx!.stroke();
      
      ctx!.beginPath();
      ctx!.ellipse(renderCoreX, coreY, orbitConfig.partnerRadius, orbitConfig.partnerRadius * 0.9, 0, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(194, 167, 125, 0.04)';
      ctx!.stroke();

      ctx!.beginPath();
      ctx!.ellipse(renderCoreX, coreY, orbitConfig.projectRadius, orbitConfig.projectRadius * 0.9, 0, 0, Math.PI * 2);
      ctx!.strokeStyle = 'rgba(194, 167, 125, 0.02)';
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

      {/* Filter Menu */}
      <div className="absolute top-10 left-6 lg:left-10 z-50 flex flex-col items-start gap-2">
         <button 
           onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
           className={`w-12 h-12 flex items-center justify-center rounded-xl backdrop-blur-md border transition-all duration-300 shadow-lg ${isFilterMenuOpen ? 'bg-soft-gold text-charcoal-dark border-soft-gold' : 'bg-charcoal-dark/70 text-ivory border-white/10 hover:border-soft-gold/50'}`}
         >
           {isFilterMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
         </button>

         <AnimatePresence>
            {isFilterMenuOpen && (
               <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="flex flex-col bg-charcoal-dark/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl min-w-[200px]"
               >
                  <button 
                     onClick={() => setActiveFilter('all')}
                     className={`text-right px-5 py-3 text-sm transition-colors border-b border-white/5 ${activeFilter === 'all' ? 'text-soft-gold bg-white/5 font-medium' : 'text-ivory hover:bg-white/5'}`}
                  >
                     همه موارد
                  </button>
                  <button 
                     onClick={() => setActiveFilter('project')}
                     className={`text-right px-5 py-3 text-sm transition-colors border-b border-white/5 ${activeFilter === 'project' ? 'text-soft-gold bg-white/5 font-medium' : 'text-ivory hover:bg-white/5'}`}
                  >
                     پروژه‌های اجرایی
                  </button>
                  <button 
                     onClick={() => setActiveFilter('partner')}
                     className={`text-right px-5 py-3 text-sm transition-colors border-b border-white/5 ${activeFilter === 'partner' ? 'text-soft-gold bg-white/5 font-medium' : 'text-ivory hover:bg-white/5'}`}
                  >
                     همکاران استراتژیک
                  </button>
                  <button 
                     onClick={() => setActiveFilter('supplier')}
                     className={`text-right px-5 py-3 text-sm transition-colors ${activeFilter === 'supplier' ? 'text-soft-gold bg-white/5 font-medium' : 'text-ivory hover:bg-white/5'}`}
                  >
                     تامین‌کنندگان منابع
                  </button>
                  <div className="border-t border-white/10 px-4 py-3 flex items-center justify-between gap-2 bg-black/20">
                     <button 
                        onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2.5))}
                        className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg text-ivory hover:text-soft-gold hover:bg-white/10 transition-colors"
                        title="بزرگ‌نمایی"
                     >
                        <ZoomIn className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => setZoomLevel(1)}
                        className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg text-ivory hover:text-soft-gold hover:bg-white/10 transition-colors"
                        title="اندازه اصلی"
                     >
                        <Maximize className="w-5 h-5" />
                     </button>
                     <button 
                        onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.4))}
                        className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg text-ivory hover:text-soft-gold hover:bg-white/10 transition-colors"
                        title="کوچک‌نمایی"
                     >
                        <ZoomOut className="w-5 h-5" />
                     </button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

      {/* Main Orbit Area */}
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
          
          let nodeShapeClass = '';
          let imgShapeClass = '';
          let sizeClass = '';
          let borderClass = '';

          if (entity.type === 'supplier') {
             nodeShapeClass = 'rounded-full';
             imgShapeClass = 'rounded-full';
             sizeClass = 'w-12 h-12 md:w-14 md:h-14';
             borderClass = 'border-soft-gold/30 border-[1px]';
          } else if (entity.type === 'partner') {
             nodeShapeClass = 'rounded-2xl';
             imgShapeClass = 'rounded-2xl';
             sizeClass = 'w-14 h-14 md:w-16 md:h-16';
             borderClass = 'border-soft-gold/60 border-[2px]';
          } else {
             // Project
             nodeShapeClass = 'rounded-lg';
             imgShapeClass = 'rounded-lg';
             sizeClass = 'w-16 h-16 md:w-20 md:h-20';
             borderClass = 'border-soft-gold border-[2px]';
          }

          return (
             <div
                key={entity.id}
                ref={el => nodesRef.current[i] = el}
                className="absolute z-30 cursor-pointer pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group"
                onClick={(e) => {
                  e.stopPropagation();
                  // CLICK DISABLED - Temporarily removed setSelectedEntity
                  // setSelectedEntity(entity);
                  console.log('Node clicked - disabled'); // Optional debug
                }}
             >
                {/* Glow Ring on Hover */}
                <div className="absolute inset-0 rounded-full bg-soft-gold/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
                
                <div className={`
                    relative z-10
                    ${sizeClass} ${nodeShapeClass} ${borderClass}
                    flex flex-col items-center justify-center 
                    bg-charcoal-dark/95 backdrop-blur-xl
                    shadow-[0_0_15px_rgba(194,167,125,0.15)] transition-all duration-700 ease-out
                    hover:scale-110 hover:border-amber-400 hover:bg-soft-black hover:shadow-[0_0_40px_rgba(251,191,36,0.5)]
                    overflow-hidden
                    ${activeFilter !== 'all' && activeFilter !== entity.type ? 'opacity-30 scale-75 grayscale blur-[2px]' : 'opacity-100 scale-100 grayscale-0 blur-0'}
                `}>
                   {entity.logoUrl ? (
                     <img src={entity.logoUrl} alt={entity.name} className={`w-full h-full object-cover p-1 opacity-90 mix-blend-screen bg-white transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100 ${imgShapeClass}`} />
                   ) : (
                     <span className="font-en text-lg text-soft-gold drop-shadow-md">{entity.logoInitial}</span>
                   )}
                </div>
                {/* Node Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-4 py-1.5 bg-charcoal-dark/95 backdrop-blur-xl rounded-full border border-soft-gold/40 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-40 hidden md:flex items-center gap-2 translate-y-2 group-hover:translate-y-0 shadow-xl">
                  <span className="w-1.5 h-1.5 rounded-full bg-soft-gold animate-pulse"></span>
                  <span className="text-xs text-white font-medium drop-shadow-sm tracking-wide">{entity.name}</span>
                </div>
             </div>
          )
        })}

        {/* Central Core Element */}
        <div 
          className={`absolute top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeFilter !== 'all' ? 'left-[35%]' : 'left-1/2'}`}
          onClick={() => {
            // CLICK DISABLED - Temporarily removed setSelectedEntity
            // setSelectedEntity({
            //   id: 'core', type: 'partner', name: 'هسته معماری هورکا', logoInitial: 'C',
            //   description: 'هسته مرکزی شبکه همکاران. مدیریت استراتژیک و توسعه پروژه‌ها در حوزه خوراک و نوشیدنی با رویکرد نوآورانه. تمامی این شبکه به صورت ارگانیک با محوریت هسته مرکزی مدیریت و توزیع ارزش می‌گردد.',
            //   activities: ['استراتژی کلان توسعه بین‌الملل', 'تزریق کیفیت و هم‌افزایی ارزش میان اعضا'], connections: [], images: []
            // })
            console.log('Core clicked - disabled'); // Optional debug
          }}
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

      {/* Dossier Modal Overlay - DISABLED TEMPORARILY */}
      {/* 
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
                    <div className="flex flex-wrap items-center gap-3 mt-3">
                       <div className="flex items-center gap-1.5 bg-ivory-dark px-3 py-1 rounded-full border border-gray-light">
                          {getRoleIcon(selectedEntity.type)}
                          <span className="text-gray-dark text-xs md:text-sm font-medium">{getTypeLabel(selectedEntity.type)}</span>
                       </div>
                       
                       {selectedEntity.location && (
                          <div className="flex items-center gap-1.5 bg-ivory-dark px-3 py-1 rounded-full border border-gray-light">
                             <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-soft-black opacity-60" />
                             <span className="text-gray-dark text-xs md:text-sm">{selectedEntity.location}</span>
                          </div>
                       )}
                       {selectedEntity.year && (
                          <div className="flex items-center gap-1.5 bg-ivory-dark px-3 py-1 rounded-full border border-gray-light">
                             <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-soft-black opacity-60" />
                             <span className="font-en text-gray-dark text-xs md:text-sm">{selectedEntity.year}</span>
                          </div>
                       )}
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

              <div className="p-6 md:p-10 flex flex-col gap-10">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start justify-between">
                    <p className="text-soft-black leading-relaxed font-light text-base md:text-lg lg:w-2/3">
                      {selectedEntity.description}
                    </p>
                    <div className="flex flex-wrap gap-3 lg:w-1/3 lg:justify-end">
                      {selectedEntity.website && (
                        <a 
                          href={selectedEntity.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-charcoal-dark font-medium rounded-full hover:bg-soft-gold hover:text-white transition-all duration-300 border border-gray-light shadow-sm"
                        >
                          <Globe className="w-4 h-4" />
                          <span className="text-sm">وب‌سایت رسمی</span>
                          <ExternalLink className="w-3.5 h-3.5 opacity-50 mr-1" />
                        </a>
                      )}
                      {selectedEntity.instagram && (
                        <a 
                          href={selectedEntity.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-charcoal-dark font-medium rounded-full hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300 border border-gray-light shadow-sm"
                        >
                          <Instagram className="w-4 h-4" />
                          <span className="font-en text-sm mt-0.5 tracking-wide">Instagram</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {selectedEntity.activities && selectedEntity.activities.length > 0 && (
                    <div className="bg-ivory-dark/50 p-6 md:p-8 rounded-3xl border border-gray-light shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="w-1.5 h-6 bg-soft-gold rounded-full"></div>
                         <h4 className="text-soft-black font-semibold text-lg">
                           {selectedEntity.type === 'project' ? 'اقدامات انجام شده' : 'حوزه فعالیت و راهکارها'}
                         </h4>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {selectedEntity.activities.map((activity, idx) => (
                           <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-white hover:border-soft-gold/30 transition-colors shadow-sm">
                              <div className="w-6 h-6 rounded-full bg-soft-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                                 <CheckCircle2 className="w-3.5 h-3.5 text-soft-gold" />
                              </div>
                              <span className="text-charcoal-dark text-sm leading-snug">{activity}</span>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedEntity.connections && selectedEntity.connections.length > 0 && (
                     <div className="bg-charcoal border border-soft-gold/20 p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-soft-gold/10 blur-3xl rounded-full"></div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                           <div className="w-1.5 h-6 bg-soft-gold rounded-full"></div>
                           <h4 className="text-ivory font-medium text-lg">
                              اشتراکات شبکه و مشارکت‌ها
                           </h4>
                        </div>
                        <div className="flex flex-col gap-3 relative z-10 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                           {selectedEntity.connections.map(connId => {
                              const conn = displayEntities.find(n => n.id === connId);
                              if (!conn) return null;
                              return (
                                 <div key={connId} className="group flex items-center gap-4 bg-white/5 p-3 rounded-2xl border border-white/5 hover:border-soft-gold/30 hover:bg-white/10 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-soft-black flex items-center justify-center shrink-0 border border-soft-gold/20 p-1 group-hover:scale-105 transition-transform duration-300">
                                       {conn.logoUrl ? (
                                          <img src={conn.logoUrl} alt={conn.name} className="w-full h-full object-cover mix-blend-screen rounded-full" />
                                       ) : (
                                          <span className="font-en text-sm text-soft-gold font-bold">{conn.logoInitial}</span>
                                       )}
                                    </div>
                                    <div className="flex flex-col flex-1">
                                      <span className="text-ivory font-medium text-sm group-hover:text-soft-gold transition-colors">{conn.name}</span>
                                      <span className="text-gray-400 text-xs mt-0.5">{getTypeLabel(conn.type)}</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:text-soft-gold group-hover:border-soft-gold/50 transition-all shrink-0">
                                       <Activity className="w-3.5 h-3.5" />
                                    </div>
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                  )}
                </div>

                {selectedEntity.images && selectedEntity.images.length > 0 && (
                   <div className="mt-2 pt-8 border-t border-gray-light/60">
                     <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 rounded-full bg-soft-gold/10 flex items-center justify-center">
                           <ZoomIn className="w-4 h-4 text-soft-gold" />
                        </div>
                        <h4 className="text-soft-black font-semibold text-xl leading-none tracking-tight">گالری تصاویر و مستندات</h4>
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                       {selectedEntity.images.map((img, idx) => (
                         <div key={idx} className={`relative aspect-[4/3] bg-gray-light overflow-hidden group isolate rounded-2xl shadow-sm cursor-zoom-in ${idx === 0 && selectedEntity.images.length === 1 ? 'sm:col-span-2 lg:col-span-3 aspect-[16/7]' : ''}`}>
                           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                           <img src={img} alt={`${selectedEntity.name} تصویر ${idx+1}`} className="w-full h-full object-cover filter saturate-[0.85] group-hover:saturate-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out" />
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
      */}
    </section>
  );
}