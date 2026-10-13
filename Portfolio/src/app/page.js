'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Experience from '@/components/Experience';
import CodePhilosophy from '@/components/CodePhilosophy';
import Services from '@/components/Services';
import Journey from '@/components/Journey';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import AnimeBackground from '@/components/AnimeBackground';
import ResumeModal from '@/components/ResumeModal';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div id="main-wrapper">
      <AnimeBackground />
      <Header />
      <main id="main-content">
        <Hero />
        <Projects />
        <About />
        <Experience />
        <CodePhilosophy />
        <Services />
        <Journey />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ResumeModal />
    </div>
  );
}
