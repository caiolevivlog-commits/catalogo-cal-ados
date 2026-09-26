import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { ZoomIn, ExternalLink, Star, Video, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  cardIndex: number;
  onOpenZoom: (product: Product) => void;
  onAddToCart?: (product: Product, size: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  cardIndex,
  onOpenZoom,
}) => {
  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [chosenSize, setChosenSize] = useState<number>(product.availableSizes[0] || 36);

  // Staggered interval: rotates every 3000ms with an offset based on card index so they do not all change at the same second!
  useEffect(() => {
    if (images.length <= 1) return;

    // Stagger delay: e.g. card 0 = 0ms, card 1 = 600ms, card 2 = 1200ms, card 3 = 1800ms...
    const staggerOffset = (cardIndex % 5) * 600;
    let intervalId: NodeJS.Timeout | null = null;

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        if (!isHovered) {
          setActiveImageIndex((prev) => (prev + 1) % images.length);
        }
      }, 3000);
    }, staggerOffset);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [images.length, cardIndex, isHovered]);

  const currentImg = images[activeImageIndex] || product.image;

  // WhatsApp Wholesale Redirect URL
  const generateWhatsAppWholesaleUrl = () => {
    const text = `Olá! Gostaria de consultar o *preço de atacado (6+ pares)* para o modelo da Caio Levi:%0A%0A👠 *${product.name}*%0A📋 *Referência:* ${product.reference}%0A📏 *Tamanho Escolhido:* ${chosenSize}%0A🛍️ *Link do Anúncio na Shopee:* ${product.shopeeUrl}%0A%0APor favor, informe os valores no atacado, disponibilidade de grade e frete de Jaú/SP.`;
    return `https://wa.me/5514918993334?text=${text}`;
  };

  return (
    <div
      className="bg-white border border-neutral-200 rounded-xs flex flex-col hover:border-black/60 transition-all shadow-2xs hover:shadow-md group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-square bg-[#fafafa] overflow-hidden border-b border-neutral-100 flex items-center justify-center">
        
        {/* Top-left Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1 z-10 flex-wrap max-w-[80%]">
          {product.badge && (
            <span className="bg-black/90 text-white text-[9px] font-bold px-1.5 py-0.5 uppercase tracking-wider rounded-2xs shadow-2xs">
              {product.badge}
            </span>
          )}
          {product.discountBadge && (
            <span className="bg-[#DC2626] text-white text-[9px] font-extrabold px-1.5 py-0.5 uppercase tracking-wider rounded-2xs shadow-2xs">
              {product.discountBadge}
            </span>
          )}
          {product.hasVideo && (
            <span className="bg-amber-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-2xs flex items-center gap-0.5 shadow-2xs">
              <Video className="w-2.5 h-2.5 fill-current" />
              <span>Vídeo</span>
            </span>
          )}
        </div>

        {/* Zoom Icon Button */}
        <button
          onClick={() => onOpenZoom(product)}
          className="absolute top-2 right-2 w-7 h-7 bg-white/95 hover:bg-white text-neutral-800 rounded-full flex items-center justify-center shadow-xs z-10 transition-transform active:scale-90 cursor-pointer border border-neutral-200"
          title="Ver fotos em alta resolução e comentários"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {/* Product Photo with Smooth Cross-Fade Transition */}
        <div
          onClick={() => onOpenZoom(product)}
          className="w-full h-full cursor-pointer flex items-center justify-center p-3 relative"
        >
          {images.map((imgUrl, idx) => (
            <img
              key={idx}
              src={imgUrl}
              alt={`${product.name} - foto ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-contain p-3 transition-opacity duration-700 ${
                idx === activeImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              } group-hover:scale-105 transition-transform duration-500`}
              loading="lazy"
              onError={(e) => {
                // fallback if broken
                (e.target as HTMLImageElement).src = 'https://down-br.img.susercontent.com/br-11134207-820md-mt9xcvpop8n53c';
              }}
            />
          ))}
        </div>

        {/* Image Gallery Staggered Navigation Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10 bg-black/30 backdrop-blur-2xs px-2 py-0.5 rounded-full">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(dotIdx);
                }}
                className={`transition-all rounded-full cursor-pointer ${
                  dotIdx === activeImageIndex
                    ? 'w-3 h-1.5 bg-white'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                }`}
                title={`Ver foto ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Sold count from Shopee */}
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-neutral-400 font-normal">({product.reviewCount})</span>
            </div>
            <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-2xs">
              {product.soldCount}
            </span>
          </div>

          {/* Subtag */}
          {product.subtag && (
            <p className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1 line-clamp-1">
              {product.subtag}
            </p>
          )}

          {/* Product Name (exact ad title) */}
          <h3
            onClick={() => onOpenZoom(product)}
            className="font-bold text-xs uppercase tracking-tight text-neutral-900 group-hover:text-black line-clamp-2 cursor-pointer h-8 mb-2 leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Grade Selector (34 ao 40) */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-semibold uppercase mb-1">
              <span>Grade Jaú:</span>
              <span>Tam: <strong className="text-black">{chosenSize}</strong></span>
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              {product.availableSizes.map((size) => {
                const isSelected = chosenSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setChosenSize(size)}
                    className={`text-[10px] font-bold w-6 h-6 rounded-2xs border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-black text-white border-black ring-1 ring-black'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Comparison Card */}
          <div className="space-y-1 mb-3 bg-neutral-50 p-2.5 rounded-2xs border border-neutral-200/80">
            <div className="flex items-baseline justify-between text-xs">
              <span className="text-[10px] uppercase font-bold text-neutral-500">Preço Shopee:</span>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 line-through mr-1">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
                <span className="font-extrabold text-[#DC2626]">
                  R$ {product.shopeePrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <div className="flex items-baseline justify-between text-xs pt-1 border-t border-neutral-200">
              <span className="text-[10px] uppercase font-extrabold text-emerald-800">
                Atacado (6+ pares):
              </span>
              <span className="font-extrabold text-emerald-700 text-[11px] uppercase tracking-tight flex items-center gap-1">
                <span>Consulte no WhatsApp</span>
              </span>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS (As strictly requested by user) */}
        <div className="space-y-1.5 mt-auto pt-1">
          {/* Button 1: Comprar na Shopee (Redirects to Shopee ad) */}
          <a
            href={product.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-[#EE4D2D] hover:bg-[#D73211] text-white text-[11px] font-bold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            title="Finalizar compra deste anúncio na Shopee"
          >
            <span>Comprar na Shopee</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Button 2: Compre Atacado via WhatsApp (Redirects to WhatsApp with item and size) */}
          <a
            href={generateWhatsAppWholesaleUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 bg-[#16A34A] hover:bg-[#15803D] text-white text-[11px] font-bold tracking-wider uppercase rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            title="Pedir este modelo no atacado pelo WhatsApp da fábrica"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.118-.057-.267-.085-.609-.222-1.05-.414-1.871-.814-3.096-2.73-3.19-2.855-.094-.124-.76-1.012-.76-1.93 0-.918.481-1.37.653-1.558.172-.187.375-.234.5-.234.125 0 .25.002.359.007.117.006.273-.044.428.327.16.381.547 1.332.595 1.43.048.098.08.213.016.339-.064.127-.097.206-.192.318-.096.111-.202.248-.288.334-.096.095-.197.199-.085.39.112.192.498.822 1.069 1.33 1.01.899 1.862 1.178 2.054 1.273.192.095.304.079.416-.048.113-.127.48-1.013.608-1.362.129-.349.256-.29.43-.228.174.063 1.107.522 1.299.617.192.096.32.143.368.223.048.079.048.461-.096.866z"/>
            </svg>
            <span>Compre Atacado via WhatsApp</span>
          </a>

          {/* Quick Details / Zoom link */}
          <button
            type="button"
            onClick={() => onOpenZoom(product)}
            className="w-full py-1 text-[10px] text-neutral-500 hover:text-black font-semibold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <ZoomIn className="w-3 h-3" />
            <span>Ver Fotos & Detalhes</span>
          </button>
        </div>

      </div>
    </div>
  );
};
