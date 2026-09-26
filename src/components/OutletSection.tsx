import React from 'react';
import { Product } from '../types';
import { ArrowRight, ExternalLink, MessageCircle, ZoomIn } from 'lucide-react';

interface OutletSectionProps {
  products: Product[];
  onOpenZoom: (product: Product) => void;
  onAddToCart: (product: Product, size: number) => void;
  onSelectCategory: (category: string) => void;
}

export const OutletSection: React.FC<OutletSectionProps> = ({
  products,
  onOpenZoom,
  onAddToCart,
  onSelectCategory,
}) => {
  const outletItems = products.filter((p) => p.isOutlet).slice(0, 3);

  return (
    <section className="py-10 px-4 bg-[#f8f9fa] border-b border-neutral-200" id="outlet">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-6 mb-6 border-b border-neutral-200">
          <div>
            <div className="text-[11px] font-bold tracking-widest uppercase text-red-600 mb-1">
              OFERTA LIMITADA • PONTA DE ESTOQUE JAÚ
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black">
              DESTAQUES & <span className="text-red-600">OUTLET</span>
            </h2>
          </div>

          <button
            onClick={() => onSelectCategory('outlet')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wider transition-colors cursor-pointer group"
          >
            <span>ACESSAR TODO O OUTLET</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Outlet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outletItems.map((item) => {
            const waUrl = `https://wa.me/5514918993334?text=Ol%C3%A1!%20Gostaria%20de%20garantir%20o%20par%20no%20OUTLET:%20*${encodeURIComponent(item.name)}*%20por%20R$%20${item.shopeePrice.toFixed(2).replace('.', ',')}.%20Link%20Shopee:%20${item.shopeeUrl}`;

            return (
              <div
                key={`outlet-${item.id}`}
                className="bg-white border border-neutral-200 rounded-xs overflow-hidden flex flex-col hover:border-black/50 transition-all shadow-2xs group"
              >
                {/* Image Container with Outlet Tag */}
                <div className="relative aspect-4/3 bg-[#fdfdfd] overflow-hidden border-b border-neutral-100 p-4 flex items-center justify-center">
                  <span className="absolute top-2.5 left-2.5 bg-[#DC2626] text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-2xs z-10 shadow-2xs">
                    OUTLET - {item.discountBadge || '66% OFF'}
                  </span>

                  <button
                    onClick={() => onOpenZoom(item)}
                    className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/95 rounded-full flex items-center justify-center text-neutral-700 shadow-2xs z-10 hover:bg-white cursor-pointer"
                    title="Ver fotos e detalhes"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>

                  <img
                    src={item.image}
                    alt={item.name}
                    onClick={() => onOpenZoom(item)}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                    loading="lazy"
                  />
                </div>

                {/* Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-1">
                      <span>{item.reference}</span>
                      <span className="text-amber-600 font-semibold">{item.soldCount}</span>
                    </div>

                    <h3
                      onClick={() => onOpenZoom(item)}
                      className="font-extrabold text-xs sm:text-sm uppercase text-black hover:text-red-600 transition-colors cursor-pointer mb-1.5 leading-snug line-clamp-2 h-9"
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs text-neutral-500 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-[10px] text-neutral-400 line-through">
                          De R$ {item.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                        <span className="text-base font-extrabold text-[#DC2626]">
                          R$ {item.shopeePrice.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-2xs border border-emerald-200">
                        Atacado: Consulte via Whats
                      </span>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={item.shopeeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 bg-[#EE4D2D] hover:bg-[#D73211] text-white text-[10px] font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1 shadow-xs text-center"
                      >
                        <span>Comprar Shopee</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-[10px] font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1 shadow-xs text-center"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>Atacado Whats</span>
                      </a>
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
};
