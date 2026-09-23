'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About';
import CodePhilosophy from '@/components/CodePhilosophy';
import Services from '@/components/Services';
import Journey from '@/components/Journey';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import AnimeBackground from '@/components/AnimeBackground';

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
        <CodePhilosophy />
        <Services />
        <Journey />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
