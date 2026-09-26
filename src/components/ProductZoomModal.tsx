import React, { useState } from 'react';
import { Product } from '../types';
import { X, ZoomIn, ShoppingBag, Check, Copy, ExternalLink, Star, Video, MessageCircle, Tag, ShieldCheck } from 'lucide-react';

interface ProductZoomModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: number) => void;
}

export const ProductZoomModal: React.FC<ProductZoomModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(product.availableSizes[0] || 36);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [isHoverZooming, setIsHoverZooming] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const currentImg = images[activeImageIndex] || product.image;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentImg);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyHtml = () => {
    const htmlSnippet = `<img src="${currentImg}" alt="${product.name}" class="product-shoe-image" />`;
    navigator.clipboard.writeText(htmlSnippet);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const generateWhatsAppUrl = () => {
    const text = `Olá! Gostaria de consultar o *preço de atacado (6+ pares)* na Caio Levi:%0A%0A👠 *${product.name}*%0A📋 *Referência:* ${product.reference}%0A📏 *Tamanho:* ${selectedSize}%0A🛍️ *Link Shopee:* ${product.shopeeUrl}%0A%0APor favor, informe os valores no atacado, frete de Jaú/SP e prazo de entrega.`;
    return `https://wa.me/5514918993334?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-4xl max-h-[94vh] rounded-xs shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-3 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-200">
              Anúncio Oficial Shopee · Caio Levi Jaú/SP
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column: Image with Zoom Box & Thumbnails */}
          <div className="flex flex-col">
            <div
              className="relative aspect-square bg-[#fbfbfb] border border-neutral-200 rounded-xs overflow-hidden cursor-crosshair flex items-center justify-center"
              onMouseEnter={() => setIsHoverZooming(true)}
              onMouseLeave={() => setIsHoverZooming(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-contain p-4 select-none"
              />

              {/* Magnified Loupe Overlay */}
              {isHoverZooming && (
                <div
                  className="absolute inset-0 pointer-events-none bg-no-repeat bg-white transition-opacity"
                  style={{
                    backgroundImage: `url(${currentImg})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: '240%',
                  }}
                />
              )}

              {/* Zoom Instruction Tag */}
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-medium px-2 py-1 rounded-2xs flex items-center gap-1 pointer-events-none">
                <ZoomIn className="w-3 h-3" />
                <span>Passe o mouse para zoom</span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {images.length > 1 && (
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-14 rounded-xs border p-1 bg-[#f9f9f9] shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-black ring-1 ring-black'
                        : 'border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    <img src={img} alt={`Ângulo ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Direct HTML Image Link Information */}
            <div className="mt-4 p-3 bg-neutral-50 border border-neutral-200 rounded-xs text-xs space-y-2">
              <div className="flex items-center justify-between text-neutral-600 font-semibold text-[11px]">
                <span className="flex items-center gap-1 text-black font-bold">
                  <Tag className="w-3 h-3 text-neutral-500" />
                  Link Direto da Imagem no HTML:
                </span>
              </div>

              <div className="bg-white p-2 border border-neutral-200 rounded-2xs font-mono text-[10px] text-neutral-600 break-all select-all">
                {currentImg}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 rounded-xs text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLink ? 'Link Copiado!' : 'Copiar URL'}</span>
                </button>

                <button
                  onClick={handleCopyHtml}
                  className="px-2.5 py-1 bg-neutral-900 hover:bg-black text-white rounded-xs text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedHtml ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedHtml ? 'HTML Copiado!' : 'Copiar Tag <img>'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Reviews & Action Buttons */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Badges & Sold Count */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {product.badge && (
                  <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-2xs">
                    {product.badge}
                  </span>
                )}
                {product.discountBadge && (
                  <span className="bg-[#DC2626] text-white text-[10px] font-extrabold px-2 py-0.5 uppercase tracking-wider rounded-2xs">
                    {product.discountBadge}
                  </span>
                )}
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-2xs">
                  🔥 {product.soldCount} no Shopee
                </span>
                <span className="text-[10px] font-semibold text-neutral-400">
                  {product.reference}
                </span>
              </div>

              <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-black mb-2 leading-snug">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 text-xs">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-black">{product.rating.toFixed(1)}</span>
                <span className="text-neutral-500">({product.reviewCount} avaliações de compradoras)</span>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs font-bold uppercase mb-2">
                  <span className="text-black">Escolha seu Tamanho (Forma Jaú):</span>
                  <span className="text-neutral-500 text-[11px] font-normal">Tam {selectedSize} selecionado</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-9 h-9 rounded-xs font-bold text-xs border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-black text-white border-black ring-2 ring-black/20 shadow-xs'
                          : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dual Price Comparison Card */}
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs space-y-1.5 mb-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs uppercase font-semibold text-neutral-600">Preço Shopee (Varejo):</span>
                  <div>
                    <span className="text-xs text-neutral-400 line-through mr-1.5">
                      R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-sm font-extrabold text-[#DC2626]">
                      R$ {product.shopeePrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-1.5 border-t border-neutral-200">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-emerald-800 block">
                      Atacado Caio Levi (6+ pares):
                    </span>
                    <span className="text-[10px] text-emerald-600">Grade livre do 34 ao 40 direto da fábrica</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-2xs uppercase">
                    Consulte no WhatsApp
                  </span>
                </div>
              </div>

              {/* Customer Reviews Preview from Shopee */}
              {product.reviews && product.reviews.length > 0 && (
                <div className="mb-4 space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-black">
                    Comentários de Compradoras no Shopee:
                  </h4>
                  <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {product.reviews.map((rev, rIdx) => (
                      <div key={rIdx} className="p-2 bg-neutral-50 border border-neutral-200 rounded-2xs text-xs">
                        <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-0.5">
                          <span className="font-bold text-black">{rev.author} ({rev.location})</span>
                          <span>{rev.date}</span>
                        </div>
                        <p className="text-neutral-700 italic text-[11px] leading-snug">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTAs strictly fulfilling prompt requirements */}
            <div className="space-y-2 pt-2 border-t border-neutral-200">
              {/* Shopee Direct Purchase Link */}
              <a
                href={product.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#EE4D2D] hover:bg-[#D73211] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Finalizar Compra no Anúncio da Shopee</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* WhatsApp Wholesale Redirect */}
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Compre Atacado via WhatsApp (Tam {selectedSize})</span>
              </a>

              {/* Add to Wholesale Cart */}
              <button
                onClick={() => {
                  onAddToCart(product, selectedSize);
                  onClose();
                }}
                className="w-full py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Adicionar ao Carrinho de Atacado da Loja</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
