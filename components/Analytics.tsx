
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Transaction } from '../types';
import { CATEGORY_COLORS } from '../constants';

interface AnalyticsProps {
  transactions: Transaction[];
  currencySymbol: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({ transactions, currencySymbol }) => {
  const expenseData = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const chartData = Object.entries(expenseData).map(([name, value]) => ({
    name,
    value: Number(value)
  })).sort((a, b) => b.value - a.value);

  if (chartData.length === 0) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-slate-400 min-h-[300px]">
        <i className="fas fa-chart-pie text-4xl mb-4 opacity-20"></i>
        <p>Add some expenses to see visual analysis</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full">
      <h3 className="text-xl font-bold mb-6 text-slate-800">Expense Breakdown</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => `${currencySymbol}${value.toFixed(2)}`}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px'
              }}
            />
            <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
