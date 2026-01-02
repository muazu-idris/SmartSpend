
import React from 'react';
import { Category, TransactionType, CurrencyCode } from './types';

export const CATEGORIES: Category[] = [
  'Housing', 
  'Transportation', 
  'Food', 
  'Utilities', 
  'Insurance', 
  'Healthcare', 
  'Savings', 
  'Personal', 
  'Entertainment', 
  'Salary', 
  'Bonus', 
  'Investment',
  'Other'
];

export const INCOME_CATEGORIES: Category[] = ['Salary', 'Bonus', 'Investment', 'Other'];
export const EXPENSE_CATEGORIES: Category[] = [
  'Housing', 'Transportation', 'Food', 'Utilities', 'Insurance', 'Healthcare', 'Personal', 'Entertainment', 'Other'
];

export const CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: 'USD', label: 'US Dollar', symbol: '$' },
  { code: 'NGN', label: 'Nigerian Naira', symbol: '₦' },
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'GBP', label: 'British Pound', symbol: '£' },
  { code: 'JPY', label: 'Japanese Yen', symbol: '¥' }
];

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  NGN: '₦',
  EUR: '€',
  GBP: '£',
  JPY: '¥'
};

export const CATEGORY_COLORS: Record<string, string> = {
  Housing: '#6366f1',
  Transportation: '#f59e0b',
  Food: '#10b981',
  Utilities: '#06b6d4',
  Insurance: '#8b5cf6',
  Healthcare: '#ef4444',
  Personal: '#ec4899',
  Entertainment: '#f97316',
  Other: '#94a3b8'
};
