
export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE'
}

export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP' | 'JPY';

export type Category = 
  | 'Housing' 
  | 'Transportation' 
  | 'Food' 
  | 'Utilities' 
  | 'Insurance' 
  | 'Healthcare' 
  | 'Savings' 
  | 'Personal' 
  | 'Entertainment' 
  | 'Salary' 
  | 'Bonus' 
  | 'Investment'
  | 'Other';

export interface Transaction {
  id: string;
  type: TransactionType;
  category: Category;
  amount: number;
  currency: CurrencyCode;
  date: string;
  description: string;
}

export interface SummaryData {
  totalIncome: number;
  totalExpense: number;
  netSavings: number;
  currencySymbol: string;
}

export interface SavingsTip {
  title: string;
  content: string;
  impact: 'High' | 'Medium' | 'Low';
}
