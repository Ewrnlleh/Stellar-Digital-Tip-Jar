// Bu dosya: components/TipJar.tsx
"use client";

import React, { useState } from "react";
import { handleTipTransaction } from '../lib/soroban';

// --- İkonlar (SVG) ---
const LoadingSpinner = () => <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>;
const AlertTriangleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 011-1h.008a1 1 0 011 1v3.008a1 1 0 01-1 1H9a1 1 0 01-1-1V5z" clipRule="evenodd" /></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;
const ExternalLinkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>;

// --- Bildirim Kutusu Bileşeni ---
const Alert = ({ type, message }: { type: 'info' | 'success' | 'error', message: string }) => {
  const colors = {
    info: 'bg-blue-900/50 text-blue-300 ring-blue-500/30',
    success: 'bg-green-900/50 text-green-300 ring-green-500/30',
    error: 'bg-red-900/50 text-red-300 ring-red-500/30',
  };
  const Icon = { info: InfoIcon, success: CheckCircleIcon, error: AlertTriangleIcon }[type];
  
  if (!message) return null;
  return (
    <div className={`flex items-center p-3 rounded-lg ring-1 transition-all duration-300 ${colors[type]}`}>
      <Icon />
      <span className="text-sm">{message}</span>
    </div>
  );
};

interface TipJarProps {
  publicKey: string;
  benefactorAddress: string;
}

export default function TipJar({ publicKey, benefactorAddress }: TipJarProps) {
  const [tipAmount, setTipAmount] = useState(5);
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const CONTRACT_ID = "CDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

  const onTipSubmit = async () => {
    setIsProcessing(true);
    setTxHash("");
    setError("");
    await handleTipTransaction(publicKey, CONTRACT_ID, tipAmount, {
      setMessage,
      setError,
      setTxHash,
    });
    setIsProcessing(false);
  };
  
  return (
    <div className="space-y-6">
      {/* Adım 1 */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-200 flex items-center">
          <span className="flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold rounded-full bg-slate-700 text-sky-300 ring-1 ring-slate-600">1</span>
          Bahşiş Miktarını Seç
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {[1, 5, 10].map(amount => (
            <button
              key={amount}
              onClick={() => setTipAmount(amount)}
              className={`py-3 px-2 rounded-lg font-bold transition-all duration-200 text-center border-2 border-transparent
                ${tipAmount === amount 
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 border-sky-400' 
                  : 'bg-slate-700/50 hover:bg-slate-700 text-slate-300'
                }`}
            >
              <span className="text-lg">{amount}</span>
              <span className="text-xs ml-1">XLM</span>
            </button>
          ))}
        </div>
      </div>

      {/* Adım 2 */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-200 flex items-center">
          <span className="flex items-center justify-center w-6 h-6 mr-3 text-sm font-bold rounded-full bg-slate-700 text-sky-300 ring-1 ring-slate-600">2</span>
          Desteğini Gönder
        </h3>
        <button
          onClick={onTipSubmit}
          disabled={isProcessing || !publicKey}
          className="w-full flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed disabled:text-slate-400 shadow-lg hover:shadow-emerald-500/30 disabled:shadow-none"
        >
          {isProcessing ? <LoadingSpinner /> : null}
          {isProcessing ? message || "İşleniyor..." : `Gönder (${tipAmount} XLM)`}
        </button>
      </div>
      
      {/* Geri Bildirim Alanı */}
      <div className="pt-2 min-h-[60px]">
        {error && <Alert type="error" message={error} />}
        {txHash && (
           <div className="space-y-2 text-center p-3 rounded-lg bg-slate-700/50 ring-1 ring-white/10">
            <Alert type="success" message="Bahşiş başarıyla gönderildi!" />
            <a
              href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 text-sm mt-2 inline-block font-mono break-all"
            >
              İşlemi Görüntüle <ExternalLinkIcon />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
