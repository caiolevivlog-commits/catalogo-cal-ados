import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Divide testimonials into groups of 3
  const pageSize = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / pageSize);

  // 10-second automatic rotation with progress indicator
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 10000; // 10 seconds
    const updateFreq = 100; // update progress bar every 100ms
    const step = (updateFreq / intervalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentPage((curr) => (curr + 1) % totalPages);
          return 0;
        }
        return prev + step;
      });
    }, updateFreq);

    return () => clearInterval(timer);
  }, [totalPages, isPaused]);

  // Handle manual navigation
  const handlePrev = () => {
    setCurrentPage((curr) => (curr - 1 + totalPages) % totalPages);
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentPage((curr) => (curr + 1) % totalPages);
    setProgress(0);
  };

  const handleSelectPage = (index: number) => {
    setCurrentPage(index);
    setProgress(0);
  };

  const startIndex = currentPage * pageSize;
  const visibleReviews = TESTIMONIALS.slice(startIndex, startIndex + pageSize);

  return (
    <section
      className="py-12 px-4 bg-[#f8f9fa] border-b border-neutral-200"
      id="avaliacoes"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest uppercase text-emerald-700 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse" />
              <span>AVALIAÇÕES OFICIAIS DOS ANÚNCIOS MAIS VENDIDOS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-black mb-1">
              AVALIAÇÕES & DEPOIMENTOS
            </h2>
            <p className="text-xs text-neutral-500">
              Depoimentos reais de compradoras e lojistas nos anúncios oficiais de Jaú/SP • Rotação a cada 10 segundos
            </p>
          </div>

          {/* Navigation Controls & Pagination */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleSelectPage(i)}
                  className={`h-2 transition-all rounded-full cursor-pointer ${
                    currentPage === i
                      ? 'w-6 bg-black'
                      : 'w-2 bg-neutral-300 hover:bg-neutral-500'
                  }`}
                  aria-label={`Ir para grupo ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-1 pl-2 border-l border-neutral-300">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-xs border border-neutral-300 bg-white hover:bg-black hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Avaliações anteriores"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-xs border border-neutral-300 bg-white hover:bg-black hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Próximas avaliações"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 10-Second Progress Line */}
        <div className="w-full bg-neutral-200 h-0.5 mb-6 overflow-hidden rounded-full">
          <div
            className="bg-black h-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* 3 Active Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300">
          {visibleReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-5 sm:p-6 border border-neutral-200 rounded-xs shadow-2xs flex flex-col justify-between hover:border-black/50 hover:shadow-md transition-all group"
            >
              <div>
                {/* Related Most Sold Product Badge */}
                {review.productTitle && (
                  <div className="mb-4 pb-3 border-b border-neutral-100 flex items-center gap-3">
                    {review.productImage && (
                      <img
                        src={review.productImage}
                        alt={review.productTitle}
                        className="w-12 h-12 object-cover rounded-2xs border border-neutral-200 shrink-0 bg-neutral-50"
                        loading="lazy"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <span className="block text-[9px] font-extrabold uppercase tracking-widest text-[#EE4D2D]">
                        ANÚNCIO MAIS VENDIDO
                      </span>
                      <h4 className="text-[11px] font-bold text-neutral-900 truncate leading-snug" title={review.productTitle}>
                        {review.productTitle}
                      </h4>
                      {review.shopeeUrl && (
                        <a
                          href={review.shopeeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[10px] text-neutral-500 hover:text-black font-semibold mt-0.5"
                        >
                          <span>Ver anúncio oficial</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* 5 Stars Rating */}
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                  ))}
                  <span className="ml-1 text-[11px] font-bold text-black">5.0</span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-[13px] text-neutral-700 leading-relaxed italic mb-6">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>

              {/* Author & Verified Purchase Status */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto">
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-black">
                    {review.author}
                  </h5>
                  <p className="text-[11px] text-neutral-500">
                    {review.role} • {review.location}
                  </p>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-2xs border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Compra Verificada</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hint */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Passe o cursor sobre os cards para pausar a rotação automática de 10s.</span>
          <span className="font-semibold text-neutral-500">
            Página {currentPage + 1} de {totalPages}
          </span>
        </div>

      </div>
    </section>
  );
};
