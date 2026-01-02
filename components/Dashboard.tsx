
import React from 'react';
import { SummaryData } from '../types';

interface DashboardProps {
  summary: SummaryData;
}

export const Dashboard: React.FC<DashboardProps> = ({ summary }) => {
  const formatValue = (val: number) => {
    return Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2 });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Income Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 text-sm font-medium">Total Income</span>
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
            <i className="fas fa-arrow-up"></i>
          </div>
        </div>
        <div 
          key={`income-${summary.totalIncome}`}
          className="text-2xl font-bold text-slate-800 animate-value-change"
        >
          {summary.currencySymbol}{formatValue(summary.totalIncome)}
        </div>
      </div>

      {/* Expense Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 text-sm font-medium">Total Expenses</span>
          <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
            <i className="fas fa-arrow-down"></i>
          </div>
        </div>
        <div 
          key={`expense-${summary.totalExpense}`}
          className="text-2xl font-bold text-slate-800 animate-value-change"
        >
          {summary.currencySymbol}{formatValue(summary.totalExpense)}
        </div>
      </div>

      {/* Savings Card */}
      <div className="bg-indigo-600 p-6 rounded-2xl shadow-lg border border-indigo-700 text-white group transition-all hover:shadow-xl hover:translate-y-[-2px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-indigo-100 text-sm font-medium">Net Savings</span>
          <div className="bg-white/20 p-2 rounded-lg text-white">
            <i className="fas fa-wallet"></i>
          </div>
        </div>
        <div 
          key={`savings-${summary.netSavings}`}
          className="text-2xl font-bold animate-value-change flex items-center gap-1"
        >
          {summary.netSavings < 0 && '-'}
          {summary.currencySymbol}{formatValue(summary.netSavings)}
        </div>
        <div className="mt-1 text-xs text-indigo-200">
          {summary.totalIncome > 0 
            ? `${Math.round((summary.netSavings / summary.totalIncome) * 100)}% of income saved`
            : 'Start adding income to see savings rate'}
        </div>
      </div>
    </div>
  );
};
