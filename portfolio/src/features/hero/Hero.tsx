import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { profile } from '../../data/portfolio';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const chars = '0123456789ABCDEF!@#$%^&*¥£€'.split('');
    const fontSize = 14;
    const cols = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(cols)).fill(0).map(() => Math.random() * -100);

    let id: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(13, 13, 17, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.9 ? '#ffffff' : '#145c66';
        if (Math.random() > 0.995) ctx.fillStyle = '#f0c808';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(id); };
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/50 via-transparent to-bg-primary" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        
        {/* Status */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-8 h-px bg-accent-yellow/50" />
          <span className="text-label">System Online — Ready</span>
          <div className="w-8 h-px bg-accent-yellow/50" />
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {profile.name.split(' ')[0]}
          <br />
          <span className="text-text-secondary font-bold">{profile.name.split(' ').slice(1).join(' ')}</span>
        </motion.h1>

        {/* Role */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="w-12 h-px bg-accent-teal" />
          <p className="text-sm sm:text-base font-mono text-accent-teal tracking-[0.3em] uppercase">
            {profile.role}
          </p>
          <div className="w-12 h-px bg-accent-teal" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-text-muted text-sm sm:text-base max-w-lg mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {profile.tagline}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline"
          >
            Contact Me
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-label text-[10px]">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5 text-accent-yellow" />
        </motion.div>
      </motion.div>

      {/* Corner frame */}
      <div className="absolute top-6 left-6 w-10 h-10 border-l border-t border-white/10" />
      <div className="absolute top-6 right-6 w-10 h-10 border-r border-t border-white/10" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-l border-b border-white/10" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-r border-b border-white/10" />
    </section>
  );
}
