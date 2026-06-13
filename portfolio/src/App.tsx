import { Navbar } from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
import { Hero } from './features/hero/Hero';
import { Projects } from './features/projects/Projects';
import { About } from './features/about/About';
import { Skills } from './features/skills/Skills';
import { Contact } from './features/contact/Contact';

function App() {
  return (
    <div className="bg-bg-primary text-text-primary h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      <Navbar />
      <main>
        <div className="snap-start snap-always w-full min-h-screen">
          <Hero />
        </div>
        <div className="snap-start snap-always w-full min-h-screen">
          <Projects />
        </div>
        <div className="snap-start snap-always w-full min-h-screen bg-bg-secondary">
          <About />
        </div>
        <div className="snap-start snap-always w-full min-h-screen">
          <Skills />
        </div>
        <div className="snap-start snap-always w-full min-h-screen">
          <Contact />
        </div>
      </main>
      <div className="snap-start snap-always w-full">
        <Footer />
      </div>
    </div>
  );
}

export default App;
