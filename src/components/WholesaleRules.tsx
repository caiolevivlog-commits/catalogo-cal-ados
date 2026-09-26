import React from 'react';
import { CheckCircle2, MessageCircle, FileText } from 'lucide-react';
import { INITIAL_PRODUCTS } from '../data/products';

interface WholesaleRulesProps {
  onOpenWholesaleModal: () => void;
}

export const WholesaleRules: React.FC<WholesaleRulesProps> = ({
  onOpenWholesaleModal,
}) => {
  return (
    <section className="py-10 px-4 bg-white border-b border-neutral-200" id="regras-atacado">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 3 Real Product Previews */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-3">
            <div className="aspect-3/4 bg-neutral-100 border border-neutral-200 rounded-xs overflow-hidden flex items-center justify-center p-2 group shadow-2xs">
              <img
                src={INITIAL_PRODUCTS[0]?.image || 'https://down-br.img.susercontent.com/br-11134207-820md-mt9xcvpop8n53c'}
                alt="Salto Bloco Prata Caio Levi"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-3/4 bg-neutral-100 border border-neutral-200 rounded-xs overflow-hidden flex items-center justify-center p-2 group shadow-2xs">
              <img
                src={INITIAL_PRODUCTS[1]?.image || 'https://down-br.img.susercontent.com/br-11134207-820md-mth360wzcmiq58'}
                alt="Salto Gisele Marsala"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-3/4 bg-neutral-100 border border-neutral-200 rounded-xs overflow-hidden flex items-center justify-center p-2 group shadow-2xs">
              <img
                src={INITIAL_PRODUCTS[4]?.image || 'https://down-br.img.susercontent.com/br-11134294-820lm-mq6xzmnxr94w6f'}
                alt="Rasteira Couro Legítimo"
                className="w-full h-full object-contain group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Right: Rules Content */}
          <div className="lg:col-span-7">
            <div className="text-[11px] font-bold tracking-widest uppercase text-neutral-500 mb-1">
              POLO CALÇADISTA DE JAÚ / SP
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black mb-3">
              REGRAS DO ATACADO CAIO LEVI
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-6">
              Somos fabricantes tradicionais de calçados femininos finos direto da fonte em Jaú/SP. Compre para sua loja ou revenda autônoma com alta lucratividade e condições exclusivas:
            </p>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-black font-bold block mb-0.5">Mínimo 6 Pares:</strong>
                  <span className="text-neutral-600 leading-snug block">
                    Você pode mesclar modelos, cores e numerações variadas.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-black font-bold block mb-0.5">Grade Livre:</strong>
                  <span className="text-neutral-600 leading-snug block">
                    Escolha exatamente os números que mais vendem do 34 ao 40.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-black font-bold block mb-0.5">Venda com CPF ou CNPJ:</strong>
                  <span className="text-neutral-600 leading-snug block">
                    Ideal para revendedoras autônomas e lojistas.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-black font-bold block mb-0.5">Direto de Jaú/SP:</strong>
                  <span className="text-neutral-600 leading-snug block">
                    Envio imediato conferido e embalado na fábrica.
                  </span>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenWholesaleModal}
                className="px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>CADASTRE SEU CNPJ / CPF</span>
              </button>

              <a
                href="https://wa.me/5514918993334?text=Ol%C3%A1!%20Gostaria%20de%20consultar%20as%20regras%20de%20atacado%20da%20Caio%20Levi."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold tracking-wider uppercase rounded-xs transition-colors shadow-xs flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP: (14) 91899-3334</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
