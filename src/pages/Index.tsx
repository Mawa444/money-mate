import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet, TrendingUp, Receipt } from "lucide-react";
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
    <div className="min-h-screen bg-[#F6F6F7]">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1F2C]">Mon Budget</h1>
            <p className="text-gray-500 mt-1">Gérez vos dépenses facilement</p>
          </div>
          <Button 
            onClick={() => setIsAddExpenseOpen(true)}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white shadow-lg"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Ajouter une dépense
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] text-white">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-full">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/80">Total Dépenses</p>
                <h2 className="text-2xl font-bold">{totalExpenses.toFixed(2)} €</h2>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#F2FCE2] rounded-full">
                <TrendingUp className="h-6 w-6 text-[#6E59A5]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Catégories</p>
                <h2 className="text-2xl font-bold text-[#1A1F2C]">
                  {new Set(expenses.map(e => e.category)).size}
                </h2>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-[#E5DEFF] rounded-full">
                <Receipt className="h-6 w-6 text-[#6E59A5]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Transactions</p>
                <h2 className="text-2xl font-bold text-[#1A1F2C]">{expenses.length}</h2>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#1A1F2C]">Distribution des dépenses</h3>
            <div className="h-[300px]">
              <ExpenseChart expenses={expenses} />
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <h3 className="text-lg font-semibold mb-4 text-[#1A1F2C]">Dépenses récentes</h3>
            <div className="space-y-4">
              {expenses.slice(-5).reverse().map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-[#F6F6F7] rounded-lg hover:bg-[#E5DEFF] transition-colors">
                  <div>
                    <p className="font-medium text-[#1A1F2C]">{expense.description}</p>
                    <p className="text-sm text-gray-500">{expense.category}</p>
                  </div>
                  <p className="font-semibold text-[#6E59A5]">{expense.amount.toFixed(2)} €</p>
                </div>
              ))}
              {expenses.length === 0 && (
                <p className="text-center text-gray-500 py-8">Aucune dépense pour le moment</p>
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