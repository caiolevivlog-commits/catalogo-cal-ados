import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onOpenWholesaleModal: () => void;
  onExploreOutlet: () => void;
}

const SLIDES = [
  {
    title: 'COLEÇÃO EXCLUSIVA POR CAIO LEVI',
    subtitle: 'LOJA OFICIAL NA SHOPEE • DIRETO DA FÁBRICA JAÚ/SP',
    highlight: 'Saltos Bloco, Tênis Elástico, Rasteiras e Slip Ons direto do polo calçadista',
    ctaText: 'COMPRE NO ATACADO (6+ PARES)',
    secondaryText: 'VER OFERTAS SHOPEE',
    bgImage: 'https://down-br.img.susercontent.com/br-11134207-820md-mt9xcvpop8n53c',
    tag: 'LOJA OFICIAL SHOPEE & ATACADO',
  },
  {
    title: 'LUCRE MAIS DE 100% NA REVENDA',
    subtitle: 'GRADE LIVRE 34 AO 40 • PEDIDO MÍNIMO DE APENAS 6 PARES',
    highlight: 'Compre no varejo pela Shopee ou economize comprando direto no atacado via WhatsApp',
    ctaText: 'CADASTRAR CNPJ OU CPF',
    secondaryText: 'FALAR COM A FÁBRICA',
    bgImage: 'https://down-br.img.susercontent.com/br-11134207-820la-mmqsk5lk55oha1',
    tag: 'DIRETO DE JAÚ/SP',
  },
];

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenWholesaleModal,
  onExploreOutlet,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <div className="relative bg-neutral-900 text-white overflow-hidden select-none border-b border-neutral-200">
      <div className="relative h-[340px] sm:h-[400px] md:h-[460px] flex items-center">
        
        {/* Background Image with elegant overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 transform scale-100"
          style={{ backgroundImage: `url(${slide.bgImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
        </div>

        {/* Content Box */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full z-10">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 backdrop-blur-xs text-amber-300 text-[11px] font-bold tracking-widest uppercase rounded-xs mb-3 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{slide.tag}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight mb-2">
              {slide.title}
            </h2>

            <p className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-300 uppercase mb-3">
              {slide.subtitle}
            </p>

            <p className="text-xs sm:text-base text-neutral-200 font-light leading-relaxed mb-6 line-clamp-2">
              {slide.highlight}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenWholesaleModal}
                className="px-5 py-2.5 bg-white text-black hover:bg-neutral-100 font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xs transition-transform active:scale-95 shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreOutlet}
                className="px-4 py-2.5 bg-black/50 hover:bg-black/80 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-xs border border-white/40 transition-colors cursor-pointer"
              >
                {slide.secondaryText}
              </button>
            </div>
          </div>
        </div>

        {/* Left Arrow Button */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-white/80 hover:bg-white text-black rounded-full flex items-center justify-center transition-all shadow-md z-20 cursor-pointer"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 bg-white/80 hover:bg-white text-black rounded-full flex items-center justify-center transition-all shadow-md z-20 cursor-pointer"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Slide Pagination Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 transition-all rounded-full cursor-pointer ${
                idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
