'use client';
import { useState } from 'react';
import { services } from '@/data/info';

export default function Services() {
  const [openService, setOpenService] = useState(null);

  const toggleService = (id) => {
    if (openService === id) {
      setOpenService(null);
    } else {
      setOpenService(id);
    }
  };

  return (
    <section id="services" className="py-32">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <p className="font-mono text-xs font-bold tracking-[0.3em] text-secondary uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-secondary"></span>
              04 // CAPABILITIES & DISCIPLINES
            </p>
            <h2 className="font-syne text-4xl md:text-6xl uppercase font-bold tracking-tighter text-primary">
              What I Specialize In
            </h2>
          </div>
          <p className="font-jakarta text-textSecondary font-light text-base md:text-lg max-w-md leading-relaxed">
            Architecting immersive web experiences, integrating intelligent machine learning logic, and engineering digital growth at scale.
          </p>
        </div>

        {/* Premium Interactive List */}
        <div className="flex flex-col w-full border-t border-glass-border relative">
          {services.map((service) => {
            const isOpen = openService === service.id;
            
            return (
              <div 
                key={service.id} 
                onClick={() => toggleService(service.id)}
                className="group relative w-full border-b border-glass-border py-12 md:py-16 flex flex-col justify-center hover:bg-surface/10 transition-colors duration-700 overflow-hidden cursor-pointer"
              >
                
                {/* Massive Background Watermark */}
                <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-12 text-[100px] md:text-[180px] font-syne font-black text-black/[0.02] dark:text-white/[0.02] opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none select-none">
                  0{service.id}
                </div>

                {/* Title & Index */}
                <div className="flex flex-row items-center justify-between z-10 w-full pr-2 md:pr-8">
                  <div className="flex flex-row items-center gap-6 md:gap-12">
                    <span className="font-mono text-sm font-bold text-secondary tracking-[0.2em] shrink-0">
                      [ 0{service.id} ]
                    </span>
                    <h3 className={`font-syne text-2xl sm:text-3xl md:text-5xl uppercase font-bold tracking-tighter transition-all duration-500 ease-[cubic-bezier(0.2,0,0,1)] ${isOpen ? 'text-[#FF7A00] translate-x-4' : 'text-primary group-hover:text-[#FF7A00] group-hover:translate-x-2'}`}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Elegant +/- Toggle Icon */}
                  <div className="relative w-6 h-6 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <div className={`absolute w-full h-[2px] transition-transform duration-500 ${isOpen ? 'bg-[#FF7A00] rotate-180' : 'bg-textSecondary group-hover:bg-[#FF7A00] rotate-0'}`}></div>
                    <div className={`absolute w-full h-[2px] transition-transform duration-500 ${isOpen ? 'bg-[#FF7A00] rotate-180 opacity-0' : 'bg-textSecondary group-hover:bg-[#FF7A00] rotate-90'}`}></div>
                  </div>
                </div>
                
                {/* Expandable Description (Click Animation) */}
                <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] w-full z-10 ${isOpen ? 'grid-rows-[1fr] mt-8' : 'grid-rows-[0fr] mt-0'}`}>
                  <div className="overflow-hidden">
                    <div className="md:pl-[8.5rem] pb-4">
                      {/* Ultra-Professional Card View */}
                      <div className="bg-background border border-glass-border p-6 md:p-10 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group/card flex items-start mt-4">
                        {/* Subtle left accent border */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#FF7A00] opacity-80"></div>
                        
                        <div className="pl-4 md:pl-6">
                          <p className="font-jakarta text-base md:text-lg lg:text-xl leading-[1.8] text-textSecondary font-light max-w-4xl">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
