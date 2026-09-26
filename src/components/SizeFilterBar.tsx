import React from 'react';
import { Package, CheckCircle2 } from 'lucide-react';

interface SizeFilterBarProps {
  selectedSize: number | null;
  onSelectSize: (size: number | null) => void;
}

const SIZES = [34, 35, 36, 37, 38, 39, 40];

export const SizeFilterBar: React.FC<SizeFilterBarProps> = ({
  selectedSize,
  onSelectSize,
}) => {
  return (
    <div className="bg-white border-b border-neutral-200 py-3 sm:py-4 px-4 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Title & Info */}
        <div className="flex items-center gap-3 text-left">
          <div className="w-9 h-9 rounded-sm bg-neutral-100 border border-neutral-200 flex items-center justify-center text-black">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-black">
              Compre por Tamanho
            </h3>
            <p className="text-[11px] sm:text-xs text-neutral-500">
              Grade livre disponível do 34 ao 40 pronta-entrega
            </p>
          </div>
        </div>

        {/* Size Selector Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap justify-center">
          <button
            onClick={() => onSelectSize(null)}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all rounded-xs border cursor-pointer ${
              selectedSize === null
                ? 'bg-black text-white border-black shadow-xs'
                : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
            }`}
          >
            Todos
          </button>

          {SIZES.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                onClick={() => onSelectSize(isSelected ? null : size)}
                className={`w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm font-bold transition-all rounded-xs border flex items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white border-black ring-2 ring-black/20 shadow-xs'
                    : 'bg-white text-neutral-800 border-neutral-200 hover:border-black'
                }`}
                title={`Filtrar modelos com tamanho ${size}`}
              >
                {size}
              </button>
            );
          })}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xs border border-emerald-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Estoque Atualizado em Jaú/SP</span>
        </div>

      </div>
    </div>
  );
};
