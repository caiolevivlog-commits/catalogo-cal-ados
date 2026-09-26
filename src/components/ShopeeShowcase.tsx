import React, { useState } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ExternalLink, ShoppingBag, Sparkles, Filter } from 'lucide-react';

interface ShopeeShowcaseProps {
  products: Product[];
  onOpenZoom: (product: Product) => void;
  onAddToCart: (product: Product, size: number) => void;
}

const CATEGORIES = [
  { id: 'todos', label: 'TODOS OS ANÚNCIOS' },
  { id: 'salto-bloco', label: 'Salto Bloco' },
  { id: 'tenis', label: 'Tênis & Slip On' },
  { id: 'rasteira', label: 'Rasteiras' },
  { id: 'botinha', label: 'Botinhas' },
  { id: 'mary-jane', label: 'Mary Jane' },
];

export const ShopeeShowcase: React.FC<ShopeeShowcaseProps> = ({
  products,
  onOpenZoom,
  onAddToCart,
}) => {
  const [selectedTab, setSelectedTab] = useState('todos');

  const filtered = selectedTab === 'todos'
    ? products
    : products.filter((p) => p.category === selectedTab);

  return (
    <section className="py-8 px-4 bg-white border-b border-neutral-200" id="anuncios-reais">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-red-600 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" />
              <span>LOJA OFICIAL SHOPEE & ATACADO • CALÇADOS DE JAÚ/SP</span>
            </div>
            <h2 className="text-3xl sm:text-5xl text-black leading-none mt-1">
              <span className="font-brand-caio tracking-wider">Vitrine Oficial Caio Levi</span>
            </h2>
            <p className="text-xs text-neutral-500 mt-1 max-w-2xl leading-relaxed">
              Clique em <strong>Comprar na Shopee</strong> para finalizar no anúncio oficial ou <strong>Compre Atacado via WhatsApp</strong> para atendimento direto de fábrica em Jaú/SP.
            </p>
          </div>

          <a
            href="https://collshp.com/_caiolevii014?share_channel_code=1&view=storefront"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#EE4D2D] hover:bg-[#D73211] text-white text-xs sm:text-sm font-bold tracking-wider uppercase rounded-xs transition-colors shadow-xs shrink-0"
          >
            <span>VISITAR LOJA NA SHOPEE</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Filter Pills / Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATEGORIES.map((tab) => {
            const isSelected = selectedTab === tab.id;
            const count = tab.id === 'todos'
              ? products.length
              : products.filter((p) => p.category === tab.id).length;

            if (count === 0 && tab.id !== 'todos') return null;

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold uppercase whitespace-nowrap rounded-xs border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-black'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-1.5 text-[10px] ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                  ({count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Products Grid with Staggered Rotation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              cardIndex={idx}
              onOpenZoom={onOpenZoom}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
