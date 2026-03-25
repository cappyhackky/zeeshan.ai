import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#050509] text-slate-200 noise">
      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Sticky nav */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#00D9FF]/15 to-transparent mx-8" />

        <About />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-8" />

        <Skills />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-8" />

        <Experience />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-8" />

        <Projects />

        <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent mx-8" />

        <Education />

        <div className="h-px bg-gradient-to-r from-transparent via-[#00D9FF]/10 to-transparent mx-8" />

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
