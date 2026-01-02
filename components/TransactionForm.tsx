
import React, { useState } from 'react';
import { TransactionType, Category, Transaction, CurrencyCode } from '../types';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES, CURRENCIES, CURRENCY_SYMBOLS } from '../constants';

interface TransactionFormProps {
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({ onAdd }) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [category, setCategory] = useState<Category>('Food');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) return;

    onAdd({
      type,
      category,
      currency,
      amount: parseFloat(amount),
      description: description || category,
      date
    });

    // Reset form
    setAmount('');
    setDescription('');
  };

  const categories = type === TransactionType.INCOME ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
      <h3 className="text-xl font-bold mb-6 text-slate-800">New Transaction</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => { setType(TransactionType.EXPENSE); setCategory('Food'); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              type === TransactionType.EXPENSE 
                ? 'bg-white text-rose-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => { setType(TransactionType.INCOME); setCategory('Salary'); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              type === TransactionType.INCOME 
                ? 'bg-white text-emerald-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Income
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {CURRENCIES.map(curr => (
                <option key={curr.code} value={curr.code}>{curr.code} ({curr.symbol})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-medium">
                {CURRENCY_SYMBOLS[currency]}
              </span>
              <input
                type="number"
                step="0.01"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What was this for?"
            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-transform active:scale-95 ${
            type === TransactionType.EXPENSE ? 'bg-rose-500 hover:bg-rose-600' : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          Add {type === TransactionType.EXPENSE ? 'Expense' : 'Income'}
        </button>
      </form>
    </div>
  );
};
