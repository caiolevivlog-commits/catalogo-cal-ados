/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './data/products';

import { TopBar } from './components/TopBar';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { SizeFilterBar } from './components/SizeFilterBar';
import { ValueProps } from './components/ValueProps';
import { ShopeeShowcase } from './components/ShopeeShowcase';
import { WholesaleRules } from './components/WholesaleRules';
import { OutletSection } from './components/OutletSection';
import { AboutSection } from './components/AboutSection';
import { Testimonials } from './components/Testimonials';
import { InstagramGallery } from './components/InstagramGallery';
import { Footer } from './components/Footer';

import { ProductZoomModal } from './components/ProductZoomModal';
import { CartDrawer } from './components/CartDrawer';
import { WholesaleModal } from './components/WholesaleModal';
import { ImageLinksModal } from './components/ImageLinksModal';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  // Load products from localStorage or use INITIAL_PRODUCTS (v4 reflects all 68 official Shopee ads)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('caio_levi_shopee_v4');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCTS;
  });

  // Save products when modified (e.g. via direct image links modal)
  useEffect(() => {
    try {
      localStorage.setItem('caio_levi_shopee_v4', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('caio_levi_cart_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'cart-init-1',
        product: INITIAL_PRODUCTS[0],
        selectedSize: 36,
        quantity: 2,
      },
      {
        id: 'cart-init-2',
        product: INITIAL_PRODUCTS[1],
        selectedSize: 37,
        quantity: 2,
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('caio_levi_cart_v3', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Filtering & search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  // Modals state
  const [zoomProduct, setZoomProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWholesaleModalOpen, setIsWholesaleModalOpen] = useState(false);
  const [isImageLinksModalOpen, setIsImageLinksModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: number) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const newItem: CartItem = {
        id: `${product.id}-${size}-${Date.now()}`,
        product,
        selectedSize: size,
        quantity: 1,
      };
      return [...prev, newItem];
    });

    showToast(`Adicionado: ${product.name.slice(0, 30)}... (Tam ${size})`);
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Direct image links update
  const handleUpdateProductImage = (productId: string, newImageUrl: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const gallery = p.galleryImages ? [newImageUrl, ...p.galleryImages.slice(1)] : [newImageUrl];
          return {
            ...p,
            image: newImageUrl,
            galleryImages: gallery,
          };
        }
        return p;
      })
    );
    showToast('Imagem atualizada com sucesso no catálogo!');
  };

  const handleResetImages = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('caio_levi_shopee_v3');
    showToast('Anúncios restaurados para o padrão oficial da Shopee.');
  };

  // Calculate cart stats
  const totalPairsInCart = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isWholesaleActive = totalPairsInCart >= 6;
  const cartTotalValue = cartItems.reduce((acc, item) => {
    const unitPrice = isWholesaleActive ? item.product.wholesalePrice : item.product.shopeePrice;
    return acc + unitPrice * item.quantity;
  }, 0);

  // Filtered products list
  const filteredProducts = products.filter((product) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchRef = product.reference.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      const matchGroup = product.groupName.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      if (!matchName && !matchRef && !matchCat && !matchGroup && !matchDesc) return false;
    }

    // Category filter
    if (activeCategory === 'outlet') {
      if (!product.isOutlet) return false;
    } else if (activeCategory !== 'todos') {
      if (product.category !== activeCategory) return false;
    }

    // Size filter
    if (selectedSize !== null) {
      if (!product.availableSizes.includes(selectedSize)) return false;
    }

    return true;
  });

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-sans selection:bg-black selection:text-white">
      
      {/* 1. Announcement Bar */}
      <TopBar />

      {/* 2. Main Sticky Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartTotal={cartTotalValue}
        cartItemsCount={totalPairsInCart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWholesaleModal={() => setIsWholesaleModalOpen(true)}
        onOpenImageLinksModal={() => setIsImageLinksModalOpen(true)}
      />

      {/* 3. Category Navigation with Shopee Groups */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (cat === 'outlet') {
            handleScrollToSection('outlet');
          } else {
            handleScrollToSection('anuncios-reais');
          }
        }}
        onOpenWholesaleModal={() => setIsWholesaleModalOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* 4. Hero Carousel Banner */}
      <HeroBanner
        onOpenWholesaleModal={() => setIsWholesaleModalOpen(true)}
        onExploreOutlet={() => {
          setActiveCategory('outlet');
          handleScrollToSection('outlet');
        }}
      />

      {/* 5. Size Filter Strip (34 ao 40) */}
      <SizeFilterBar
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
      />

      {/* 6. Four Value Props Cards */}
      <ValueProps />

      {/* Shopee Storefront Synchronization Banner */}
      <div className="max-w-7xl mx-auto px-4 mt-2">
        <div className="bg-white p-3 rounded-xs border border-neutral-200/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-2 text-neutral-700">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EE4D2D] inline-block shrink-0 animate-ping" />
            <span>
              <strong>Loja Oficial Sincronizada:</strong> Todos os 68 anúncios publicados na aba produtos em <strong className="text-black">collshp.com/_caiolevii014</strong> estão disponíveis com fotos rotativas, compra na Shopee e consulta direta de atacado no WhatsApp.
            </span>
          </div>
          <a
            href="https://collshp.com/_caiolevii014?share_channel_code=1&view=storefront"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-wider text-[#EE4D2D] hover:underline cursor-pointer shrink-0"
          >
            Abrir Storefront Shopee ↗
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Active Filters Bar if any filter is active */}
        {(selectedSize !== null || activeCategory !== 'todos' || searchQuery) && (
          <div className="max-w-7xl mx-auto px-4 pt-4">
            <div className="bg-neutral-100 p-2.5 rounded-xs flex items-center justify-between text-xs flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase text-neutral-600">Filtros ativos:</span>
                {activeCategory !== 'todos' && (
                  <span className="bg-white px-2 py-0.5 rounded-2xs border border-neutral-300 font-semibold">
                    Categoria: {activeCategory.toUpperCase()}
                  </span>
                )}
                {selectedSize !== null && (
                  <span className="bg-white px-2 py-0.5 rounded-2xs border border-neutral-300 font-semibold">
                    Tamanho: {selectedSize}
                  </span>
                )}
                {searchQuery && (
                  <span className="bg-white px-2 py-0.5 rounded-2xs border border-neutral-300 font-semibold">
                    Busca: &quot;{searchQuery}&quot;
                  </span>
                )}
                <span className="text-neutral-500">({filteredProducts.length} encontrados)</span>
              </div>

              <button
                onClick={() => {
                  setSelectedSize(null);
                  setActiveCategory('todos');
                  setSearchQuery('');
                }}
                className="text-neutral-700 hover:text-black font-bold uppercase underline cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          </div>
        )}

        {/* 7. Shopee & Atacado Showcase (Anúncios Reais Caio Levi with Staggered Rotation) */}
        <ShopeeShowcase
          products={filteredProducts.length > 0 ? filteredProducts : products}
          onOpenZoom={(product) => setZoomProduct(product)}
          onAddToCart={handleAddToCart}
        />

        {/* 8. Wholesale Guidelines (Polo Calçadista de Jaú / SP) */}
        <WholesaleRules
          onOpenWholesaleModal={() => setIsWholesaleModalOpen(true)}
        />

        {/* 9. Destaques & Outlet Section */}
        <OutletSection
          products={products}
          onOpenZoom={(product) => setZoomProduct(product)}
          onAddToCart={handleAddToCart}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            handleScrollToSection('outlet');
          }}
        />

        {/* 10. About Caio Levi in Jaú/SP (Dark Banner) */}
        <AboutSection
          onOpenWholesaleModal={() => setIsWholesaleModalOpen(true)}
        />

        {/* 11. Customer Reviews & Testimonials */}
        <Testimonials />

        {/* 12. Instagram & Shopee Community Gallery */}
        <InstagramGallery />

      </main>

      {/* 13. Comprehensive Footer */}
      <Footer
        onOpenWholesaleModal={() => setIsWholesaleModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <ProductZoomModal
        product={zoomProduct}
        onClose={() => setZoomProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <WholesaleModal
        isOpen={isWholesaleModalOpen}
        onClose={() => setIsWholesaleModalOpen(false)}
      />

      <ImageLinksModal
        products={products}
        isOpen={isImageLinksModalOpen}
        onClose={() => setIsImageLinksModalOpen(false)}
        onUpdateProductImage={handleUpdateProductImage}
        onResetImages={handleResetImages}
      />

      {/* Floating Action Button for Wholesale WhatsApp */}
      <div className="fixed bottom-4 right-4 z-30 flex flex-col gap-2">
        <a
          href="https://wa.me/5514918993334?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20de%20atacado%20na%20Caio%20Levi."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-14 sm:h-14 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 hover:scale-105"
          title="Fale no WhatsApp com a Fábrica em Jaú"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-1.118-.057-.267-.085-.609-.222-1.05-.414-1.871-.814-3.096-2.73-3.19-2.855-.094-.124-.76-1.012-.76-1.93 0-.918.481-1.37.653-1.558.172-.187.375-.234.5-.234.125 0 .25.002.359.007.117.006.273-.044.428.327.16.381.547 1.332.595 1.43.048.098.08.213.016.339-.064.127-.097.206-.192.318-.096.111-.202.248-.288.334-.096.095-.197.199-.085.39.112.192.498.822 1.069 1.33 1.01.899 1.862 1.178 2.054 1.273.192.095.304.079.416-.048.113-.127.48-1.013.608-1.362.129-.349.256-.29.43-.228.174.063 1.107.522 1.299.617.192.096.32.143.368.223.048.079.048.461-.096.866z"/>
          </svg>
        </a>
      </div>

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-4 left-4 z-50 bg-black text-white px-4 py-2.5 rounded-xs shadow-xl flex items-center gap-2 text-xs font-semibold animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
