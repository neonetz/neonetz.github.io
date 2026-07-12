import { Navbar } from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
import { Noise } from './components/layouts/Noise';
import { Hero } from './features/hero/Hero';
import { Projects } from './features/projects/Projects';
import { About } from './features/about/About';
import { Skills } from './features/skills/Skills';
import { Contact } from './features/contact/Contact';

function App() {
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
