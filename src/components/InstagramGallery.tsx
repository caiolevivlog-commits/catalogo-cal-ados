import React from 'react';
import { INSTAGRAM_PHOTOS } from '../data/products';
import { Instagram, ExternalLink } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  return (
    <section className="py-10 px-4 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-6 border-b border-neutral-200">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-100 rounded-xs text-black border border-neutral-200 shrink-0">
              <Instagram className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-black flex items-center gap-2">
                <span>@CAIOLEVI.ECOMMERCE</span>
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Acompanhe lançamentos diários, provadores e bastidores da fábrica em Jaú/SP
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-neutral-300 hover:border-black text-black text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>

            <a
              href="https://shopee.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#EE4D2D] hover:bg-[#D73211] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <span>Shopee Oficial</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4 Photos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {INSTAGRAM_PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="group relative aspect-square bg-neutral-100 border border-neutral-200 rounded-xs overflow-hidden cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                <span className="text-white text-xs font-bold uppercase tracking-wider bg-black/80 px-2.5 py-1 rounded-2xs border border-white/20">
                  Ver no Insta
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
