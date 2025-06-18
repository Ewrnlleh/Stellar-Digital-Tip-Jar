"use client";

import React, { useState } from "react";
import WalletConnect from '../components/WalletConnect';
import TipJar from '../components/TipJar';

export default function HomePage() {
  const [publicKey, setPublicKey] = useState("");
  const [benefactor] = useState("GDGQVBCP2G2OQO2FN2L4BCHIGK6SFWGZMXBOVIQ3G7GOJ5O6GDY5J6NT");

  return (
    // Stillerin tekrar <main> elementine eklendiğinden emin olun.
    <main className="min-h-screen w-full grid place-items-center p-4 bg-slate-900 text-slate-200">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/20 ring-1 ring-white/10">
          <header className="text-center p-6 md:p-8 border-b border-white/10">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-sky-300">
              Dijital Bahşiş Kutusu
            </h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base">Stellar/Soroban ile anında destek.</p>
          </header>
          <div className="p-6 md:p-8 space-y-8">
            <WalletConnect publicKey={publicKey} setPublicKey={setPublicKey} />
            <TipJar publicKey={publicKey} benefactorAddress={benefactor} />
          </div>
        </div>
        <footer className="text-center mt-6 text-slate-500 text-xs">
          <p>Bu DApp, Stellar Testnet üzerinde çalışmaktadır.</p>
        </footer>
      </div>
    </main>
  );
}
