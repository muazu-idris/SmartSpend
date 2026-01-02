
import React, { useState, useEffect, useRef } from 'react';
import { Transaction, SavingsTip } from '../types';
import { getSavingsTips } from '../services/geminiService';

interface SavingsTipsProps {
  transactions: Transaction[];
  currencySymbol: string;
}

export const SavingsTips: React.FC<SavingsTipsProps> = ({ transactions, currencySymbol }) => {
  const [tips, setTips] = useState<SavingsTip[]>([]);
  const [loading, setLoading] = useState(false);
  const lastTransactionCount = useRef(transactions.length);

  const fetchTips = async () => {
    if (transactions.length === 0) return;
    setLoading(true);
    const newTips = await getSavingsTips(transactions, currencySymbol);
    setTips(newTips);
    setLoading(false);
  };

  useEffect(() => {
    // Automatically fetch tips when a new transaction is added
    if (transactions.length > 0 && transactions.length !== lastTransactionCount.current) {
      fetchTips();
      lastTransactionCount.current = transactions.length;
    } else if (transactions.length > 0 && tips.length === 0) {
      // Initial load
      fetchTips();
      lastTransactionCount.current = transactions.length;
    }
  }, [transactions.length]);

  return (
    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl overflow-hidden relative border border-slate-800">
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
        <i className="fas fa-robot text-8xl"></i>
      </div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold">AI Savings Advisor</h3>
          <p className="text-slate-400 text-sm">Real-time financial guidance</p>
        </div>
        <button 
          onClick={fetchTips}
          disabled={loading || transactions.length === 0}
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-900/20"
        >
          {loading ? (
            <i className="fas fa-circle-notch animate-spin"></i>
          ) : (
            <i className="fas fa-wand-magic-sparkles"></i>
          )}
          Analyze
        </button>
      </div>

      <div className="space-y-4 relative z-10">
        {transactions.length === 0 ? (
          <div className="text-center py-10 text-slate-500 italic">
            Add some transactions to get smart advice!
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-400">
             <div className="relative mb-4">
                <i className="fas fa-brain text-4xl animate-pulse text-indigo-400"></i>
                <div className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </div>
             </div>
             <p className="text-sm font-medium">Analyzing your recent spending...</p>
          </div>
        ) : tips.length > 0 ? (
          tips.map((tip, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition-all transform hover:scale-[1.01]">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  tip.impact === 'High' ? 'bg-rose-500/20 text-rose-400' : 
                  tip.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {tip.impact} Impact
                </span>
                <h4 className="font-bold text-slate-100">{tip.title}</h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{tip.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-500">
             Something went wrong. Try refreshing.
          </div>
        )}
      </div>
    </div>
  );
};
