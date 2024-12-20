import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from "sonner";

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
  timestamp: string; // Ajout de l'horodatage
}

export interface PaymentReminder {
  id: string;
  description: string;
  amount: number;
  dueDate: string;
  completed: boolean;
}

interface BudgetStore {
  categories: Category[];
  transactions: Transaction[];
  reminders: PaymentReminder[];
  spendingLimit: number;
  monthlySalary: number;
  savingsGoal: number;
  addCategory: (category: Omit<Category, 'id' | 'spent'>) => void;
  removeCategory: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addReminder: (reminder: PaymentReminder) => void;
  toggleReminderComplete: (id: string) => void;
  removeReminder: (id: string) => void;
  setSpendingLimit: (limit: number) => void;
  setMonthlySalary: (salary: number) => void;
  setSavingsGoal: (goal: number) => void;
}

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set) => ({
      categories: [],
      transactions: [],
      reminders: [],
      spendingLimit: 0,
      monthlySalary: 0,
      savingsGoal: 0,
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
          timestamp: new Date().toISOString(), // Ajout de l'horodatage
          ...transaction,
        };
        
        set((state) => {
          const updatedCategories = state.categories.map((cat) => {
            if (cat.name === transaction.category) {
              const newSpent = cat.spent + transaction.amount;
              if (state.spendingLimit > 0 && newSpent > state.spendingLimit) {
                toast.error("Attention ! Vous avez dépassé votre limite de dépenses");
              } else if (state.spendingLimit > 0 && newSpent > state.spendingLimit * 0.9) {
                toast.warning("Attention ! Vous approchez de votre limite de dépenses");
              }
              return {
                ...cat,
                spent: newSpent,
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
      addReminder: (reminder) => {
        set((state) => ({
          reminders: [...state.reminders, reminder],
        }));
      },
      toggleReminderComplete: (id) => {
        set((state) => ({
          reminders: state.reminders.map((reminder) =>
            reminder.id === id
              ? { ...reminder, completed: !reminder.completed }
              : reminder
          ),
        }));
      },
      removeReminder: (id) => {
        set((state) => ({
          reminders: state.reminders.filter((reminder) => reminder.id !== id),
        }));
      },
      setSpendingLimit: (limit) => set({ spendingLimit: limit }),
      setMonthlySalary: (salary) => set({ monthlySalary: salary }),
      setSavingsGoal: (goal) => set({ savingsGoal: goal }),
    }),
    {
      name: 'budget-store',
    }
  )
);
