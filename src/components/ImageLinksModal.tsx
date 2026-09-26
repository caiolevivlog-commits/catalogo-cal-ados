import React, { useState } from 'react';
import { Product } from '../types';
import { X, Link as LinkIcon, Check, Copy, RefreshCw, Plus, CheckCircle2, Code } from 'lucide-react';

interface ImageLinksModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateProductImage: (productId: string, newImageUrl: string) => void;
  onResetImages: () => void;
}

export const ImageLinksModal: React.FC<ImageLinksModalProps> = ({
  products,
  isOpen,
  onClose,
  onUpdateProductImage,
  onResetImages,
}) => {
  if (!isOpen) return null;

  const [editedUrls, setEditedUrls] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    products.forEach((p) => {
      initial[p.id] = p.image;
    });
    return initial;
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);

  const handleUrlChange = (id: string, value: string) => {
    setEditedUrls((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = (id: string) => {
    const newUrl = editedUrls[id];
    if (newUrl) {
      onUpdateProductImage(id, newUrl.trim());
      setSavedId(id);
      setTimeout(() => setSavedId(null), 2000);
    }
  };

  const handleCopyHtml = (product: Product) => {
    const url = editedUrls[product.id] || product.image;
    const tag = `<img src="${url}" alt="${product.name}" class="caio-levi-calcado" />`;
    navigator.clipboard.writeText(tag);
    setCopiedId(product.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-xs shadow-2xl flex flex-col overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-neutral-200 flex items-center justify-between bg-neutral-900 text-white">
          <div className="flex items-center gap-2">
            <LinkIcon className="w-4 h-4 text-emerald-400" />
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                Gerenciador de Links Diretos para Imagens do HTML
              </h2>
              <p className="text-[10px] text-neutral-400">
                Personalize, adicione ou copie as URLs diretas das fotos para usar no HTML
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

        {/* Informative banner answering user request */}
        <div className="p-3 bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <strong>Sim, é totalmente possível adicionar links diretos para as imagens do HTML!</strong>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Você pode colar links diretos de qualquer hospedagem de imagens (Unsplash, Shopee, Imgur, seu próprio servidor ou CDN). O app atualiza a tela em tempo real.
            </p>
          </div>
        </div>

        {/* Products List with image inputs */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {products.map((product) => {
            const currentInputUrl = editedUrls[product.id] || product.image;
            const isSaved = savedId === product.id;
            const isCopied = copiedId === product.id;

            return (
              <div
                key={product.id}
                className="bg-neutral-50 p-3.5 sm:p-4 border border-neutral-200 rounded-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                {/* Thumbnail Preview */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white border border-neutral-300 rounded-xs overflow-hidden shrink-0 flex items-center justify-center p-1 relative shadow-2xs">
                  <img
                    src={currentInputUrl}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                  <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[8px] font-bold px-1 rounded-2xs">
                    {product.reference.replace('REF: ', '')}
                  </span>
                </div>

                {/* Input & Actions */}
                <div className="flex-1 w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xs uppercase text-black line-clamp-1">
                      {product.name}
                    </h3>
                    <span className="text-[10px] font-semibold text-neutral-500 uppercase">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="url"
                        value={currentInputUrl}
                        onChange={(e) => handleUrlChange(product.id, e.target.value)}
                        placeholder="Cole o link direto da imagem (ex: https://.../foto.jpg)"
                        className="w-full px-2.5 py-1.5 text-xs font-mono border border-neutral-300 rounded-xs bg-white focus:outline-hidden focus:border-black"
                      />
                    </div>

                    <button
                      onClick={() => handleSave(product.id)}
                      className={`px-3 py-1.5 text-xs font-bold uppercase rounded-xs transition-colors cursor-pointer shrink-0 ${
                        isSaved
                          ? 'bg-emerald-600 text-white'
                          : 'bg-black hover:bg-neutral-800 text-white'
                      }`}
                    >
                      {isSaved ? 'Salvo!' : 'Aplicar'}
                    </button>
                  </div>

                  {/* HTML Snippet and Copy Button */}
                  <div className="flex items-center justify-between pt-1 text-[11px] text-neutral-500">
                    <div className="font-mono text-[10px] text-neutral-600 truncate max-w-xs sm:max-w-md bg-white px-2 py-0.5 border border-neutral-200 rounded-2xs">
                      &lt;img src=&quot;{currentInputUrl.slice(0, 45)}...&quot; alt=&quot;{product.name}&quot; /&gt;
                    </div>

                    <button
                      onClick={() => handleCopyHtml(product)}
                      className="inline-flex items-center gap-1 text-black font-semibold hover:text-emerald-700 transition-colors ml-2 shrink-0 cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Code className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copiado!' : 'Copiar Tag HTML'}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-3 sm:p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <button
            onClick={onResetImages}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-red-600 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restaurar Imagens Originais</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            Concluir
          </button>
        </div>

      </div>
    </div>
  );
};
