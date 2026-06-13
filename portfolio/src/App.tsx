import { Navbar } from './components/layouts/Navbar';
import { Footer } from './components/layouts/Footer';
import { Hero } from './features/hero/Hero';
import { Projects } from './features/projects/Projects';
import { About } from './features/about/About';
import { Contact } from './features/contact/Contact';

function App() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
