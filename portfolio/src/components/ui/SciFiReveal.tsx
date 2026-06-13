import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function SciFiReveal({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <div className="relative overflow-hidden w-fit">
      {/* The main content that slides in and unblurs */}
      <motion.div
        initial={{ y: "100%", opacity: 0, filter: 'blur(5px)' }}
        whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: delay + 0.1 }}
      >
        {children}
      </motion.div>
      
      {/* Sci-Fi Scanner block that sweeps over the text */}
      <motion.div
        className="absolute inset-0 bg-accent-teal z-20 pointer-events-none mix-blend-screen"
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeInOut", delay }}
      />
    </div>
  );
}
