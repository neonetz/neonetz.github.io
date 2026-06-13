import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fake progress loading sequence for optimal sci-fi feel
    const intervals = [
      { p: 12, delay: 200 },
      { p: 47, delay: 500 },
      { p: 73, delay: 900 },
      { p: 89, delay: 1200 },
      { p: 100, delay: 1500 }
    ];

    intervals.forEach(({ p, delay }) => {
      setTimeout(() => setProgress(p), delay);
    });

    // Remove loading screen after 100% is reached + a tiny buffer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative Background Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-20 grid-pattern" />

          <div className="relative z-10 w-full max-w-sm px-8 flex flex-col items-center">
            
            {/* Logo */}
            <motion.div 
              className="w-16 h-16 bg-accent-yellow cut-corner-sm flex items-center justify-center mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-black font-black text-4xl leading-none">N</span>
            </motion.div>

            {/* Terminal Text */}
            <div className="w-full mb-3 flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-accent-teal font-mono text-[0.65rem] tracking-[0.3em] uppercase mb-1">
                  System Boot Sequence
                </span>
                <span className="text-text-primary font-black uppercase tracking-widest text-sm">
                  NEONETZ_OS v2.0
                </span>
              </div>
              <span className="text-accent-yellow font-mono text-xl font-bold">
                {progress.toString().padStart(3, '0')}%
              </span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-1.5 bg-bg-tertiary relative overflow-hidden cut-corner-xs">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-accent-yellow"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>

            {/* Terminal logs simulating loading processes */}
            <div className="w-full mt-6 h-12 overflow-hidden text-[0.55rem] font-mono text-text-muted uppercase tracking-widest leading-relaxed">
              {progress < 20 && <p>&#62; Establishing secure connection...</p>}
              {progress >= 20 && progress < 50 && <p>&#62; Loading user configuration matrix...</p>}
              {progress >= 50 && progress < 80 && <p>&#62; Initializing WebGL orbital engine...</p>}
              {progress >= 80 && progress < 100 && <p>&#62; Bypassing firewall protocols...</p>}
              {progress === 100 && <p className="text-accent-teal">&#62; Access granted. Welcome.</p>}
            </div>

          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-white/10" />
          <div className="absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-white/10" />
          <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-white/10" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-white/10" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
