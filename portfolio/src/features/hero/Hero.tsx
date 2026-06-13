import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { profile } from '../../data/portfolio';

export function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        poster="/img/logo.jpeg"
      >
        {/* Placeholder Sci-Fi / Tech Video from Pixabay (Free for use) */}
        <source src="https://cdn.pixabay.com/video/2020/05/25/40139-424564883_large.mp4" type="video/mp4" />
      </video>

      {/* Grid Overlay & Vignette */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-transparent opacity-50" />

      {/* Content */}
      <div className="relative w-full z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Tactical Label */}
        <motion.div
          className="mb-6 flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-12 h-[2px] bg-accent-yellow" />
          <span className="font-mono text-accent-yellow text-sm tracking-[0.3em] uppercase">
            Protocol: Active
          </span>
          <div className="w-12 h-[2px] bg-accent-yellow" />
        </motion.div>

        {/* Main Title (Logo Area) */}
        <motion.h1
          className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-none mb-4 text-text-primary drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          {profile.name.split(' ')[0]}
        </motion.h1>
        <motion.h2
          className="text-2xl md:text-4xl font-bold text-text-secondary tracking-[0.2em] uppercase mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {profile.role}
        </motion.h2>

        {/* Big Yellow Button (Endfield Style) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button 
            variant="primary" 
            size="lg"
            className="!bg-accent-yellow !text-black hover:!bg-white border-none shadow-[0_0_20px_rgba(240,200,8,0.4)] text-xl !px-16 !py-5"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            INITIALIZE
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center"
          >
            <span className="text-xs font-mono uppercase tracking-widest mb-2">Scroll Down</span>
            <ChevronDown className="w-6 h-6 text-accent-yellow opacity-70" />
            <ChevronDown className="w-6 h-6 text-accent-yellow opacity-30 -mt-3" />
          </motion.div>
        </motion.div>
      </div>

      {/* Frame Decals */}
      <div className="absolute top-8 left-8 border-l-4 border-t-4 border-white/20 w-16 h-16 pointer-events-none" />
      <div className="absolute top-8 right-8 border-r-4 border-t-4 border-white/20 w-16 h-16 pointer-events-none" />
      <div className="absolute bottom-8 left-8 border-l-4 border-b-4 border-white/20 w-16 h-16 pointer-events-none" />
      <div className="absolute bottom-8 right-8 border-r-4 border-b-4 border-white/20 w-16 h-16 pointer-events-none" />
    </section>
  );
}
