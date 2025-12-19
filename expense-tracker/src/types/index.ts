export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  type: 'expense' | 'income';
}

export interface CategoryStats {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface BudgetItem {
  category: string;
  limit: number;
  spent: number;
  color: string;
}
