import React, { useState, useEffect } from 'react';
import { Phone, Eye, CloudCheck } from 'lucide-react';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore';

export const TopBar: React.FC = () => {
  const [viewCount, setViewCount] = useState<number>(3482);
  const [isSynced, setIsSynced] = useState<boolean>(false);

  useEffect(() => {
    const statsDocRef = doc(db, 'stats', 'page_views');

    // 1. Listen to real-time synchronized views from Firestore
    const unsubscribe = onSnapshot(
      statsDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          if (data && typeof data.count === 'number') {
            setViewCount(data.count);
            setIsSynced(true);
          }
        } else {
          // Initialize first count in Firestore
          setDoc(statsDocRef, { count: 3482, lastUpdated: new Date().toISOString() }, { merge: true })
            .catch((err) => handleFirestoreError(err, OperationType.WRITE, 'stats/page_views'));
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, 'stats/page_views');
      }
    );

    // 2. Increment view count in Firebase once per session
    const sessionKey = 'caio_levi_view_incremented';
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, 'true');
      setDoc(
        statsDocRef,
        {
          count: increment(1),
          lastUpdated: new Date().toISOString(),
        },
        { merge: true }
      ).catch((err) => {
        // Fallback silently if offline or initial handshake
        console.warn('Initial increment pending connection:', err);
      });
    }

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-black text-white text-[11px] md:text-xs py-2 px-3 tracking-wide border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-center font-medium">
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="font-bold text-amber-300">PEDIDO MÍNIMO ATACADO: 6 PARES SORTIDOS</span>
          <span className="text-neutral-500 hidden sm:inline">•</span>
          <span className="hidden sm:inline">JAÚ/SP CAPITAL DO CALÇADO</span>
          <span className="text-neutral-500 hidden md:inline">|</span>
          <span className="hidden md:inline text-neutral-300">DIRETO DA FÁBRICA • ENVIAMOS PARA TODO O BRASIL</span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
          {/* Contador de Visualizações da Página sincronizado no Firebase */}
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-neutral-900 border border-neutral-700/80 rounded-2xs text-[10px] sm:text-[11px] text-neutral-300 select-none shadow-xs"
            title={isSynced ? 'Visualizações sincronizadas em tempo real com Firebase Firestore' : 'Visualizações da loja'}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0 animate-pulse" />
            <span className="text-neutral-400 font-normal">Visualizações:</span>
            <strong className="text-white font-extrabold font-mono tracking-wider">
              {viewCount.toLocaleString('pt-BR')}
            </strong>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" title="Conectado ao Firebase" />
          </div>

          <a
            href="https://wa.me/5514918993334?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Caio%20Levi%20e%20gostaria%20de%20informa%C3%A7%C3%B5es%20do%20atacado."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-neutral-200 hover:text-emerald-400 transition-colors font-semibold py-0.5"
            title="Fale direto com a fábrica em Jaú/SP"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>WHATSAPP: (14) 91899-3334</span>
          </a>
        </div>
      </div>
    </div>
  );
};
