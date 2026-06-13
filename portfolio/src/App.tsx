import { lazy, Suspense } from 'react';
import { Sidebar } from './components/layouts/Sidebar';
import { Footer } from './components/layouts/Footer';
import { Hero } from './features/hero/Hero';
import { Projects } from './features/projects/Projects';
import { About } from './features/about/About';
import { Skills } from './features/skills/Skills';
import { Contact } from './features/contact/Contact';
import { LoadingScreen } from './components/ui/LoadingScreen';

// Lazy load the heaviest component (Three.js/Fiber) to split the bundle size
const TechCloud3D = lazy(() => import('./features/skills/TechCloud3D').then(m => ({ default: m.TechCloud3D })));

function Marquee() {
  return (
    <div className="w-full bg-accent-yellow text-black py-2 overflow-hidden flex whitespace-nowrap border-t border-b border-accent-yellow/50">
      <div className="animate-[marquee_20s_linear_infinite] flex items-center font-black font-mono text-sm tracking-[0.3em] uppercase">
        {Array(20).fill('// NEONETZ ').map((text, i) => (
          <span key={i} className="mx-4">{text}</span>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <LoadingScreen />
      <div className="bg-bg-primary text-text-primary min-h-screen overflow-x-hidden scroll-smooth flex">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-20 flex flex-col w-full md:w-[calc(100%-5rem)]">
        <main>
          <div className="w-full min-h-screen">
            <Hero />
          </div>
          <div className="w-full min-h-screen">
            <Projects />
          </div>
          <div className="w-full min-h-screen bg-bg-secondary">
            <About />
          </div>
          <div className="w-full min-h-screen">
            <Skills />
          </div>
          <div className="w-full">
            <Suspense fallback={<div className="w-full h-screen bg-[#08080A] flex items-center justify-center text-accent-yellow font-mono text-sm tracking-widest">INITIALIZING 3D ENGINE...</div>}>
              <TechCloud3D />
            </Suspense>
          </div>
          <div className="w-full min-h-screen">
            <Contact />
          </div>
        </main>
        
        <Marquee />
        
        <div className="w-full">
          <Footer />
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
