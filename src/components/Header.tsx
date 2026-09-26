import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Link as LinkIcon, LogOut, CheckCircle2 } from 'lucide-react';
import { CaioLeviLogo } from './CaioLeviLogo';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartTotal: number;
  cartItemsCount: number;
  onOpenCart: () => void;
  onOpenWholesaleModal: () => void;
  onOpenImageLinksModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartTotal,
  cartItemsCount,
  onOpenCart,
  onOpenWholesaleModal,
  onOpenImageLinksModal,
}) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [liveViews, setLiveViews] = useState<number>(3482);

  // Sync auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Save/Sync user profile in Firestore
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(userDocRef);
          if (!docSnap.exists()) {
            await setDoc(userDocRef, {
              uid: user.uid,
              name: (user.displayName || 'Cliente Caio Levi').slice(0, 100),
              email: (user.email || '').slice(0, 150),
              createdAt: new Date().toISOString(),
              buyerType: 'varejo',
            });
          }
        } catch (err) {
          console.warn('Syncing user profile:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Listen to Firestore real-time page views
  useEffect(() => {
    const statsDocRef = doc(db, 'stats', 'page_views');
    const unsub = onSnapshot(statsDocRef, (snap) => {
      if (snap.exists()) {
        const val = snap.data()?.count;
        if (typeof val === 'number') {
          setLiveViews(val);
        }
      }
    }, (error) => {
      console.warn('Page views listener notice:', error);
    });

    return () => unsub();
  }, []);

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Erro ao sair:', error);
    }
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Search Bar */}
        <div className="w-1/3 max-w-xs relative hidden sm:block">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar saltos, rasteiras, birkens..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm border border-neutral-300 rounded-sm focus:outline-hidden focus:border-black transition-colors placeholder:text-neutral-400 bg-neutral-50/50"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Brand Logo & Jaú Origin */}
        <div className="flex-1 sm:flex-initial text-center flex flex-col items-center justify-center cursor-pointer group">
          <div className="flex items-center gap-2.5">
            {/* Authentic Caio Levi Handcrafted Monogram */}
            <div className="w-8 h-10 sm:w-9 sm:h-11 flex items-center justify-center shrink-0">
              <svg
                viewBox="0 0 160 200"
                className="w-full h-full text-black transition-transform group-hover:scale-105"
                fill="none"
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

            <div className="text-left leading-none flex flex-col justify-center">
              <span className="font-brand-caio text-2xl sm:text-3xl tracking-wider text-black lowercase first-letter:uppercase leading-none select-none hover:opacity-90 transition-opacity">
                Caio Levi
              </span>
              <p className="text-[8px] sm:text-[9px] uppercase tracking-widest text-neutral-500 font-semibold mt-0.5">
                DE JAÚ/SP · DIRETO DA FÁBRICA
              </p>
            </div>
          </div>
        </div>

        {/* User Account, Direct Image Links, Firebase Counter & Cart */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Contador de Visualizações em tempo real conectado com Firebase */}
          <div
            className="flex items-center gap-1.5 px-2 py-1 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-sm text-[10px] sm:text-[11px] text-neutral-800 transition-colors select-none"
            title="Total de acessos e visualizações sincronizados no Firebase"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="hidden sm:inline text-neutral-600 font-medium">Acessos:</span>
            <strong className="font-extrabold font-mono text-black">
              {liveViews.toLocaleString('pt-BR')}
            </strong>
          </div>

          {/* Direct HTML Image Links Action */}
          <button
            onClick={onOpenImageLinksModal}
            className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold text-neutral-700 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-sm border border-neutral-300 transition-colors"
            title="Ver e adicionar links diretos para as imagens do HTML"
          >
            <LinkIcon className="w-3.5 h-3.5 text-neutral-600" />
            <span>Links das Imagens</span>
          </button>

          {/* Firebase Authentication (Google Login / Active User profile) */}
          {currentUser ? (
            <div className="hidden md:flex items-center gap-2 text-left">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'Usuário'}
                  className="w-8 h-8 rounded-full border border-neutral-300 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'U'}
                </div>
              )}
              <div className="text-[11px] leading-tight">
                <span className="block text-neutral-500 font-normal uppercase text-[9px] truncate max-w-[90px]">
                  {currentUser.displayName?.split(' ')[0] || 'Conectado'}
                </span>
                <button
                  onClick={handleSignOut}
                  className="font-bold text-neutral-700 hover:text-red-600 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  title="Sair da conta"
                >
                  <span>Sair</span>
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              disabled={isAuthenticating}
              className="hidden md:flex items-center gap-2 text-left group hover:opacity-80 transition-opacity cursor-pointer"
              title="Entrar com conta Google / Firebase"
            >
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200 group-hover:border-black transition-colors">
                <User className="w-4 h-4 text-neutral-700" />
              </div>
              <div className="text-[11px] leading-tight">
                <span className="block text-neutral-500 font-normal uppercase text-[9px]">Firebase Auth</span>
                <span className="font-bold text-black uppercase tracking-wider">
                  {isAuthenticating ? 'Entrando...' : 'Entrar Google'}
                </span>
              </div>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 pl-2 sm:pl-3 py-1.5 rounded-sm hover:bg-neutral-50 transition-colors group cursor-pointer"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6 text-black group-hover:scale-105 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartItemsCount}
                </span>
              )}
            </div>
            <div className="text-left text-xs leading-tight hidden xs:block">
              <span className="block text-neutral-500 text-[10px] uppercase font-medium">Carrinho</span>
              <span className="font-bold text-emerald-600 text-xs sm:text-sm">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </button>
        </div>

      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-2.5 pt-1">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar saltos, rasteiras, birkens..."
            className="w-full pl-8 pr-3 py-1.5 text-xs border border-neutral-300 rounded-sm focus:outline-hidden focus:border-black"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </header>
  );
};
