import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface AboutSectionProps {
  onOpenWholesaleModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenWholesaleModal,
}) => {
  return (
    <section className="bg-black text-white py-12 px-4 border-b border-neutral-800" id="sobre">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-8">
            <div className="text-[11px] font-bold tracking-widest uppercase text-amber-500 mb-2">
              TRADIÇÃO & FABRICAÇÃO PRÓPRIA
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-4">
              CONHEÇA MAIS SOBRE A CAIO LEVI CALÇADOS EM JAÚ/SP
            </h2>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-2xl mb-8 font-light">
              Produzimos em Jaú, o polo mais prestigiado de calçados femininos do país. Nossos calçados unem moldes perfeitos, palmilhas acolchoadas e os visuais que mais performam na Shopee e em boutiques de todo o Brasil.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenWholesaleModal}
                className="px-6 py-3 bg-white hover:bg-neutral-200 text-black text-xs font-bold tracking-wider uppercase rounded-xs transition-transform active:scale-95 shadow-sm cursor-pointer"
              >
                CADASTRAR NO ATACADO (6+ PARES)
              </button>

              <a
                href="https://wa.me/5514918993334?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20Caio%20Levi%20Cal%C3%A7ados."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-neutral-300 hover:text-white transition-colors py-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>FALAR NO WHATSAPP (14) 91899-3334</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Brand Monogram Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-68 h-72 sm:w-76 sm:h-80 bg-white text-black p-6 sm:p-8 rounded-xs shadow-2xl flex flex-col items-center justify-center border border-neutral-200 text-center group hover:scale-[1.02] transition-transform">
              
              {/* Exact Caio Levi Monogram Symbol from uploaded image */}
              <div className="relative mb-3 flex items-center justify-center w-full">
                <svg
                  viewBox="0 0 160 200"
                  className="w-28 h-36 sm:w-32 sm:h-40 text-black fill-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer curved bold C envelope */}
                  <path
                    d="M 103 54 C 103 40, 93 25, 76 25 C 57 25, 47 43, 47 75 L 47 135 C 47 167, 57 185, 76 185 C 93 185, 103 170, 103 156"
                    stroke="#000000"
                    strokeWidth="11"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* L */}
                  <path
                    d="M 59 66 L 59 152 L 86 152"
                    stroke="#000000"
                    strokeWidth="4.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* E */}
                  <path
                    d="M 66 73 L 83 73"
                    stroke="#000000"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 66 73 L 66 135 L 81 135"
                    stroke="#000000"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 66 103 L 79 103"
                    stroke="#000000"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                  />
                  {/* V */}
                  <path
                    d="M 85 71 L 102 147 L 118 73"
                    stroke="#000000"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* i */}
                  <path
                    d="M 120 73 L 120 146"
                    stroke="#000000"
                    strokeWidth="4.2"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="120"
                    cy="60"
                    r="3.2"
                    fill="#000000"
                  />
                </svg>
              </div>

              {/* Handcrafted Stylized Font Text "CAIO LEVI" */}
              <div
                className="font-light tracking-[0.22em] text-base sm:text-lg uppercase text-black"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                CAIO LEVI
              </div>
              <div className="text-[9px] uppercase tracking-widest text-neutral-500 font-semibold mt-1">
                DE JAÚ/SP · DIRETO DA FÁBRICA
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
