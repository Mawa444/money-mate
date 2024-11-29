import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, DollarSign, PieChart, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { ExpenseChart } from "@/components/ExpenseChart";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
};

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Math.random().toString(36).substring(7),
    };
    setExpenses([...expenses, newExpense]);
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Finance Tracker</h1>
          <Button onClick={() => setIsAddExpenseOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Expenses</p>
                <h2 className="text-2xl font-bold">${totalExpenses.toFixed(2)}</h2>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-secondary/10 rounded-full">
                <PieChart className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Categories</p>
                <h2 className="text-2xl font-bold">{new Set(expenses.map(e => e.category)).size}</h2>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <ArrowUpDown className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Transactions</p>
                <h2 className="text-2xl font-bold">{expenses.length}</h2>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Expense Distribution</h3>
            <div className="h-[300px]">
              <ExpenseChart expenses={expenses} />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Expenses</h3>
            <div className="space-y-4">
              {expenses.slice(-5).reverse().map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                  <p className="font-semibold text-primary">${expense.amount.toFixed(2)}</p>
                </div>
              ))}
              {expenses.length === 0 && (
                <p className="text-center text-gray-500">No expenses yet</p>
              )}
            </div>
          </Card>
        </div>
      </div>

      <AddExpenseDialog
        open={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        onAddExpense={addExpense}
      />
    </div>
  );
};

export default Index;