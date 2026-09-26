import React from 'react';

interface NavbarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onOpenWholesaleModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenWholesaleModal,
  onScrollToSection,
}) => {
  return (
    <nav className="bg-white border-b border-neutral-200 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center justify-start md:justify-center gap-5 sm:gap-7 text-xs sm:text-sm font-semibold tracking-wider uppercase whitespace-nowrap py-3">
          
          <li>
            <button
              onClick={() => onSelectCategory('todos')}
              className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                activeCategory === 'todos'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-neutral-700 hover:text-black hover:border-neutral-300'
              }`}
            >
              TODOS OS ANÚNCIOS
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectCategory('salto-bloco')}
              className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                activeCategory === 'salto-bloco'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-neutral-700 hover:text-black hover:border-neutral-300'
              }`}
            >
              Salto Bloco
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectCategory('tenis')}
              className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                activeCategory === 'tenis'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-neutral-700 hover:text-black hover:border-neutral-300'
              }`}
            >
              Tênis & Slip On
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectCategory('rasteira')}
              className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                activeCategory === 'rasteira'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-neutral-700 hover:text-black hover:border-neutral-300'
              }`}
            >
              Rasteiras
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectCategory('botinha')}
              className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                activeCategory === 'botinha'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-neutral-700 hover:text-black hover:border-neutral-300'
              }`}
            >
              Botinhas
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectCategory('mary-jane')}
              className={`transition-colors pb-1 border-b-2 cursor-pointer ${
                activeCategory === 'mary-jane'
                  ? 'border-black text-black font-bold'
                  : 'border-transparent text-neutral-700 hover:text-black hover:border-neutral-300'
              }`}
            >
              Mary Jane
            </button>
          </li>

          <li>
            <button
              onClick={() => onSelectCategory('outlet')}
              className={`transition-colors pb-1 border-b-2 font-bold cursor-pointer ${
                activeCategory === 'outlet'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-red-600 hover:text-red-700 hover:border-red-400'
              }`}
            >
              Outlet
            </button>
          </li>

          <li>
            <button
              onClick={onOpenWholesaleModal}
              className="border-b-2 border-transparent text-neutral-700 hover:text-black hover:border-neutral-300 transition-colors pb-1 cursor-pointer"
            >
              Cadastre-se no Atacado
            </button>
          </li>

          <li>
            <button
              onClick={() => onScrollToSection('contatos')}
              className="border-b-2 border-transparent text-neutral-700 hover:text-black hover:border-neutral-300 transition-colors pb-1 cursor-pointer"
            >
              Contatos
            </button>
          </li>

        </ul>
      </div>
    </nav>
  );
};
