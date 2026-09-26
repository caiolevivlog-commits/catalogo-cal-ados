import React, { useState } from 'react';
import { MessageCircle, Mail, Instagram, Facebook, ShieldCheck, Lock, Factory, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onOpenWholesaleModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWholesaleModal }) => {
  const [newsletterInput, setNewsletterInput] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterInput.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterInput('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-800 text-xs" id="contatos">
      {/* Main 4 Columns */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Caio Levi */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-9 flex items-center justify-center shrink-0">
                <svg
                  viewBox="0 0 160 200"
                  className="w-full h-full text-black fill-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 103 54 C 103 40, 93 25, 76 25 C 57 25, 47 43, 47 75 L 47 135 C 47 167, 57 185, 76 185 C 93 185, 103 170, 103 156"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 59 66 L 59 152 L 86 152"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 66 73 L 83 73"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 66 73 L 66 135 L 81 135"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 66 103 L 79 103"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 85 71 L 102 147 L 118 73"
                    stroke="currentColor"
                    strokeWidth="4.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M 120 73 L 120 146"
                    stroke="currentColor"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="120"
                    cy="60"
                    r="3.2"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-brand-caio text-xl text-black leading-none">
                  Caio Levi Calçados
                </h3>
                <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-medium">
                  Jaú/SP · Direto da Fábrica
                </span>
              </div>
            </div>
            
            <p className="text-neutral-600 leading-relaxed mb-4 text-xs">
              Direto da fábrica em Jaú/SP - Capital do Calçado Feminino. Especialistas em saltos bloco, rasteiras finas e birkens para lojistas e revendedoras autônomas de todo o país.
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 rounded-xs text-[11px] font-bold text-neutral-800 border border-neutral-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fabricação Própria em Jaú/SP</span>
            </div>
          </div>

          {/* Column 2: Regras de Atacado */}
          <div>
            <h4 className="font-extrabold uppercase tracking-wider text-xs text-black mb-3">
              REGRAS DE ATACADO
            </h4>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex items-start gap-1.5">
                <span className="text-black font-bold">·</span>
                <span>Pedido mínimo de apenas 6 pares</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-black font-bold">·</span>
                <span>Grade livre (escolha modelos e números)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-black font-bold">·</span>
                <span>Numerações completas do 34 ao 40</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-black font-bold">·</span>
                <span>Venda aberta para CPF ou CNPJ</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-black font-bold">·</span>
                <span>Envio ágil e seguro direto da fábrica</span>
              </li>
            </ul>

            <button
              onClick={onOpenWholesaleModal}
              className="mt-3 text-[11px] font-bold text-black uppercase underline hover:text-emerald-700 cursor-pointer"
            >
              Abrir Ficha de Cadastro Atacado →
            </button>
          </div>

          {/* Column 3: Contatos Oficiais */}
          <div>
            <h4 className="font-extrabold uppercase tracking-wider text-xs text-black mb-3">
              CONTATOS OFICIAIS
            </h4>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a
                  href="https://wa.me/5514918993334"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-black">WhatsApp: +55 (14) 91899-3334</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:caiolevi@hotmail.com"
                  className="flex items-center gap-1.5 hover:text-black transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>caiolevi@hotmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-black transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Instagram: @caiolevi.ecommerce</span>
                </a>
              </li>
              <li>
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <Facebook className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Facebook: @caiolevi.ecommerce</span>
                </span>
              </li>
              <li className="text-[11px] text-neutral-500 pt-1">
                Segunda a Sexta: 08:00 às 18:00
              </li>
            </ul>

            <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Atendimento Direto com a Fábrica</span>
            </div>
          </div>

          {/* Column 4: Shopee & Novidades */}
          <div>
            <h4 className="font-extrabold uppercase tracking-wider text-xs text-black mb-3">
              SHOPEE & NOVIDADES
            </h4>
            <p className="text-neutral-600 mb-3 text-xs leading-relaxed">
              Receba o catálogo semanal com promoções e ofertas da nossa loja oficial Shopee:
            </p>

            {newsletterSuccess ? (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xs">
                ✓ Catálogo e tabela enviados com sucesso!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="text"
                  value={newsletterInput}
                  onChange={(e) => setNewsletterInput(e.target.value)}
                  placeholder="Seu e-mail ou WhatsApp"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs focus:outline-hidden focus:border-black"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-black hover:bg-neutral-800 text-white font-bold uppercase tracking-wider rounded-xs text-xs transition-colors cursor-pointer"
                >
                  RECEBER CATÁLOGO
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Payment & Security Section */}
        <div className="mt-12 pt-6 border-t border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Payment Badges */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-[11px] text-neutral-500 mb-2">
              FORMAS DE PAGAMENTO & PARCELAMENTO
            </h5>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xs font-extrabold text-[10px]">
                PIX 5% OFF
              </span>
              <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-2xs font-semibold text-[10px]">
                Cartão até 10x
              </span>
              <span className="px-2.5 py-1 bg-neutral-100 text-neutral-700 border border-neutral-200 rounded-2xs font-semibold text-[10px]">
                Boleto Bancário
              </span>
              <span className="px-2.5 py-1 bg-[#FFF5F1] text-[#EE4D2D] border border-[#FFD4C4] rounded-2xs font-bold text-[10px]">
                Shopee Garantia
              </span>
            </div>
          </div>

          {/* Security Seals */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-[11px] text-neutral-500 mb-2">
              SELOS DE SEGURANÇA & CONFIANÇA
            </h5>
            <div className="flex items-center gap-4 flex-wrap text-[11px] font-semibold text-neutral-700">
              <div className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-neutral-500" />
                <span>SSL 256 Bits</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center gap-1">
                <Factory className="w-3.5 h-3.5 text-neutral-500" />
                <span>Direto de Jaú/SP</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Legal */}
        <div className="mt-8 pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-500">
          <p>© 2025 Caio Levi Calçados Femininos · Jaú/SP. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-black cursor-pointer">Políticas de Privacidade</span>
            <span>·</span>
            <span className="hover:text-black cursor-pointer">Termos de Atacado</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
