
import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, TransactionType, SummaryData } from './types';
import { Dashboard } from './components/Dashboard';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Analytics } from './components/Analytics';
import { SavingsTips } from './components/SavingsTips';
import { CURRENCY_SYMBOLS } from './constants';

const STORAGE_KEY = 'smartspend_transactions';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const summary = useMemo<SummaryData>(() => {
    const income = transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    const expense = transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    // Default symbol comes from the most recent transaction, or $ if none exist
    const latestCurrency = transactions.length > 0 ? transactions[0].currency : 'USD';
    const symbol = CURRENCY_SYMBOLS[latestCurrency] || '$';

    return {
      totalIncome: income,
      totalExpense: expense,
      netSavings: income - expense,
      currencySymbol: symbol
    };
  }, [transactions]);

  const addTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substring(2, 9)
    } as Transaction;
    setTransactions(prev => [transaction, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span className="bg-indigo-600 text-white p-2 rounded-xl">
              <i className="fas fa-chart-line"></i>
            </span>
            SmartSpend
          </h1>
          <p className="text-slate-500 mt-2 font-medium">Simplify your finances, amplify your savings.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-white p-2 px-4 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Live Tracker
            </div>
            <button 
                onClick={() => { if(confirm('Clear all data?')) setTransactions([]); }}
                className="text-slate-400 hover:text-rose-500 transition-colors text-sm font-medium"
            >
                Reset Data
            </button>
        </div>
      </header>

      {/* Main Stats */}
      <Dashboard summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Input and Tips */}
        <div className="lg:col-span-1 space-y-8">
          <TransactionForm onAdd={addTransaction} />
          <SavingsTips transactions={transactions} currencySymbol={summary.currencySymbol} />
        </div>

        {/* Center/Right Column: Lists and Charts */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            <Analytics transactions={transactions} currencySymbol={summary.currencySymbol} />
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
        <p>&copy; {new Date().getFullYear()} SmartSpend Tracker. AI Insights powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
