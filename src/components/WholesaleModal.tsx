import React, { useState } from 'react';
import { WholesaleLead } from '../types';
import { X, CheckCircle2, Factory, FileText, Send, Sparkles, Loader2 } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

interface WholesaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WholesaleModal: React.FC<WholesaleModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<WholesaleLead>({
    name: '',
    docNumber: '',
    phone: '',
    city: '',
    state: 'SP',
    businessType: 'Revendedora Autônoma',
    email: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Persist wholesale registration lead to Firebase Firestore
      await addDoc(collection(db, 'wholesale_leads'), {
        name: formData.name.slice(0, 100),
        whatsapp: formData.phone.slice(0, 30),
        document: formData.docNumber.slice(0, 30),
        cityState: `${formData.city}/${formData.state}`.slice(0, 100),
        storeType: formData.businessType.slice(0, 50),
        email: formData.email ? formData.email.slice(0, 100) : '',
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Salvando offline ou erro de sincronização:', error);
      // Don't block the user, log proper error
      handleFirestoreError(error, OperationType.CREATE, 'wholesale_leads');
    } finally {
      setIsSaving(false);
      setSubmitted(true);
    }
  };

  const handleOpenWhatsAppCatalog = () => {
    const text = `*CADASTRO DE ATACADO - CAIO LEVI CALÇADOS*%0A%0A*Nome:* ${formData.name}%0A*CPF/CNPJ:* ${formData.docNumber}%0A*WhatsApp:* ${formData.phone}%0A*Cidade/UF:* ${formData.city}/${formData.state}%0A*Tipo de Negócio:* ${formData.businessType}%0A%0A_Gostaria de receber a tabela de atacado e catálogo em PDF._`;
    const waUrl = `https://wa.me/5514918993334?text=${text}`;
    window.open(waUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-xs shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-8 text-amber-400 shrink-0">
              <svg
                viewBox="0 0 160 200"
                className="w-full h-full fill-none"
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
              <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-white">
                Cadastro de Atacado & Revenda
              </h2>
              <p className="text-[11px] text-neutral-400">
                Caio Levi Calçados · Jaú/SP Capital do Calçado
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto max-h-[80vh]">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold uppercase text-black">
                Cadastro Recebido com Sucesso!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
                Parabéns, {formData.name}! Suas condições exclusivas para comprar a partir de 6 pares direto de Jaú foram liberadas.
              </p>

              <div className="pt-4 space-y-2">
                <button
                  onClick={handleOpenWhatsAppCatalog}
                  className="w-full py-3 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Chamar no WhatsApp e Pegar Catálogo</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  Continuar Navegando na Loja
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-xs text-xs text-neutral-700">
                <div className="flex items-center gap-1.5 font-bold text-black uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Vantagens do Cadastro Direto da Fábrica:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-neutral-600 text-[11px]">
                  <li>Tabela de preços exclusiva direto da fábrica liberada via WhatsApp</li>
                  <li>Grade 100% livre (sem obrigação de caixa fechada)</li>
                  <li>Mínimo de apenas 6 pares mesclando modelos</li>
                </ul>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                  Nome Completo ou Razão Social *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: Simone Purcina ou Boutique Elegance"
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                    CPF ou CNPJ *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.docNumber}
                    onChange={(e) => setFormData({ ...formData, docNumber: e.target.value })}
                    placeholder="000.000.000-00"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs focus:outline-hidden focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                    WhatsApp com DDD *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 90000-0000"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ex: Jaú, São Paulo, BH..."
                    className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs focus:outline-hidden focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                    UF *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-2 py-2 border border-neutral-300 rounded-xs text-xs bg-white focus:outline-hidden focus:border-black"
                  >
                    <option value="SP">SP</option>
                    <option value="MG">MG</option>
                    <option value="RJ">RJ</option>
                    <option value="PR">PR</option>
                    <option value="SC">SC</option>
                    <option value="RS">RS</option>
                    <option value="GO">GO</option>
                    <option value="BA">BA</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-black mb-1">
                  Como você revende?
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-xs text-xs bg-white focus:outline-hidden focus:border-black"
                >
                  <option value="Revendedora Autônoma / Sacoleira">Revendedora Autônoma / Sacoleira</option>
                  <option value="Loja Física de Calçados / Moda">Loja Física de Calçados / Moda</option>
                  <option value="Loja Online / Shopee / Mercado Livre">Loja Online / Shopee / Mercado Livre</option>
                  <option value="Boutique Multimarcas">Boutique Multimarcas</option>
                  <option value="Quero começar a revender agora">Quero começar a revender agora</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full py-3 bg-black hover:bg-neutral-800 disabled:bg-neutral-600 text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Salvando Cadastro no Firebase...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Liberar Catálogo e Preços de Fábrica</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
