import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from './hooks/useLenis';
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
    <div className="hw-root">
      <Noise />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <div className="hw-frame" aria-hidden />
    </div>
  );
}

export default App;
