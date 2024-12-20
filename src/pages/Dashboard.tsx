import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { SalarySummary } from "@/components/dashboard/SalarySummary";
import { ExpenseSummary } from "@/components/dashboard/ExpenseSummary";
import { CategoryManager } from "@/components/dashboard/CategoryManager";
import { SavingsGoal } from "@/components/dashboard/SavingsGoal";
import { SpendingLimitManager } from "@/components/dashboard/SpendingLimitManager";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useBudgetStore } from "@/store/budgetStore";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ThemeToggle } from "@/components/theme-toggle";

interface SalaryStore {
  salary: number;
  setSalary: (amount: number) => void;
}

const useSalaryStore = create<SalaryStore>()(
  persist(
    (set) => ({
      salary: 0,
      setSalary: (amount: number) => set({ salary: amount }),
    }),
    {
      name: 'salary-store',
    }
  )
);

const categoryColors = [
  "bg-primary",
  "bg-success",
  "bg-destructive",
  "bg-accent",
  "bg-muted",
  "bg-secondary",
  "bg-primary/80",
  "bg-success/80",
];

const Dashboard = () => {
  const { categories } = useBudgetStore();
  const { salary, setSalary } = useSalaryStore();
  const [showSalaryInput, setShowSalaryInput] = useState(salary === 0);

  const handleSalarySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSalaryInput(false);
    setSalary(salary);
    toast("Salaire enregistré", {
      description: `Votre salaire de ${salary.toLocaleString()} FCFA a été enregistré.`
    });
  };

  const totalSpent = categories.reduce((acc, cat) => acc + cat.spent, 0);
  const remainingBudget = salary - totalSpent;

  const expenseCategories = categories.map((category, index) => ({
    name: category.name,
    amount: category.spent,
    budget: category.budget,
    color: categoryColors[index % categoryColors.length],
  }));

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
          <p className="text-muted-foreground">Gérez votre budget mensuel</p>
        </div>
        <ThemeToggle />
      </motion.div>

      {showSalaryInput ? (
        <Card className="p-6 glass-panel">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Commencez par renseigner votre salaire</h2>
          <form onSubmit={handleSalarySubmit} className="space-y-4">
            <div>
              <label htmlFor="salary" className="block text-sm font-medium mb-2 text-foreground">
                Votre salaire mensuel
              </label>
              <Input
                id="salary"
                type="number"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                placeholder="Entrez votre salaire"
                className="w-full"
                required
              />
            </div>
            <Button type="submit" className="w-full">Enregistrer le salaire</Button>
          </form>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <SalarySummary />
            <SpendingLimitManager />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <CategoryManager />
            <ExpenseSummary 
              categories={expenseCategories}
              totalBudget={salary}
              totalSpent={totalSpent}
            />
          </div>
          <SavingsGoal />
        </>
      )}
    </div>
  );
};

export default Dashboard;