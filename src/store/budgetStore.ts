import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Category {
  id: string;
  name: string;
  budget: number;
  spent: number;
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface BudgetStore {
  categories: Category[];
  transactions: Transaction[];
  addCategory: (category: Omit<Category, 'id' | 'spent'>) => void;
  removeCategory: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      categories: [],
      transactions: [],
      addCategory: (category) => {
        set((state) => ({
          categories: [
            ...state.categories,
            {
              id: Math.random().toString(36).substring(7),
              spent: 0,
              ...category,
            },
          ],
        }));
      },
      removeCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== id),
        }));
      },
      addTransaction: (transaction) => {
        const newTransaction = {
          id: Math.random().toString(36).substring(7),
          ...transaction,
        };
        
        set((state) => {
          const updatedCategories = state.categories.map((cat) => {
            if (cat.name === transaction.category) {
              return {
                ...cat,
                spent: cat.spent + transaction.amount,
              };
            }
            return cat;
          });

          return {
            transactions: [newTransaction, ...state.transactions],
            categories: updatedCategories,
          };
        });
      },
      removeTransaction: (id) => {
        set((state) => {
          const transaction = state.transactions.find((t) => t.id === id);
          if (!transaction) return state;

          const updatedCategories = state.categories.map((cat) => {
            if (cat.name === transaction.category) {
              return {
                ...cat,
                spent: cat.spent - transaction.amount,
              };
            }
            return cat;
          });

          return {
            transactions: state.transactions.filter((t) => t.id !== id),
            categories: updatedCategories,
          };
        });
      },
    }),
    {
      name: 'budget-store',
    }
  )
);