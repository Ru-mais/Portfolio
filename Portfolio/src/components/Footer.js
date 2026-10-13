'use client';
import { openResumeModal } from '@/components/ResumeModal';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer id="colophon" className="w-full border-t border-textMain/10 bg-[#EAE8E1]/80 backdrop-blur-md py-12 px-6 md:px-12 relative z-20">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Brand & Telemetry */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500] animate-pulse"></span>
            <span className="font-mono text-xs font-bold tracking-widest uppercase text-textMain">
              RUMAIS P P // ATELIER
            </span>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-wider text-textSecondary opacity-80">
            Full-Stack Software Engineer & Shopify Theme Specialist • Kerala, India
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs uppercase tracking-widest text-textSecondary">
          <button
            type="button"
            onClick={openResumeModal}
            className="hover:text-[#FF5500] transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1.5"
          >
            <span>Dossier</span>
            <span className="text-[10px] text-[#FF5500]">[ 👁 ]</span>
          </button>

          <a
            href="https://github.com/Ru-mais"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF5500] transition-colors no-underline"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/rumais-pp-"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FF5500] transition-colors no-underline"
          >
            LinkedIn
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-[#FF5500] transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1 text-textMain"
            title="Scroll to top of document"
          >
            <span>Top</span>
            <span>↑</span>
          </button>
        </div>

        {/* System Spec & Copyright */}
        <div className="text-center md:text-right font-mono text-[10px] uppercase tracking-widest text-textSecondary opacity-70">
          <div>Next.js 16 • Turbopack • GSAP</div>
          <div className="mt-1">© {new Date().getFullYear()} Rumais P P. All Rights Reserved.</div>
        </div>

      </div>
    </footer>
  );
}
