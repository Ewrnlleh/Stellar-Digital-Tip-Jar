// Bu dosya: components/WalletConnect.tsx
"use client";

import React, { useState, useEffect } from "react";
import freighterApi from "@stellar/freighter-api";

// --- İkonlar ---
const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;


interface WalletConnectProps {
  publicKey: string;
  setPublicKey: (key: string) => void;
}

export default function WalletConnect({ publicKey, setPublicKey }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await freighterApi.setAllowed();
      const key = await freighterApi.getPublicKey();
      setPublicKey(key);
    } catch (e) {
      console.error("Freighter bağlantı hatası:", e);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (await freighterApi.isConnected()) {
        const key = await freighterApi.getPublicKey();
        setPublicKey(key);
      }
    };
    window.addEventListener('load', checkConnection);
    return () => window.removeEventListener('load', checkConnection);
  }, [setPublicKey]);

  if (publicKey) {
    return (
      <div className="bg-green-500/10 p-4 rounded-lg ring-1 ring-green-500/30 text-center">
        <h3 className="font-bold text-green-300 flex items-center justify-center">
            <CheckCircleIcon /> Cüzdan Bağlı
        </h3>
        <p className="text-sm font-mono break-all text-slate-400 mt-2">
          {publicKey.substring(0, 10)}...{publicKey.substring(publicKey.length - 10)}
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="w-full flex items-center justify-center bg-gradient-to-br from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:text-slate-400 shadow-lg hover:shadow-blue-500/30 disabled:shadow-none"
    >
      <WalletIcon />
      {isConnecting ? "Bağlanılıyor..." : "Freighter Cüzdanını Bağla"}
    </button>
  );
}
