import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet, TrendingUp, Receipt } from "lucide-react";
import { useState } from "react";
import { ExpenseChart } from "@/components/ExpenseChart";
import { AddExpenseDialog } from "@/components/AddExpenseDialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Math.random().toString(36).substring(7),
    };
    setExpenses([...expenses, newExpense]);
    toast({
      title: "Dépense ajoutée",
      description: `${expense.amount}€ ajoutés pour ${expense.description}`,
    });
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mon Budget</h1>
            <p className="text-muted-foreground mt-1">Gérez vos dépenses facilement</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button 
              onClick={() => setIsAddExpenseOpen(true)}
              className="bg-background hover:bg-muted text-foreground border border-border"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter une dépense
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6 bg-background border border-border">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-muted rounded-full">
                <Wallet className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Dépenses</p>
                <h2 className="text-2xl font-bold text-foreground">{totalExpenses.toFixed(2)} €</h2>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-background border border-border">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-muted rounded-full">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Catégories</p>
                <h2 className="text-2xl font-bold text-foreground">
                  {new Set(expenses.map(e => e.category)).size}
                </h2>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-background border border-border">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-muted rounded-full">
                <Receipt className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                <h2 className="text-2xl font-bold text-foreground">{expenses.length}</h2>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6 bg-background border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Distribution des dépenses</h3>
            <div className="h-[300px]">
              <ExpenseChart expenses={expenses} />
            </div>
          </Card>

          <Card className="p-6 bg-background border border-border">
            <h3 className="text-lg font-semibold mb-4 text-foreground">Dépenses récentes</h3>
            <div className="space-y-4">
              {expenses.slice(-5).reverse().map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <div>
                    <p className="font-medium text-foreground">{expense.description}</p>
                    <p className="text-sm text-muted-foreground">{expense.category}</p>
                  </div>
                  <p className="font-semibold text-foreground">{expense.amount.toFixed(2)} €</p>
                </div>
              ))}
              {expenses.length === 0 && (
                <p className="text-center text-muted-foreground py-8">Aucune dépense pour le moment</p>
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