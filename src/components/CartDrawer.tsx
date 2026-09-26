import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, CheckCircle2, ShieldCheck, QrCode } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const totalPairs = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isWholesaleActive = totalPairs >= 6;
  const remainingForWholesale = Math.max(0, 6 - totalPairs);

  // Subtotal calculations: retail vs wholesale
  const retailSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.shopeePrice * item.quantity,
    0
  );

  const activeSubtotal = cartItems.reduce((acc, item) => {
    const unitPrice = isWholesaleActive
      ? item.product.wholesalePrice
      : item.product.shopeePrice;
    return acc + unitPrice * item.quantity;
  }, 0);

  const savings = Math.max(0, retailSubtotal - activeSubtotal);

  // WhatsApp Order message generation
  const handleSendWhatsAppOrder = () => {
    let message = `*PEDIDO CAIO LEVI CALÇADOS - DIRETO DE JAÚ/SP*%0A%0A`;
    message += `*Total de Pares:* ${totalPairs} pares ${isWholesaleActive ? '(PREÇO DE ATACADO ATIVADO)' : '(VAREJO SHOPEE)'}%0A%0A`;
    message += `*Itens do Pedido:*%0A`;

    cartItems.forEach((item, index) => {
      const unitPrice = isWholesaleActive ? item.product.wholesalePrice : item.product.shopeePrice;
      message += `${index + 1}. ${item.product.name}%0A   - Tamanho: *${item.selectedSize}*%0A   - Quantidade: *${item.quantity} un*%0A   - Valor un: R$ ${unitPrice.toFixed(2).replace('.', ',')}%0A%0A`;
    });

    message += `*VALOR TOTAL:* R$ ${activeSubtotal.toFixed(2).replace('.', ',')}%0A`;
    if (savings > 0) {
      message += `*Economia no Atacado:* R$ ${savings.toFixed(2).replace('.', ',')}%0A`;
    }
    message += `%0APor favor, gostaria de confirmar o frete e dados para pagamento via PIX/Cartão.`;

    const waUrl = `https://wa.me/5514918993334?text=${message}`;
    window.open(waUrl, '_blank');
  };

  const handleSimulateCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      onClearCart();
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-black" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-black">
              Carrinho de Compras ({totalPairs} {totalPairs === 1 ? 'par' : 'pares'})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-colors border border-neutral-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wholesale Unlocker Meter */}
        <div className="p-3 bg-neutral-100/80 border-b border-neutral-200">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className={isWholesaleActive ? 'text-emerald-700 font-bold' : 'text-neutral-700'}>
              {isWholesaleActive
                ? '🎉 PREÇO DE ATACADO ATIVADO!'
                : `Faltam ${remainingForWholesale} ${remainingForWholesale === 1 ? 'par' : 'pares'} para ativar o ATACADO`}
            </span>
            <span className="text-[11px] text-neutral-500 font-bold">
              {Math.min(totalPairs, 6)} / 6 pares
            </span>
          </div>

          <div className="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isWholesaleActive ? 'bg-emerald-600' : 'bg-black'
              }`}
              style={{ width: `${Math.min(100, (totalPairs / 6) * 100)}%` }}
            />
          </div>

          <p className="text-[10px] text-neutral-500 mt-1 leading-snug">
            {isWholesaleActive
              ? 'Você garantiu os valores de fábrica direto de Jaú/SP em todos os itens!'
              : 'O pedido mínimo para preço de atacado de fábrica é de apenas 6 pares sortidos.'}
          </p>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4">
              <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm font-bold text-neutral-800 uppercase tracking-wide">
                Seu carrinho está vazio
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Explore os anúncios reais da fábrica de Jaú/SP e adicione seus pares!
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-black text-white text-xs font-bold uppercase rounded-xs"
              >
                Ver Catálogo
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const unitPrice = isWholesaleActive
                ? item.product.wholesalePrice
                : item.product.shopeePrice;
              const itemTotal = unitPrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className="bg-neutral-50/80 p-3 border border-neutral-200 rounded-xs flex gap-3 items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 bg-white border border-neutral-200 object-contain p-1 rounded-2xs shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold uppercase text-black truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                      <span>Tam: <strong className="text-black font-bold">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span className={isWholesaleActive ? 'text-emerald-700 font-bold' : 'text-neutral-700'}>
                        R$ {unitPrice.toFixed(2).replace('.', ',')} un
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-neutral-300 rounded-2xs bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-black cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-extrabold text-black">
                          R$ {itemTotal.toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Remover par"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-neutral-200 bg-white space-y-3">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Total de Pares:</span>
                <span className="font-bold text-black">{totalPairs} pares</span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Desconto de Atacado (Fábrica):</span>
                  <span>- R$ {savings.toFixed(2).replace('.', ',')}</span>
                </div>
              )}

              <div className="flex justify-between text-sm font-extrabold text-black pt-1.5 border-t border-neutral-200">
                <span>Total Estimado:</span>
                <span className="text-emerald-700 text-base">
                  R$ {activeSubtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {/* Simulated Checkout Success Message */}
            {checkoutSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xs text-xs space-y-1 text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="font-bold uppercase">Pedido Registrado com Sucesso!</p>
                <p className="text-[11px]">Nossa equipe em Jaú entrará em contato via WhatsApp com o código de rastreio.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* WhatsApp Order Action */}
                <button
                  onClick={handleSendWhatsAppOrder}
                  className="w-full py-3 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar Pedido pelo WhatsApp da Fábrica</span>
                </button>

                {/* Simulated PIX / Card Checkout */}
                <button
                  onClick={handleSimulateCheckout}
                  className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pagar com PIX (5% OFF) ou Cartão</span>
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
              <span>Compra 100% Segura · Jaú/SP Polo Calçadista</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
