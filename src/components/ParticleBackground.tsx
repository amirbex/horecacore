import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrameId: number;
    let time = 0;

    const isMobile = window.innerWidth < 768;
    const properties = {
      particleColor: 'rgba(255, 215, 0, 0.45)', // Richer gold 
      particleRadius: 1.5,
      particleCount: isMobile ? 30 : 70,
      lineLength: isMobile ? 120 : 180,
      particleSpeed: 0.25,
      coreAttractRadius: isMobile ? 150 : 250,
    };

    class Particle {
      x: number;
      y: number;
      velocityX: number;
      velocityY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.velocityX = Math.random() * (properties.particleSpeed * 2) - properties.particleSpeed;
        this.velocityY = Math.random() * (properties.particleSpeed * 2) - properties.particleSpeed;
      }

      position() {
        if ((this.x + this.velocityX > width && this.velocityX > 0) || (this.x + this.velocityX < 0 && this.velocityX < 0)) {
          this.velocityX *= -1;
        }
        if ((this.y + this.velocityY > height && this.velocityY > 0) || (this.y + this.velocityY < 0 && this.velocityY < 0)) {
          this.velocityY *= -1;
        }
        this.x += this.velocityX;
        this.y += this.velocityY;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = properties.particleColor;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < properties.particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      const coreX = width / 2;
      const coreY = height / 2;
      
      // Connection variables
      let x1, y1, x2, y2, length, opacity;
      
      // 1. Particle to Particle
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          x1 = particles[i].x;
          y1 = particles[i].y;
          x2 = particles[j].x;
          y2 = particles[j].y;
          length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

          if (length < properties.lineLength) {
            opacity = 1 - length / properties.lineLength;
            ctx.lineWidth = 0.6;
            ctx.strokeStyle = `rgba(197, 160, 89, ${opacity * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }

      // 2. Particle to Core (Pulsing connection)
      const pulseRadius = properties.coreAttractRadius + Math.sin(time * 0.05) * 20;
      
      for (let i = 0; i < particles.length; i++) {
         const distToCore = Math.hypot(particles[i].x - coreX, particles[i].y - coreY);
         
         if (distToCore < pulseRadius) {
            opacity = 1 - (distToCore / pulseRadius);
            // More intense lines near the core
            ctx.lineWidth = 0.8;
            ctx.strokeStyle = `rgba(255, 215, 0, ${opacity * 0.5})`; // Brighter gold
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(coreX, coreY);
            ctx.stroke();
            ctx.closePath();
         }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 1;
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].position();
        particles[i].draw();
      }
      
      drawLines();
      
      // Faint central core glow
      const cx = width / 2;
      const cy = height / 2;
      ctx.beginPath();
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 200 + Math.sin(time*0.02)*30);
      grad.addColorStop(0, 'rgba(197, 160, 89, 0.08)');
      grad.addColorStop(1, 'rgba(197, 160, 89, 0)');
      ctx.fillStyle = grad;
      ctx.arc(cx, cy, 250, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    handleResize();
    animate();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
}
