
import React from 'react';
import { Transaction, TransactionType } from '../types';
import { CATEGORY_COLORS, CURRENCY_SYMBOLS } from '../constants';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const sorted = [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">Recent Activity</h3>
        <span className="text-xs font-semibold text-slate-400 uppercase">{transactions.length} Total</span>
      </div>
      <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
        {sorted.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <i className="fas fa-receipt text-3xl mb-3 opacity-20"></i>
            <p>No transactions yet</p>
          </div>
        ) : (
          sorted.map((t) => (
            <div key={t.id} className="p-4 hover:bg-slate-50 group flex items-center gap-4 transition-colors">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm"
                style={{ backgroundColor: CATEGORY_COLORS[t.category] || '#94a3b8' }}
              >
                <i className={`fas ${t.type === TransactionType.INCOME ? 'fa-plus' : 'fa-minus'} text-xs`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-slate-800 truncate">{t.description}</h4>
                  <span className={`font-bold shrink-0 ${t.type === TransactionType.INCOME ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {t.type === TransactionType.INCOME ? '+' : '-'}
                    {CURRENCY_SYMBOLS[t.currency || 'USD']}
                    {t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-500">{t.category} • {new Date(t.date).toLocaleDateString()}</span>
                  <button 
                    onClick={() => onDelete(t.id)}
                    className="text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                  >
                    <i className="fas fa-trash-alt text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
