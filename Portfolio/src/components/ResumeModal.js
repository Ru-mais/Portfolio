'use client';
import { useState, useEffect } from 'react';
import { site } from '@/data/site';

export const openResumeModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-resume-modal'));
  }
};

export const closeResumeModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('close-resume-modal'));
  }
};

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setIsPdfLoaded(false);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'hidden';
      }
    };

    const handleClose = () => {
      setIsOpen(false);
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('open-resume-modal', handleOpen);
    window.addEventListener('close-resume-modal', handleClose);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-resume-modal', handleOpen);
      window.removeEventListener('close-resume-modal', handleClose);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      id="resume-modal-overlay"
      className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-[#19191B]/80 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Resume Dossier Preview"
      onClick={() => closeResumeModal()}
    >
      <div 
        className="w-full max-w-[1100px] h-full max-h-[92vh] bg-[#F4F3ED] text-[#19191B] rounded-[24px] md:rounded-[32px] border border-[#19191B]/15 shadow-2xl flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dossier Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8 md:py-5 border-b border-[#19191B]/10 bg-[#EAE8E1]/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] shadow-[0_0_8px_#FF5500] animate-pulse"></span>
            <div>
              <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-[#FF5500] uppercase font-bold">
                [ SPECIFICATION DOSSIER // CURRICULUM VITAE ]
              </p>
              <h3 className="font-syne text-base md:text-xl font-bold uppercase tracking-tight text-[#19191B]">
                Rumais P P — Full-Stack & Shopify Developer
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3 ml-auto">
            <a
              href={site.resumePath}
              download="Rumais_PP_Resume.pdf"
              className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#19191B] text-[#EAE8E1] hover:bg-[#FF5500] hover:text-white rounded-md font-mono text-[10px] md:text-xs uppercase tracking-wider transition-all duration-200 no-underline"
              title="Download PDF"
            >
              <span>Download PDF</span>
              <span>↓</span>
            </a>

            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 bg-transparent text-[#19191B] border border-[#19191B]/20 hover:border-[#19191B]/50 hover:bg-black/5 rounded-md font-mono text-[10px] md:text-xs uppercase tracking-wider transition-all duration-200 no-underline"
              title="Open PDF in new browser tab"
            >
              <span>New Tab</span>
              <span>↗</span>
            </a>

            <button
              type="button"
              onClick={() => closeResumeModal()}
              className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-black/5 hover:bg-[#FF5500] hover:text-white text-[#19191B] transition-colors border-none cursor-pointer text-xl leading-none"
              aria-label="Close Resume Preview"
            >
              ×
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full h-full relative bg-[#E5E3DC] overflow-hidden flex flex-col">
          {!isPdfLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#19191B]/60 font-mono text-xs uppercase tracking-widest pointer-events-none z-10">
              <div className="w-8 h-8 border-2 border-[#FF5500] border-t-transparent rounded-full animate-spin"></div>
              <span>Streaming Dossier Telemetry...</span>
            </div>
          )}

          <iframe
            src={`${site.resumePath}#toolbar=0&navpanes=0&scrollbar=1`}
            className="w-full h-full border-none flex-1 z-20"
            title="Rumais P P — Resume Dossier"
            onLoad={() => setIsPdfLoaded(true)}
          />

          {/* Mobile Fallback Bar */}
          <div className="sm:hidden px-4 py-2.5 bg-[#EAE8E1] border-t border-[#19191B]/10 flex items-center justify-between text-[11px] font-mono text-[#19191B]/80">
            <span>Viewing on mobile?</span>
            <a
              href={site.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF5500] font-bold underline"
            >
              Open Full PDF ↗
            </a>
          </div>
        </div>

        {/* Dossier Footer Info */}
        <div className="px-6 py-3 md:px-8 md:py-3.5 border-t border-[#19191B]/10 bg-[#EAE8E1]/90 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] md:text-xs text-[#19191B]/70">
          <div className="flex items-center gap-4">
            <span>LOC: KERALA, INDIA</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">EXP: FULL-STACK & SHOPIFY ATELIER</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[#FF5500] font-bold">STATUS: PRODUCTION READY</span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="text-[10px] uppercase tracking-wider text-[#19191B]/60">
              Press [ESC] to Dismiss
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
