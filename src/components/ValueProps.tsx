import React from 'react';
import { Factory, ShoppingBag, Truck, Phone } from 'lucide-react';

export const ValueProps: React.FC = () => {
  return (
    <section className="py-6 px-4 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Item 1 */}
        <div className="bg-white p-4 border border-neutral-200/80 rounded-xs flex items-start gap-3.5 hover:border-neutral-400 transition-colors shadow-2xs">
          <div className="p-2.5 bg-neutral-100 rounded-xs text-neutral-800 shrink-0">
            <Factory className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">
              Direto da Fábrica
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5 leading-snug">
              Fabricação própria tradicional em Jaú/SP
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="bg-white p-4 border border-neutral-200/80 rounded-xs flex items-start gap-3.5 hover:border-neutral-400 transition-colors shadow-2xs">
          <div className="p-2.5 bg-neutral-100 rounded-xs text-neutral-800 shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">
              Shopee & Atacado
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5 leading-snug">
              Compre no varejo Shopee ou atacado a partir de 6 pares
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="bg-white p-4 border border-neutral-200/80 rounded-xs flex items-start gap-3.5 hover:border-neutral-400 transition-colors shadow-2xs">
          <div className="p-2.5 bg-neutral-100 rounded-xs text-neutral-800 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">
              Envio Imediato
            </h4>
            <p className="text-xs text-neutral-500 mt-0.5 leading-snug">
              Despacho para todos os estados do Brasil
            </p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="bg-white p-4 border border-neutral-200/80 rounded-xs flex items-start gap-3.5 hover:border-neutral-400 transition-colors shadow-2xs">
          <div className="p-2.5 bg-neutral-100 rounded-xs text-emerald-700 shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-black">
              WhatsApp Fábrica
            </h4>
            <a
              href="https://wa.me/5514918993334"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-600 hover:text-emerald-700 font-medium mt-0.5 block leading-snug"
            >
              Atendimento consultivo: (14) 91899-3334
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
