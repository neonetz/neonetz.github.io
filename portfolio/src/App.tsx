import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { BackToTop } from './components/ui/BackToTop';
import { Navbar } from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
import { Noise } from './components/layouts/Noise';
import { Hero } from './features/hero/Hero';
import { Projects } from './features/projects/Projects';
import { About } from './features/about/About';
import { Skills } from './features/skills/Skills';
import { Contact } from './features/contact/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useLenis();

  return (
    <ErrorBoundary>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <div className="hw-root">
        <Noise />
        <Navbar />
        <main id="main-content">
          <Hero />
          <div className="hw-paper">
            <Projects />
            <About />
            <Skills />
          </div>
          <Contact />
        </main>
        <Footer />
        <BackToTop />
        <div className="hw-frame" aria-hidden />
      </div>
    </ErrorBoundary>
  );
}

export default App;
